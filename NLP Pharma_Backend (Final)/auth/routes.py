from flask import Blueprint, request, jsonify
from config.db_config import get_connection
from auth.utils import hash_password, verify_password
from auth.forget_password import generate_otp, send_otp_email, otp_storage

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    full_name = data.get("full_name")
    email = data.get("email")
    password = hash_password(data.get("password"))

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (full_name, email, password) VALUES (%s, %s, %s)",
                       (full_name, email, password))
        conn.commit()
        return jsonify({"message": "🟢 Signup successful"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))  
        user = cursor.fetchone()

        if user and verify_password(password, user['password']):
            return jsonify({"success": True, "message": f"🟢 Welcome, {user['full_name']}!"})
        else:
            return jsonify({"success": False, "message": "🔴 Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

    

    # ------------------- FORGET PASSWORD APIs -------------------

@auth_bp.route("/forget_password", methods=["POST"])
def forget_password():
    data = request.get_json()
    email = data.get("email")

    # Check if email is provided
    if not email:
        return jsonify({"success": False, "message": "Email is required"}), 400

    # Generate OTP
    otp = generate_otp()
    otp_storage[email] = otp  # Store OTP temporarily

    # Send OTP email
    if send_otp_email(email, otp):
        return jsonify({"success": True, "message": "OTP sent successfully!"})
    else:
        return jsonify({"success": False, "message": "Failed to send OTP"}), 500

    # Verify OPT

@auth_bp.route("/verify-otp", methods=["POST"])
def verify_otp():
    data = request.get_json()
    email = data.get("email")
    otp = data.get("otp")

    if otp_storage.get(email) == otp:

        return jsonify({"success": True, "message": "OTP verified"})
    else:
        return jsonify({"success": False, "message": "Invalid OTP"}), 400

    # Reset Password

@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json()
    email = data.get("email")
    new_password = hash_password(data.get("password"))

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET password = %s WHERE email = %s", (new_password, email))
        conn.commit()
        return jsonify({"success": True, "message": "Password updated successfully"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
    




