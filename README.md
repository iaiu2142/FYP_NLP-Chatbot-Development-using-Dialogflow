# 🧠 NLP PharmaBot – Dialogflow-based Smart Pharmacy Assistant

This project is a student-level intelligent chatbot system for a pharmacy, using **Dialogflow**, **Flask**, and **MySQL**. The chatbot allows users to place orders, track their orders, upload prescriptions, and provide feedback — with admin features for monitoring.

---

## 📁 Repository Structure

```plaintext
FYP_NLP-Chatbot-Development-using-Dialogflow/
│
├── 📂 docs
│   ├── Presentation.pptx
│   └── Final_Report.docx
│
├── 📂 src
│   ├── NLP Pharma_Backend (Final)               
│   ├── NLP Pharma_Frontend (Final)
│
├── 📂 db
│   └── pharma_bot.sql          # MySQL database schema with dummy data
│
├── 📂 dialogflow-agent
│   └── NLP-PharmaBot.zip       # Dialogflow CX agent export
│
└── README.md                   # You are here!
```

---

## 💻 Features

- 🔐 **User Signup & Login**
- 💊 **Order Medicine** via chatbot or form
- 📦 **Track Order Status** (Static or DB-driven)
- 📤 **Upload Prescription**
- 📝 **Submit Feedback**
- 🧑‍⚕️ **Admin Dashboard**: View & manage all orders
- 🧠 **Dialogflow Integration** for intent handling

---

## 🧠 Dialogflow Intents Overview

| Intent Name         | Purpose                          |
|---------------------|----------------------------------|
| `Order_Medicine`    | Place medicine orders            |
| `Track_Order_Status`| Track order via Order ID         |
| `Cancel_Order`      | Cancel a placed order            |
| `Upload_Prescription`| Upload user prescription         |
| `Order_Feedback`    | Submit feedback after order      |
| `Get_Medicine_Info` | Ask about available medicines    |
| `Default Fallback`  | Handle unrecognized inputs       |
| `Welcome Intent`    | Greet users                      |

---

## 🗄️ Database Structure (MySQL)

- `users`: Registered users (with role: admin/user)
- `orders`: Order records with status tracking
- `feedback`: Feedback submitted by users
- `medicines`: Available medicines and prices
- `prescriptions`: Uploaded prescription files

> 📂 See `/db/pharma_bot.sql` to import complete schema with sample data.

---

## 🔧 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/FYP_NLP-Chatbot-Development-using-Dialogflow.git
cd FYP_NLP-Chatbot-Development-using-Dialogflow
```

### 2. Setup Python Environment

```bash
pip install -r requirements.txt
```

> ⚠️ Required libraries: `Flask`, `Flask-CORS`, `Flask-Session`, `mysql-connector-python`

### 3. Import Database

Use XAMPP/phpMyAdmin or MySQL CLI to import `/db/pharma_bot.sql`.

---

### 4. Run Flask Backend

```bash
python src/app.py
```

### 5. Connect Dialogflow

- Open Dialogflow CX
- Import the ZIP from `/dialogflow agent [Pharma Bot]/NLP-PharmaBot-agent`
- Set fulfillment URL to your webhook (e.g., using `ngrok`)

---

## 📚 Documentation

Refer to:

- 📄 `docs/Final_Report.docx` for system design, use cases, and testing.
- 📊 `docs/Presentation.pptx` for visual summary.

---

## 🙋‍♀️ Author

**Ilsa (BC210203055)**  
Final Year Project – NLP-based Smart Chatbot for Pharmacy  
Department of Computer Science

---

## 📜 License

This project is for academic use only. No commercial redistribution allowed.
