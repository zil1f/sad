function checkRegisterInput() {
  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const agreeTerms = document.getElementById("agreeTerms").checked;
  const registerBtn = document.getElementById("register-btn");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 6 && /\d/.test(password);

  if (username && emailValid && passwordValid && agreeTerms) {
    registerBtn.classList.add("active");
  } else {
    registerBtn.classList.remove("active");
  }

  registerBtn.disabled = false; // tombol selalu bisa diklik
}

function register() {
  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const agreeTerms = document.getElementById("agreeTerms").checked;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValid = emailPattern.test(email);
  const passwordValid = password.length >= 6 && /\d/.test(password);

  if (!username) return showToast("Username belum diisi!", false);
  if (!email) return showToast("Email belum diisi!", false);
  if (!emailValid) return showToast("Email tidak valid! Contoh: user@gmail.com", false);
  if (!password) return showToast("Password belum diisi!", false);
  if (!passwordValid) return showToast("Password harus minimal 6 karakter & mengandung angka!", false);
  if (!agreeTerms) return showToast("Anda harus menyetujui syarat & ketentuan.", false);

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    if (username === userData.username) {
      return showToast("Username sudah terdaftar!", false);
    }
  }

  // Buat secret code 10 angka
  const secretCode = Math.floor(1000000000 + Math.random() * 9000000000).toString();

  const newUser = { username, email, password, secretCode };
  localStorage.setItem("user", JSON.stringify(newUser));

  showToast(`Registrasi berhasil! Kode reset Anda: ${secretCode}`, true);

  setTimeout(() => {
    showToast("Mengalihkan ke login...", true);
  }, 1500);

  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);
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
