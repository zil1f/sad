function checkRegisterInput() {
  let username = document.getElementById("register-username").value.trim();
  let email = document.getElementById("register-email").value.trim();
  let password = document.getElementById("register-password").value.trim();
  let agreeTerms = document.getElementById("agreeTerms").checked;
  let registerBtn = document.getElementById("register-btn");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailPattern.test(email);
  const isPasswordValid = password.length >= 6;

  if (username && isEmailValid && isPasswordValid && agreeTerms) {
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

  // Validasi format email
  if (!emailPattern.test(email)) {
    showToast("Format email tidak valid!", false);
    return;
  }

  // Validasi panjang password
  if (password.length < 6) {
    showToast("Password minimal 6 karakter!", false);
    return;
  }

  // Cek username sudah ada
  let storedUser = localStorage.getItem("user");
  if (storedUser) {
    let userData = JSON.parse(storedUser);
    if (usernameInput.value === userData.username) {
      showToast("Username sudah terdaftar!", false);
      return;
    }
  }

  // Simpan data
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

// Notifikasi elegan
function showToast(message, success = true) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.background = success ? "#28a745" : "#dc3545";
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Submit pakai Enter
document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();
  register();
});
