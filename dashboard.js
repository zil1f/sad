function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");
  const toggleBtn = document.querySelector(".sidebar-toggle");

  sidebar.classList.toggle("hide-sidebar");
  mainContent.classList.toggle("expand-content");

  if (sidebar.classList.contains("hide-sidebar")) {
    toggleBtn.style.display = "block";
  } else {
    toggleBtn.style.display = "none";
  }
}

function toggleSubmenu() {
  const submenu = document.getElementById("settings-submenu");
  submenu.classList.toggle("show");
}

function changeUsername() {
  const newUsername = prompt("Masukkan username baru (huruf kecil, tanpa spasi):");
  if (!newUsername || /\s/.test(newUsername) || /[A-Z]/.test(newUsername)) {
    showToast("Username hanya huruf kecil & tanpa spasi!", false);
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  user.username = newUsername;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("username", newUsername);
  document.getElementById("username").textContent = newUsername;
  showToast("Username berhasil diganti!", true);
}

function changeEmail() {
  const newEmail = prompt("Masukkan email baru:");
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(newEmail)) {
    showToast("Email tidak valid!", false);
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  user.email = newEmail;
  localStorage.setItem("user", JSON.stringify(user));
  showToast("Email berhasil diganti!", true);
}

function resetPassword() {
  const newPass = prompt("Masukkan password baru (min 6 karakter & angka):");
  if (!newPass || newPass.length < 6 || !/\d/.test(newPass)) {
    showToast("Password tidak valid!", false);
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  user.password = newPass;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.removeItem("isLoggedIn");
  showToast("Password berhasil diubah. Anda akan logout...", true);
  setTimeout(() => (window.location.href = "index.html"), 2500);
}

function showAccountSettings() {
  const container = document.getElementById("account-settings");
  container.style.display = "block";
  container.innerHTML = `
    <div class="profile-card">
      <h3 style="margin-bottom: 10px;">Pengaturan Akun</h3>
      <button class="edit-btn" onclick="changeUsername()">📝 Ganti Username</button>
      <button class="edit-btn" onclick="changeEmail()">✉️ Ganti Email</button>
      <button class="edit-btn" onclick="resetPassword()">🔒 Reset Sandi</button>
    </div>
  `;
}

function logout() {
  window.location.href = "index.html";
}

function deleteAccount() {
  const user = JSON.parse(localStorage.getItem("user"));
  const confirmPw = prompt("Masukkan password untuk menghapus akun:");
  if (confirmPw !== user.password) {
    showToast("Password salah. Tidak jadi hapus akun.", false);
    return;
  }

  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("profilePicture");
  localStorage.removeItem("username");
  localStorage.removeItem("background");

  showToast("Akun berhasil dihapus.", true);
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}

function changeBackground() {
  const bgURL = prompt("Masukkan URL gambar untuk background:");
  if (bgURL) {
    document.body.style.backgroundImage = `url('${bgURL}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    localStorage.setItem("background", bgURL);
  }
}

function uploadProfilePicture(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("profilePic").src = e.target.result;
      localStorage.setItem("profilePicture", e.target.result);
    };
    reader.readAsDataURL(file);
  }
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

window.onload = function () {
  const savedUsername = localStorage.getItem("username");
  const savedBackground = localStorage.getItem("background");
  const savedProfilePicture = localStorage.getItem("profilePicture");

  if (savedUsername) {
    document.getElementById("username").textContent = savedUsername;
  }

  if (savedBackground) {
    document.body.style.backgroundImage = `url('${savedBackground}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }

  if (savedProfilePicture) {
    document.getElementById("profilePic").src = savedProfilePicture;
  }

  document.querySelector(".sidebar-toggle").style.display = "none";
};
