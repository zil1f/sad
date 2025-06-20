function goBack() {
    window.history.back();
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
