function checkRegisterInput() {
  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const agreeTerms = document.getElementById("agreeTerms").checked;
  const registerBtn = document.getElementById("register-btn");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 6 && /\d/.test(password);

  registerBtn.disabled = !(username && emailValid && passwordValid && agreeTerms);
  registerBtn.classList.toggle("active", !registerBtn.disabled);
}

function register() {
  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(u => u.username === username)) {
    return showToast("Username sudah digunakan!", false);
  }

  const newUser = {
    id: Date.now(),
    username,
    email,
    password,
    secretCode: Math.floor(1000000000 + Math.random() * 9000000000).toString()
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  showToast(`Berhasil daftar! Kode reset Anda: ${newUser.secretCode}`, true);

  setTimeout(() => {
    showToast("Mengalihkan ke login...", true);
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
  setTimeout(() => toast.classList.remove("show"), 3000);
}

document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();
  register();
});
