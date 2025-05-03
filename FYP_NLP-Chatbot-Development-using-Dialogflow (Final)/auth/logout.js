document.addEventListener('DOMContentLoaded', function() {
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      alert('🔓 You have been logged out.');
      localStorage.removeItem('isLoggedIn');
      window.location.href = 'auth/login.html'; // Redirect to login page
    });
  }
});
