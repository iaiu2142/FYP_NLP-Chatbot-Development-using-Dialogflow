document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    
    try {
        const response = await fetch('http://127.0.0.1:5000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, full_name: username, password: password })
        });

        const data = await response.json();
        
        if (data.message || data.success) {
            alert('✅ Signup successful!');
            window.location.href = 'login.html';
          } else {
            alert(data.message);
          }
          
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Something went wrong');

        const data = await response.json();
}

});

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#signupPassword");

togglePassword.addEventListener("click", () => {
  // toggle the type
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  
  // toggle the icon
  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

