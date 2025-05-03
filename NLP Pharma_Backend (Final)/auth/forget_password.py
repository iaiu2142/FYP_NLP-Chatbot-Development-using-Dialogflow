import smtplib
import random
from email.mime.text import MIMEText

# Dictionary to temporarily store OTPs
otp_storage = {}

# Function to generate random OTP
def generate_otp():
    return str(random.randint(100000, 999999))

# Function to send OTP email
def send_otp_email(receiver_email, otp):
    try:
        sender_email = "ilsaafzaal2142@gmail.com"   #  Gmail
        app_password = "lmnn mevy dgdt gioa"  # Google App Password here (16 characters)

        msg = MIMEText(f"Your OTP for password reset is: {otp}")
        msg['Subject'] = '🔐 PharmaBot Password Reset OTP'
        msg['From'] = sender_email
        msg['To'] = receiver_email

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, app_password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()

        return True
    except Exception as e:
        print("Error while sending email:", e)
        return False
