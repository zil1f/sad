if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "index.html";
}

const users = JSON.parse(localStorage.getItem("users")) || [];
const currentUserId = localStorage.getItem("currentUser");
const userIndex = users.findIndex(u => u.id == currentUserId);
const user = users[userIndex];

if (!user) {
  alert("Pengguna tidak ditemukan.");
  window.location.href = "index.html";
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");
  const toggleBtn = document.getElementById("toggleBtn");

  sidebar.classList.toggle("hide-sidebar");
  mainContent.classList.toggle("expand-content");

  toggleBtn.style.display = sidebar.classList.contains("hide-sidebar") ? "block" : "none";
}

function toggleSubmenu(e) {
  e.preventDefault();
  const el = document.getElementById("settings-submenu");
  el.style.display = el.style.display === "block" ? "none" : "block";
}

function toggleSubacount(e) {
  e.preventDefault();
  const el = document.getElementById("acount-subacount");
  el.style.display = el.style.display === "block" ? "none" : "block";
}

function toggleSubdebar(e) {
  e.preventDefault();
  const el = document.getElementById("debar-subdebar");
  el.style.display = el.style.display === "block" ? "none" : "block";
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

function deleteAccount() {
  const verify = prompt("Masukkan password untuk menghapus akun:");
  if (!verify) return alert("Dibatalkan.");
  if (verify !== user.password) return alert("Password salah.");

  if (confirm("Hapus akun secara permanen?")) {
    users.splice(userIndex, 1);
    localStorage.setItem("users", JSON.stringify(users));
    logout();
  }
}

function changeUsername() {
  const newUsername = prompt("Masukkan username login baru:");

  if (!newUsername) return;

  if (/\s/.test(newUsername) || /[A-Z]/.test(newUsername)) {
    return alert("Username tidak boleh pakai spasi atau huruf besar.");
  }

  const forbidden = ["kontol", "memek", "anjing"];
  if (forbidden.some(word => newUsername.includes(word))) {
    return alert("Username tidak pantas.");
  }

  if (users.some(u => u.username === newUsername)) {
    return alert("Username sudah digunakan.");
  }

  user.username = newUsername;
  updateUser();
  alert("Username berhasil diubah. Silakan login ulang.");
  logout();
}

function changeEmail() {
  const newEmail = prompt("Email baru:");
  if (!newEmail) return;
  user.email = newEmail;
  updateUser();
  alert("Email diubah. Login ulang.");
  logout();
}

function resetPassword() {
  const newPass = prompt("Password baru:");
  if (!newPass || newPass.length < 6 || !/\d/.test(newPass)) {
    return alert("Password minimal 6 karakter dan mengandung angka.");
  }

  user.password = newPass;
  updateUser();
  alert("Password berhasil diganti. Silakan login ulang.");
  logout();
}

function changeBackground() {
  const url = prompt("URL gambar latar:");
  if (url) {
    document.body.style.background = `url('${url}') no-repeat center center / cover`;
    user.background = url;
    updateUser();
  }
}

function uploadProfilePicture(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (ev) {
    document.getElementById("profilePic").src = ev.target.result;
    user.profilePicture = ev.target.result;
    updateUser();
  };
  reader.readAsDataURL(file);
}

function copySecret() {
  navigator.clipboard.writeText(user.secretCode || "");
  alert("Kode reset disalin!");
}

function updateUser() {
  users[userIndex] = user;
  localStorage.setItem("users", JSON.stringify(users));
}

function changeDisplayName() {
  const newName = prompt("Masukkan nama tampilan baru:");

  if (!newName) return;

  user.displayName = newName;
  updateUser();
  document.getElementById("username").textContent = newName;
}

window.onload = function () {
  const displayName = user.displayName || user.username;
  document.getElementById("username").textContent = displayName;
  document.getElementById("user-email").textContent = user.email || "-";
  document.getElementById("user-secret").textContent = user.secretCode || "-";

  const joinDate = new Date(user.id);
  document.getElementById("user-joined").textContent = joinDate.toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric"
  });

  if (user.profilePicture) {
    document.getElementById("profilePic").src = user.profilePicture;
  }

  if (user.background) {
    document.body.style.background = `url('${user.background}') no-repeat center center / cover`;
  }

  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleBtn");
  toggleBtn.style.display = sidebar.classList.contains("hide-sidebar") ? "block" : "none";
};
