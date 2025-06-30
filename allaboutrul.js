function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const toggleBtn = document.getElementById("toggleBtn");

  const isHidden = sidebar.classList.contains("hide-sidebar");

  if (isHidden) {
    sidebar.classList.remove("hide-sidebar");
    overlay.style.display = "block";
    toggleBtn.style.display = "none"; // Sembunyikan tombol ☰ saat sidebar muncul
  } else {
    sidebar.classList.add("hide-sidebar");
    overlay.style.display = "none";
    toggleBtn.style.display = "block"; // Munculkan tombol ☰ saat sidebar disembunyikan
  }
}

function toggleAllMenu(e) {
  e.preventDefault();
  const submenu = document.getElementById("all-submenu");
  submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

function deleteAccount() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentId = localStorage.getItem("currentUser");
  const index = users.findIndex(u => u.id == currentId);
  const user = users[index];

  const password = prompt("Masukkan password untuk konfirmasi:");
  if (!password || password !== user.password) {
    alert("Password salah.");
    return;
  }

  if (confirm("Yakin ingin menghapus akun ini secara permanen?")) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    logout();
  }
}

function toggleVideo() {
  const section = document.getElementById("videoSection");
  const icon = document.getElementById("arrowIcon");
  const video = document.getElementById("videoRul");
  const music = document.getElementById("bg-music");

  const isHidden = section.style.display === "none";

  if (isHidden) {
    section.style.display = "block";
    section.classList.add("show");

    video.muted = false;
    video.volume = 1;
    video.loop = true;
    video.play();

    music.pause();
    music.currentTime = 0;

    icon.classList.remove("rotate-down");
    icon.classList.add("rotate-up");
  } else {
    section.style.display = "none";
    section.classList.remove("show");

    video.pause();
    video.currentTime = 0;

    music.play();

    icon.classList.remove("rotate-up");
    icon.classList.add("rotate-down");
  }
}

function handleVideoError() {
  alert("⚠️ Video gagal dimuat. Cek URL atau format file.");

  const section = document.getElementById("videoSection");
  section.innerHTML = `
    <div style="text-align:center; padding: 20px; color: red;">
      ⚠️ Maaf, video tidak dapat ditampilkan.
    </div>
  `;

  const icon = document.getElementById("arrowIcon");
  icon.classList.remove("rotate-up");
  icon.classList.add("rotate-down");
}

// Tampilkan link admin hanya jika user adalah admin
document.addEventListener("DOMContentLoaded", function () {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentId = localStorage.getItem("currentUser");
  const currentUser = users.find(u => u.id == currentId);

  if (currentUser && currentUser.username === "admin") {
    const sidebar = document.getElementById("sidebar");

    const adminLink = document.createElement("a");
    adminLink.href = "admin.html";
    adminLink.innerHTML = `<span class="menu-icon">👑</span>Admin Panel`;
    sidebar.insertBefore(adminLink, sidebar.querySelector(".logout-btn"));
  }
});

