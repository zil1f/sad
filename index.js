function checkInput() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const loginBtn = document.getElementById("login-btn");

  loginBtn.disabled = !(username && password);
  loginBtn.classList.toggle("active", !loginBtn.disabled);
}

function login() {
  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");
  const loginBtn = document.getElementById("login-btn");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const foundUser = users.find(user =>
    user.username === usernameInput.value.trim() &&
    user.password === passwordInput.value.trim()
  );

  loginBtn.innerText = "Masuk...";
  loginBtn.disabled = true;

  setTimeout(() => {
    if (foundUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", foundUser.id);
      showToast("Login berhasil!", true);

      setTimeout(() => window.location.href = "dashboard.html", 2000);
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
  setTimeout(() => toast.classList.remove("show"), 3000);
}

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  login();
});
