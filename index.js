function checkInput() {
  let username = document.getElementById("login-username").value;
  let password = document.getElementById("login-password").value;
  let loginBtn = document.getElementById("login-btn");

  if (username.trim() !== "" && password.trim() !== "") {
    loginBtn.classList.add("active");
    loginBtn.disabled = false; // Aktifkan tombol
  } else {
    loginBtn.classList.remove("active");
    loginBtn.disabled = true; // Nonaktifkan tombol
  }
}

function login() {
  let usernameInput = document.getElementById("login-username");
  let passwordInput = document.getElementById("login-password");
  let errorMsg = document.getElementById("error-msg");
  let loginBtn = document.getElementById("login-btn");

  let storedUser = localStorage.getItem("username", "password");


  if (!storedUser) {
    errorMsg.innerText = "Tidak ada akun terdaftar!";
    errorMsg.style.display = "block";
    return;
  }

  let userData = JSON.parse(storedUser);

  loginBtn.innerText = "Masuk...";
  loginBtn.disabled = true;

  setTimeout(() => {
    if (
      usernameInput.value === userData.username &&
      passwordInput.value === userData.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "dashboard.html";
    } else {
      errorMsg.innerText = "Username atau password salah!";
      errorMsg.style.display = "block";

      usernameInput.classList.add("shake");
      passwordInput.classList.add("shake");

      setTimeout(() => {
        usernameInput.classList.remove("shake");
        passwordInput.classList.remove("shake");
      }, 500);

      usernameInput.classList.add("error");
      passwordInput.classList.add("error");
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
  let inputField = document.getElementById(id);
  inputField.type = inputField.type === "password" ? "text" : "password";
}
