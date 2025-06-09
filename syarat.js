function goBack() {
    window.history.back();
}

function toggleMusic() {
    let music = document.getElementById("bg-music");
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}
