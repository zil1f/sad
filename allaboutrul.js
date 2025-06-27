

// Fungsi buka-tutup sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleBtn");
  const overlay = document.getElementById("overlay");

  const isHidden = sidebar.classList.contains("hide-sidebar");

  if (isHidden) {
    sidebar.classList.remove("hide-sidebar");
    toggleBtn.style.display = "none";
    overlay.style.display = "block";
  } else {
    sidebar.classList.add("hide-sidebar");
    toggleBtn.style.display = "block";
    overlay.style.display = "none";
  }
}


// Toggle submenu "All"
function toggleAllMenu(event) {
  event.preventDefault();
  const submenu = document.getElementById("all-submenu");
  submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}

// Logout
function logout() {
  window.location.href = "index.html";
}

// Delete Account
function deleteAccount() {
  const user = JSON.parse(localStorage.getItem("user"));
  const verify = prompt("Masukkan password untuk menghapus akun:");

  if (!verify) {
    alert("Verifikasi dibatalkan.");
    return;
  }

  if (verify !== user.password) {
    alert("Password salah. Akun tidak dihapus.");
    return;
  }

  if (confirm("Apakah Anda yakin ingin menghapus akun? Semua data akan hilang!")) {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("profilePicture");
    localStorage.removeItem("background");
    localStorage.removeItem("isLoggedIn");

    alert("Akun berhasil dihapus.");
    window.location.href = "index.html";
  }
}

// Tampilkan toggleBtn di awal sesuai status sidebar
window.onload = function () {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleBtn");

  if (sidebar.classList.contains("hide-sidebar")) {
    toggleBtn.style.display = "block";
  } else {
    toggleBtn.style.display = "none";
  }
}

function toggleMusic() {
  const music = document.getElementById("bg-music");
  if (music.paused) {
    music.muted = false;
    music.play();
  } else {
    music.pause();
  }
}

// Unmute dan play saat halaman siap
window.addEventListener("load", () => {
  const music = document.getElementById("bg-music");
  music.muted = false;
  music.play().catch(() => {
    // Autoplay ditolak browser
    console.log("Autoplay ditolak. Tunggu interaksi user.");
  });
});

function toggleVideo() {
  const section = document.getElementById("videoSection");
  const icon = document.getElementById("arrowIcon");
  const video = document.getElementById("videoRul");
  const music = document.getElementById("bg-music");

  if (section.style.display === "none") {
    // Tampilkan video
    section.style.display = "block";
    section.classList.add("show");

    // Putar video dan hentikan musik
    video.play();
    music.pause();
    music.currentTime = 0;

    // Putar animasi ikon
    icon.classList.remove("rotate-down");
    icon.classList.add("rotate-up");
  } else {
    // Sembunyikan video
    section.style.display = "none";
    section.classList.remove("show");

    // Stop video dan lanjutkan musik
    video.pause();
    video.currentTime = 0;
    music.play();

    // Balikkan ikon
    icon.classList.remove("rotate-up");
    icon.classList.add("rotate-down");
  }
}

