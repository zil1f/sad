function checkInput() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const loginBtn = document.getElementById("login-btn");

  if (username && password) {
    loginBtn.classList.add("active");
    loginBtn.disabled = false;
  } else {
    loginBtn.classList.remove("active");
    loginBtn.disabled = true;
  }
}

function login() {
  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");
  const loginBtn = document.getElementById("login-btn");
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    showToast("Belum ada akun terdaftar!", false);
    return;
  }

  const userData = JSON.parse(storedUser);
  loginBtn.innerText = "Masuk...";
  loginBtn.disabled = true;

  setTimeout(() => {
    if (
      usernameInput.value === userData.username &&
      passwordInput.value === userData.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      showToast("Login berhasil!", true);

      setTimeout(() => {
        showToast("Mengalihkan ke dashboard...", true);
      }, 1000);

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2500);
    } else {
      showToast("Username atau password salah!", false);
      usernameInput.classList.add("shake");
      passwordInput.classList.add("shake");

      setTimeout(() => {
        usernameInput.classList.remove("shake");
        passwordInput.classList.remove("shake");
      }, 500);

      usernameInput.value = "";
      passwordInput.value = "";
      usernameInput.placeholder = "Salah!";
      passwordInput.placeholder = "Salah!";
    }

    loginBtn.innerText = "Masuk";
    loginBtn.disabled = false;
  }, 1000);
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

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  login();
});
