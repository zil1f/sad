function checkRegisterInput() {
  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const agreeTerms = document.getElementById("agreeTerms").checked;
  const registerBtn = document.getElementById("register-btn");

  // Tetap bisa diklik, tapi pudar kalau belum valid
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 6 && /\d/.test(password);

  if (username && emailValid && passwordValid && agreeTerms) {
    registerBtn.classList.add("active");
  } else {
    registerBtn.classList.remove("active");
  }

  registerBtn.disabled = false; // tombol tetap bisa diklik
}

function register() {
  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const agreeTerms = document.getElementById("agreeTerms").checked;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValid = emailPattern.test(email);
  const passwordValid = password.length >= 6 && /\d/.test(password);

  if (!username) {
    showToast("Username belum diisi!", false); return;
  }
  if (!email) {
    showToast("Email belum diisi!", false); return;
  }
  if (!emailValid) {
    showToast("Email tidak valid! Contoh: user@gmail.com", false); return;
  }
  if (!password) {
    showToast("Password belum diisi!", false); return;
  }
  if (!passwordValid) {
    showToast("Password harus minimal 6 karakter & mengandung angka!", false); return;
  }
  if (!agreeTerms) {
    showToast("Anda harus menyetujui syarat & ketentuan.", false); return;
  }

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    if (username === userData.username) {
      showToast("Username sudah terdaftar!", false); return;
    }
  }

  const newUser = { username, email, password };
  localStorage.setItem("user", JSON.stringify(newUser));
  showToast("Registrasi berhasil! Mengalihkan ke login...", true);
  setTimeout(() => window.location.href = "index.html", 2000);
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
