document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
      const response = await fetch('http://127.0.0.1:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password })
      });

      const data = await response.json();

      if (data.success) {
          alert('✅ Login successful!');
          localStorage.setItem('isLoggedIn', 'true');
          window.location.href = 'http://127.0.0.1:5500/index.html';  // redirect to frontend home
      } else {
          alert('❌ ' + data.message);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
  }
});
