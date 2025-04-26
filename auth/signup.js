// signup.js
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
  
    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {   // your backend API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password })
      });
  
      const data = await response.json();
      
      if (response.ok) {
        alert(data.message);
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '../index.html'; // After signup, redirect to home
      } else {
        alert(data.message || 'Signup failed!');
      }
    } catch (error) {
      alert('Error signing up.');
    }
  });
  