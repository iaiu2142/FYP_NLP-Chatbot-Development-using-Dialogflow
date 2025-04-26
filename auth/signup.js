document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    alert('Hello');

    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const email = document.getElementById('signupEmail').value.trim();

    console.log(username);
    console.log(password);
    console.log(email);
    
    try {
        const response = await fetch('http://127.0.0.1:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, full_name: username, password: password })
        });

        const data = await response.json();
        

        if (data.success) {
            alert('✅ Signup successful!');
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
