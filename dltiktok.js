function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");
  const toggleBtn = document.getElementById("toggleBtn");

  const isHidden = sidebar.classList.contains("hide-sidebar");

  if (isHidden) {
    sidebar.classList.remove("hide-sidebar");
    mainContent.classList.remove("expand-content");
    toggleBtn.style.display = "none";
  } else {
    sidebar.classList.add("hide-sidebar");
    mainContent.classList.add("expand-content");
    toggleBtn.style.display = "block";
  }
}

function logout() {
  window.location.href = "index.html";
}

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

  if (confirm("Apakah Anda yakin ingin menghapus akun?")) {
    localStorage.clear();
    alert("Akun berhasil dihapus.");
    window.location.href = "index.html";
  }
}

async function downloadVideo() {
  const urlInput = document.getElementById("url").value;
  if (!urlInput) return alert("Tempel link TikTok terlebih dahulu!");
  if (!urlInput.includes("tiktok.com")) return alert("Masukkan URL TikTok yang valid!");

  const encodedUrl = encodeURIComponent(urlInput);
  const apiUrl = `https://restapi-v2.simplebot.my.id/download/tiktok-v2?url=${encodedUrl}`;

  try {
    const response = await fetch(apiUrl);
    const json = await response.json();

    if (json.status && json.result.data) {
      const data = json.result.data;
      document.getElementById("video").src = data.play;
      document.getElementById("audio").src = data.music;
      const link = document.getElementById("downloadLink");
      link.href = data.play;
      link.setAttribute("download", "zittdl.mp4");
      document.getElementById("title").textContent = data.title;
      document.getElementById("author").textContent = data.author.nickname + " (@" + data.author.unique_id + ")";
      document.getElementById("views").textContent = data.play_count.toLocaleString();
      document.getElementById("likes").textContent = data.digg_count.toLocaleString();
      document.getElementById("comments").textContent = data.comment_count.toLocaleString();
      document.getElementById("shares").textContent = data.share_count.toLocaleString();
      document.getElementById("result").style.display = "block";
    } else {
      alert("Gagal mengambil data. Pastikan URL valid.");
    }
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat mengambil data.");
  }
}

window.onload = function () {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleBtn");
  toggleBtn.style.display = sidebar.classList.contains("hide-sidebar") ? "block" : "none";
};
