from flask import Flask, request, jsonify
from config.db_config import get_connection
from flask_cors import CORS
from auth.routes import auth_bp


app = Flask(__name__)

# Registering routes
app.register_blueprint(auth_bp)  
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return "💊 NLP Pharma Bot Backend is Running!"


# ----------------- LOGIN API -----------------
users = {}

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    password = data['password']
    full_name = data['username']
    
    if email in users:
        return jsonify({'success': False, 'message': 'User already exists'})
    
    users[email] = password
    return jsonify({'success': True, 'message': 'User created successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    
    if email in users and users[email] == password:
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'})

# ----------------- WEBHOOK for Dialogflow -----------------
@app.route("/webhook", methods=["POST"])
def webhook():
    req = request.get_json()
    intent = req['queryResult']['intent']['displayName']

    if intent == "Order_Medicine":
        return handle_order(req)
    elif intent == "Submit_Feedback":
        return handle_feedback(req)
    elif intent == "Get_Delivery_Location":
        return handle_delivery(req)
    else:
        return jsonify({"fulfillmentText": "❗ Sorry, I didn't understand that request."})

def handle_order(req):
    params = req['queryResult']['parameters']
    medicine = params.get("medicine_name")
    quantity = params.get("quantity")

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO orders (medicine_name, quantity) VALUES (%s, %s)", (medicine, quantity))
        conn.commit()
        return jsonify({"fulfillmentText": f"✅ Your order for {quantity} pack(s) of {medicine} has been placed!"})
    except Exception as e:
        return jsonify({"fulfillmentText": f"❌ Failed to place order: {str(e)}"})

def handle_feedback(req):
    params = req['queryResult']['parameters']
    rating = params.get("feedback_score", "N/A")
    comment = params.get("feedback_comment", "")

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO feedback (rating, comment) VALUES (%s, %s)", (rating, comment))
        conn.commit()
        return jsonify({"fulfillmentText": "💬 Thank you for your valuable comment! Our team will review it shortly."})
    except Exception as e:
        return jsonify({"fulfillmentText": f"❌ Failed to save feedback: {str(e)}"})

def handle_delivery(req):
    params = req['queryResult']['parameters']
    location = params.get("delivery_location", "your location")
    return jsonify({"fulfillmentText": f"🚚 Your order will be delivered to {location} in 2–3 business days."})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
