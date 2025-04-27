document.getElementById('verifyOtpForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const otp = document.getElementById('otp').value.trim();
  
    try {
      const response = await fetch('http://127.0.0.1:5000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp })
      });
  
      const data = await response.json();
      
      if (data.success) {
        alert('✅ OTP Verified! Now set new password.');
        window.location.href = 'reset_password.html'; // Move to next page
      } else {
        document.getElementById('otpMessage').innerText = data.message;
      }
  
    } catch (error) {
      console.error(error);
      document.getElementById('otpMessage').innerText = 'Something went wrong.';
    }
  });
  