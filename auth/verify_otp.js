
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

document.getElementById('verifyOtpForm').addEventListener('submit', async (e) => {
e.preventDefault();

const otp = document.getElementById('otp').value.trim();
const email = getQueryParam('email'); // 📌 Get email from URL!

if (!email) {
  alert('❌ No email found. Please try again.');
  return;
}

try {
  const response = await fetch('http://127.0.0.1:5000/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, otp: otp })
  });

  const data = await response.json();

  if (data.success) {
    alert('✅ OTP Verified! Now set new password.');
  
    window.location.href = `reset_password.html?email=${encodeURIComponent(email)}`;
  } else {
    document.getElementById('otpMessage').innerText = data.message;
  }
} catch (error) {
  console.error(error);
  document.getElementById('otpMessage').innerText = 'Something went wrong.';
}
});
