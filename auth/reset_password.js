document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const newPassword = document.getElementById('newPassword').value.trim();
  
    try {
      const response = await fetch('http://127.0.0.1:5000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword })
      });
  
      const data = await response.json();
      
      if (data.success) {
        alert('✅ Password updated successfully!');
        window.location.href = 'login.html'; // Redirect to login page
      } else {
        document.getElementById('resetMessage').innerText = data.message;
      }
  
    } catch (error) {
      console.error(error);
      document.getElementById('resetMessage').innerText = 'Something went wrong.';
    }
  });
  