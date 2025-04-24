document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    // Replace this logic with real API call when ready
    if (username === 'admin' && password === 'admin') {
      alert('Login successful!');
      
      // Redirect back to homepage or previous page
      window.location.href = document.referrer || "/index.html";
  
    } else {
      alert('Invalid username or password');
    }
  });
  