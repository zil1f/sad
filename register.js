function checkRegisterInput() {
  const u = document.getElementById("register-username").value.trim();
  const e = document.getElementById("register-email").value.trim();
  const p = document.getElementById("register-password").value.trim();
  const c = document.getElementById("agreeTerms").checked;
  const b = document.getElementById("register-btn");

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validPass = p.length >= 6;
  if (u && validEmail && validPass && c) {
    b.classList.add("active");
    b.disabled = false;
  } else {
    b.classList.remove("active");
    b.disabled = true;
  }
}

function register() {
  const u = document.getElementById("register-username").value.trim();
  const e = document.getElementById("register-email").value.trim();
  const p = document.getElementById("register-password").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(e)) return showToast("Email tidak valid!", false);
  if (p.length < 6) return showToast("Password minimal 6 karakter!", false);

  const old = localStorage.getItem("user");
  if (old && JSON.parse(old).username === u) {
    return showToast("Username sudah terdaftar!", false);
  }

  localStorage.setItem("user", JSON.stringify({ username: u, email: e, password: p }));
  showToast("Registrasi berhasil! Mengalihkan...", true);
  setTimeout(() => window.location.href = "index.html", 2000);
}

function toggleVisibility(id) {
  let x = document.getElementById(id);
  x.type = x.type === "password" ? "text" : "password";
}

function showToast(msg, ok = true) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.style.background = ok ? "#28a745" : "#dc3545";
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

document.getElementById("register-form").addEventListener("submit", e => {
  e.preventDefault();
  register();
});
