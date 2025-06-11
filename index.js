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

  let storedUser = localStorage.getItem("user");

  if (!storedUser) {
    showToast("Tidak ada akun terdaftar!", false);
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

function resetPassword() {
  const stored = localStorage.getItem("user");
  if (!stored) {
    showToast("Belum ada akun terdaftar!", false);
    return;
  }

  const user = JSON.parse(stored);
  const username = prompt("Masukkan username Anda:");
  const email = prompt("Masukkan email yang terdaftar:");
  const code = prompt("Masukkan 10-digit kode reset:");

  if (username !== user.username || email !== user.email || code !== user.secretCode) {
    showToast("Data tidak cocok! Reset gagal.", false);
    return;
  }

  const newPass = prompt("Masukkan password baru (min 6 karakter & ada angka):");

  if (!newPass || newPass.length < 6 || !/\d/.test(newPass)) {
    showToast("Password harus minimal 6 karakter & mengandung angka!", false);
    return;
  }

  user.password = newPass;
  localStorage.setItem("user", JSON.stringify(user));
  showToast("Password berhasil direset!", true);
}

function showToast(message, success = true) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.background = success ? "#28a745" : "#dc3545";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function toggleVisibility(id) {
  let inputField = document.getElementById(id);
  inputField.type = inputField.type === "password" ? "text" : "password";
}

document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault(); // Mencegah reload
  login(); // Panggil fungsi login
});
