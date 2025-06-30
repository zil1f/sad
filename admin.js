// Autentikasi: hanya admin yang boleh masuk
const isLoggedIn = localStorage.getItem("isLoggedIn");
const currentId = localStorage.getItem("currentUser");
const users = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = users.find(u => u.id == currentId);

if (!isLoggedIn || !currentUser || currentUser.username !== "admin") {
  alert("Akses ditolak: Halaman ini hanya untuk admin.");
  window.location.href = "index.html";
}

const userList = document.getElementById("userList");

users.forEach((user, index) => {
  const joinDate = new Date(user.id).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric"
  });

  const div = document.createElement("div");
  div.className = "user-card";

   div.innerHTML = `
  <div class="user-info">
    <strong>👤 Username:</strong> ${user.username}<br>
    <strong>📛 Nama Profil:</strong> ${user.name || "<i>(belum diisi)</i>"}<br>
    <strong>📧 Email:</strong> ${user.email}<br>
    <strong>🔐 Password:</strong> <code>${user.password}</code><br>
    <strong>📅 Gabung:</strong> ${joinDate}
  </div>

  ${user.username !== "admin" ? `
  <div class="user-actions">
    <button class="edit-user" onclick="editUser(${index})">Edit</button>
    <button class="delete-user" onclick="deleteUser(${index})">Hapus</button>
  </div>
  ` : ""}
`;


  userList.appendChild(div);
});

function deleteUser(index) {
  if (confirm("Hapus akun ini?")) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
  }
}

document.getElementById("exportBtn").addEventListener("click", function () {
  const dataStr = JSON.stringify(users, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "data-pengguna.json";
  link.click();

  URL.revokeObjectURL(url);
});

function editUser(index) {
  const user = users[index];

  const field = prompt(
    "Pilih data yang ingin diedit:\n- nama\n- email\n- password"
  );

  if (!field) return;

  const allowedFields = ["nama", "email", "password"];
  const selected = field.toLowerCase().trim();

  if (!allowedFields.includes(selected)) {
    alert("Input tidak valid. Pilih: nama, email, atau password.");
    return;
  }

  const newValue = prompt(`Masukkan ${selected} baru:`, user[selected] || "");

  if (!newValue) {
    alert("Perubahan dibatalkan.");
    return;
  }

  // Update field yang dipilih
  if (selected === "nama") user.name = newValue;
  if (selected === "email") user.email = newValue;
  if (selected === "password") user.password = newValue;

  localStorage.setItem("users", JSON.stringify(users));
  alert(`${selected} berhasil diperbarui.`);
  location.reload();
}

document.getElementById("backBtn").addEventListener("click", function () {
  const main = document.querySelector(".main-content");
  main.classList.add("slide-out");

  setTimeout(() => {
    window.location.href = "allaboutrul.html";
  }, 500); // durasi animasi
});

