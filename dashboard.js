// Redirect jika belum login
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "index.html";
}

// Fungsi untuk toggle sidebar
function toggleSidebar() {
  let sidebar = document.getElementById("sidebar");
  let mainContent = document.getElementById("mainContent");
  let toggleBtn = document.getElementById("toggleBtn");

  if (sidebar.classList.contains("hide-sidebar")) {
    // Buka sidebar
    sidebar.classList.remove("hide-sidebar");
    mainContent.classList.remove("expand-content");
    toggleBtn.style.display = "none";
  } else {
    // Tutup sidebar
    sidebar.classList.add("hide-sidebar");
    mainContent.classList.add("expand-content");
    toggleBtn.style.display = "block";
  }
}

function changeBackground() {
  let bgURL = prompt("Masukkan URL gambar untuk background:");
  if (bgURL) {
    document.body.style.backgroundImage = `url('${bgURL}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    localStorage.setItem("background", bgURL);
  }
}

function uploadProfilePicture(event) {
  let file = event.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("profilePic").src = e.target.result;
      localStorage.setItem("profilePicture", e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

function logout() {
  window.location.href = "index.html";
}

function deleteAccount() {
  let user = JSON.parse(localStorage.getItem("user"));
  let verify = prompt("Masukkan password untuk menghapus akun:");

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

// Toggle submenu Settings
function toggleSubmenu(event) {
  event.preventDefault();
  let submenu = document.getElementById("settings-submenu");
  submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}

// Toggle submenu Acount
function toggleSubacount(event) {
  event.preventDefault();
  let subacount = document.getElementById("acount-subacount");
  subacount.style.display = subacount.style.display === "block" ? "none" : "block";
}

// Fungsi untuk ganti email
function changeEmail() {
  let email = prompt("Masukkan email baru:");
  if (email) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.email = email;
    localStorage.setItem("user", JSON.stringify(user));
    alert("Email berhasil diubah! Anda akan logout.");
    
    // Logout otomatis
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
  }
}


// Fungsi reset password
function resetPassword() {
  let newPass = prompt("Masukkan password baru:");
  if (newPass) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.password = newPass;
    localStorage.setItem("user", JSON.stringify(user));
    alert("Password berhasil direset! Anda akan logout.");
    
    // Logout otomatis
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
  }
}

function changeUsername() {
  let newUsername = prompt("Masukkan username baru (tanpa spasi, huruf kecil, dan tidak jorok):");

  if (!newUsername) return;

  const hasSpace = /\s/.test(newUsername);
  const hasUppercase = /[A-Z]/.test(newUsername);

  // Daftar kata tidak pantas (bisa ditambah lagi)
  const forbiddenWords = ["anjing", "babi", "kontol", "memek", "bangsat", "asu", "fuck", "shit"];

  const containsBadWord = forbiddenWords.some(word =>
    newUsername.toLowerCase().includes(word)
  );

  if (hasSpace) {
    alert("Username tidak boleh mengandung spasi.");
    return;
  }

  if (hasUppercase) {
    alert("Username tidak boleh mengandung huruf kapital.");
    return;
  }

  if (containsBadWord) {
    alert("Username mengandung kata tidak pantas.");
    return;
  }

  let user = JSON.parse(localStorage.getItem("user"));
  user.username = newUsername;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("username", newUsername);
  alert("Username berhasil diubah! Anda akan logout.");

  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
}

window.onload = function() {
  let savedUsername = localStorage.getItem("username");
  let savedBackground = localStorage.getItem("background");
  let savedProfilePicture = localStorage.getItem("profilePicture");

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

  // Atur tombol ☰ sesuai status sidebar saat pertama kali load
  let sidebar = document.getElementById("sidebar");
  let toggleBtn = document.getElementById("toggleBtn");

  if (sidebar.classList.contains("hide-sidebar")) {
    toggleBtn.style.display = "block";
  } else {
    toggleBtn.style.display = "none";
  }
};
