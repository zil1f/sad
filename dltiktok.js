async function downloadVideo(urlFromHistory = null) {
  const urlInput = document.getElementById("url");
  const loading = document.getElementById("loading");
  const result = document.getElementById("result");
  const historyList = document.getElementById("historyList");

  const url = urlFromHistory || urlInput.value.trim();
  if (!url || !url.includes("tiktok.com")) {
    alert("Masukkan URL TikTok yang valid.");
    return;
  }

  // Tampilkan loading
  loading.style.display = "block";
  result.style.display = "none";

  const encodedUrl = encodeURIComponent(url);
  const api = `https://restapi-v2.simplebot.my.id/download/tiktok-v2?url=${encodedUrl}`;

  try {
    const res = await fetch(api);
    const data = await res.json();

    if (data.status && data.result.data) {
      const videoData = data.result.data;

      document.getElementById("title").textContent = videoData.title;
      document.getElementById("cover").src = videoData.cover;
      document.getElementById("video").src = videoData.play;
      document.getElementById("downloadLink").href = videoData.play;
      document.getElementById("author").textContent = `${videoData.author.nickname} (@${videoData.author.unique_id})`;
      document.getElementById("views").textContent = videoData.play_count.toLocaleString();
      document.getElementById("likes").textContent = videoData.digg_count.toLocaleString();
      document.getElementById("comments").textContent = videoData.comment_count.toLocaleString();
      document.getElementById("shares").textContent = videoData.share_count.toLocaleString();
      document.getElementById("audio").src = videoData.music;
      document.getElementById("downloadAudio").href = videoData.music;

      // ✅ Simpan ke localStorage sebagai riwayat
      if (!urlFromHistory) saveHistory(url);

      // ✅ Tampilkan riwayat
      loadHistory();

      loading.style.display = "none";
      result.style.display = "block";
    } else {
      loading.style.display = "none";
      alert("Gagal mendapatkan data video.");
    }
  } catch (err) {
    console.error(err);
    loading.style.display = "none";
    alert("Terjadi kesalahan saat mengambil data.");
  }
}

function saveHistory(url) {
  const history = JSON.parse(localStorage.getItem("tiktokHistory")) || [];
  const today = new Date().toISOString().split("T")[0];

  // Hindari duplikat URL
  const already = history.find(item => item.url === url);
  if (!already) {
    history.unshift({ url, date: today });
    if (history.length > 20) history.pop();
    localStorage.setItem("tiktokHistory", JSON.stringify(history));
  }
}

function loadHistory() {
  const historyList = document.getElementById("historyList");
  const filter = document.getElementById("filterDate").value;
  const allHistory = JSON.parse(localStorage.getItem("tiktokHistory")) || [];

  historyList.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  const filtered = allHistory.filter(item => {
    if (filter === "today") return item.date === today;
    if (filter === "yesterday") return item.date === yesterday;
    return true; // default "all"
  });

  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Tidak ada data.";
    historyList.appendChild(li);
    return;
  }

  filtered.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = `${item.url} (${item.date})`;
    a.onclick = () => downloadVideo(item.url);
    li.appendChild(a);
    historyList.appendChild(li);
  });
}