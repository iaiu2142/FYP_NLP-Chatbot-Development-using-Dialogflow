document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();

  try {
    const response = await fetch('http://127.0.0.1:5000/forget_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    });

    const data = await response.json();
    if (data.success) {
      alert('✅ OTP Sent to your Email!');
      // Redirect to OTP verification page
      window.location.href = "verify_otp.html";
    } else {
      alert('❌ ' + data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong.');
  }
});
