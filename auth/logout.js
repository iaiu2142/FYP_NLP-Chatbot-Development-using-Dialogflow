// logout.js
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('.logout-btn');
  
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'auth/login.html'; // Redirect to login page
      });
    }
  });
  