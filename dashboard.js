// Fungsi untuk toggle sidebar
function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    let mainContent = document.getElementById("mainContent");
    let toggleBtn = document.getElementById("toggleBtn");

    if (sidebar.classList.contains("hide-sidebar")) {
        // Buka sidebar
        sidebar.classList.remove("hide-sidebar");
        mainContent.classList.remove("expand-content");
        toggleBtn.style.display = "none"; // Sembunyikan tombol ☰
    } else {
        // Tutup sidebar
        sidebar.classList.add("hide-sidebar");
        mainContent.classList.add("expand-content");
        toggleBtn.style.display = "block"; // Tampilkan tombol ☰
    }
}

// Fungsi untuk edit username
function editProfile() {
    let newUsername = prompt("Masukkan username baru:");
    if (newUsername) {
        document.getElementById("username").textContent = newUsername;
        localStorage.setItem("username", newUsername);
    }
}

// Fungsi untuk mengganti background
function changeBackground() {
    let bgURL = prompt("Masukkan URL gambar untuk background:");
    if (bgURL) {
        document.body.style.backgroundImage = `url('${bgURL}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        localStorage.setItem("background", bgURL);
    }
}

// Fungsi untuk upload dan menyimpan foto profil
function uploadProfilePicture(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profilePic").src = e.target.result;
            localStorage.setItem("profilePicture", e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// Fungsi Logout
function logout() {
    window.location.href = "index.html"; // Ganti dengan halaman login
}

// Fungsi Hapus Akun
function deleteAccount() {
    if (confirm("Apakah Anda yakin ingin menghapus akun? Data tidak bisa dikembalikan!")) {
        localStorage.removeItem("profilePic");
        localStorage.removeItem("username");
        localStorage.removeItem("background");

        window.location.href = "index.html";
    }
}

// Load data dari localStorage saat halaman dibuka
window.onload = function () {
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
};
