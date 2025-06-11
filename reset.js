function resetPassword() {
  const username = document.getElementById("reset-username").value.trim();
  const email = document.getElementById("reset-email").value.trim();
  const code = document.getElementById("reset-code").value.trim();
  const newPass = document.getElementById("reset-new-password").value.trim();

  const stored = localStorage.getItem("user");
  if (!stored) return showToast("Tidak ada akun terdaftar!", false);

  const user = JSON.parse(stored);

  if (username !== user.username || email !== user.email || code !== user.secretCode) {
    return showToast("Data tidak cocok. Reset gagal!", false);
  }

  if (newPass.length < 6 || !/\d/.test(newPass)) {
    return showToast("Password minimal 6 karakter & mengandung angka!", false);
  }

  user.password = newPass;
  localStorage.setItem("user", JSON.stringify(user));
  showToast("Password berhasil direset!", true);
  setTimeout(() => window.location.href = "index.html", 2500);
}

function showToast(msg, success = true) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.style.background = success ? "#28a745" : "#dc3545";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
