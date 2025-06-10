function checkRegisterInput() {
  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const agreeTerms = document.getElementById("agreeTerms").checked;
  const registerBtn = document.getElementById("register-btn");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 6;

  if (username && emailValid && passwordValid && agreeTerms) {
    registerBtn.classList.add("active");
    registerBtn.disabled = false;
  } else {
    registerBtn.classList.remove("active");
    registerBtn.disabled = true;
  }
}

function register() {
  const usernameInput = document.getElementById("register-username");
  const emailInput = document.getElementById("register-email");
  const passwordInput = document.getElementById("register-password");

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showToast("Format email tidak valid!", false);
    return;
  }
  if (password.length < 6) {
    showToast("Password minimal 6 karakter!", false);
    return;
  }

  let storedUser = localStorage.getItem("user");
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    if (username === userData.username) {
      showToast("Username sudah terdaftar!", false);
      return;
    }
  }

  const newUser = { username, email, password };
  localStorage.setItem("user", JSON.stringify(newUser));
  showToast("Registrasi berhasil! Mengalihkan ke login...", true);

  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}

function toggleVisibility(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

function showToast(message, success = true) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.background = success ? "#28a745" : "#dc3545";
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

document.getElementById("register-form").addEventListener("submit", function(e) {
  e.preventDefault();
  register();
});
