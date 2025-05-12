document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
  
    try {
        const response = await fetch("http://127.0.0.1:5000/auth/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
  
        const data = await response.json();

        if (data.success) {
            localStorage.setItem("userRole", data.role);
            localStorage.setItem("userEmail", data.email);
        
            if (data.role === "admin") {
                alert('✅ Admin Login successful!');
                window.location.href = '/auth/admin_dashboard.html';
            } else {
                alert('✅ User Login successful!');
                window.location.href = '/auth/user_dashboard.html';   
            }            
        } else {
            alert('❌ ' + (data.message || 'Invalid credentials.'));
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong while logging in.');
    }
  });
  
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", () => {
  // toggle the type
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  
  // toggle the icon
  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});
