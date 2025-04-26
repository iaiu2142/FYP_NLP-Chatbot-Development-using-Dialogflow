// login.js

const API_URL = "https://evil-groups-call.loca.lt/webhook"; 

// Form elements
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignupLink = document.getElementById("showSignup");
const showLoginLink = document.getElementById("showLogin");

// Toggle forms
showSignupLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
});

showLoginLink.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

// Handle Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      localStorage.setItem("user", email);
      window.location.href = "home.html"; // Redirect to home after login
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert("Error logging in. Try again.");
  }
});

// Handle Signup
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const full_name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      signupForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert("Error signing up. Try again.");
  }
});
