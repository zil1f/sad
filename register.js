function checkRegisterInput() {
  let username = document.getElementById("register-username").value.trim();
  let email = document.getElementById("register-email").value.trim();
  let password = document.getElementById("register-password").value.trim();
  let agreeTerms = document.getElementById("agreeTerms").checked;
  let registerBtn = document.getElementById("register-btn");

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
  let usernameInput = document.getElementById("register-username");
  let emailInput = document.getElementById("register-email");
  let passwordInput = document.getElementById("register-password");

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
    let userData = JSON.parse(storedUser);
    if (usernameInput.value === userData.username) {
      showToast("Username sudah terdaftar!", false);
      return;
    }
  }

  let newUser = {
    username: usernameInput.value.trim(),
    email: email,
    password: password
  };

  localStorage.setItem("user", JSON.stringify(newUser));
  showToast("Registrasi berhasil! Mengalihkan ke login...", true);

  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}

function toggleVisibility(id) {
  let input = document.getElementById(id);
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

document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();
  register();
});
