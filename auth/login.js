// login.js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('http://127.0.0.1:5000/login', {   // your backend API
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password })
    });

    const data = await response.json();
    
    if (response.ok) {
      alert(data.message);
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = '../index.html'; // After successful login
    } else {
      alert(data.message || 'Login failed!');
    }
  } catch (error) {
    alert('Error during login.');
  }
});
