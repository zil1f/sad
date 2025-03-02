<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            display: flex;
            min-height: 100vh;
            background-color: #f4f4f4;
            transition: background 0.3s ease;
        }

        /* Sidebar */
        .sidebar {
            width: 250px;
            background: #007bff;
            padding: 20px;
            color: white;
            position: fixed;
            height: 100vh;
            left: 0;
            top: 0;
            transition: transform 0.3s ease;
            z-index: 1000;
        }

        .sidebar h2 {
            margin-bottom: 20px;
        }

        .sidebar a {
            display: block;
            color: white;
            text-decoration: none;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 10px;
            transition: 0.3s;
        }

        .sidebar a:hover {
            background: #0056b3;
        }

        .logout-btn {
            background: red;
            text-align: center;
        }

        /* Tombol Close Sidebar */
        .close-sidebar {
            position: absolute;
            top: 10px;
            right: 15px;
            background: red;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 50%;
            font-size: 16px;
            cursor: pointer;
            transition: 0.3s;
        }

        .close-sidebar:hover {
            background: darkred;
        }

        /* Konten utama */
        .main-content {
            flex: 1;
            margin-left: 250px;
            padding: 20px;
            transition: margin-left 0.3s ease;
        }

        .profile-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 20px;
            max-width: 400px;
        }

        .profile-card img {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 3px solid #007bff;
            cursor: pointer;
            transition: 0.3s;
        }

        .profile-card img:hover {
            transform: scale(1.1);
        }

        .profile-info {
            flex: 1;
        }

        /* Modal untuk foto profil */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }

        .modal-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            position: relative;
        }

        .modal-content img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 3px solid #007bff;
        }

        .modal-buttons {
            margin-top: 10px;
            display: flex;
            justify-content: center;
            gap: 10px;
        }

        .modal-buttons button {
            background: #007bff;
            color: white;
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: 0.3s;
        }

        .modal-buttons button:hover {
            background: #0056b3;
        }

        .close-modal {
            position: absolute;
            top: 10px;
            right: 15px;
            background: red;
            color: white;
            border: none;
            padding: 5px;
            border-radius: 50%;
            font-size: 16px;
            cursor: pointer;
            transition: 0.3s;
        }

        .close-modal:hover {
            background: darkred;
        }
    </style>
</head>
<body>

    <!-- Sidebar -->
    <div class="sidebar" id="sidebar">
        <button class="close-sidebar" onclick="toggleSidebar()">X</button>
        <h2>Dashboard</h2>
        <a href="#">Beranda</a>
        <a href="#">Pengaturan</a>
        <a href="#" class="logout-btn">Logout</a>
    </div>

    <!-- Konten Utama -->
    <div class="main-content">
        <div class="profile-card">
            <img src="https://via.placeholder.com/70" alt="Foto Profil" id="profilePic" onclick="openModal()">
            <div class="profile-info">
                <h3 id="username">User</h3>
            </div>
        </div>
    </div>

    <!-- Modal untuk foto profil -->
    <div class="modal" id="profileModal">
        <div class="modal-content">
            <button class="close-modal" onclick="closeModal()">X</button>
            <img src="https://via.placeholder.com/150" id="modalProfilePic">
            <div class="modal-buttons">
                <button onclick="viewProfilePic()">Lihat Foto</button>
                <button onclick="changeProfilePic()">✏️</button>
            </div>
        </div>
    </div>

    <script>
        function openModal() {
            document.getElementById("profileModal").style.display = "flex";
            document.getElementById("modalProfilePic").src = document.getElementById("profilePic").src;
        }

        function closeModal() {
            document.getElementById("profileModal").style.display = "none";
        }

        function viewProfilePic() {
            window.open(document.getElementById("profilePic").src, "_blank");
        }

        function changeProfilePic() {
            let newPic = prompt("Masukkan URL foto profil baru:");
            if (newPic) {
                document.getElementById("profilePic").src = newPic;
                document.getElementById("modalProfilePic").src = newPic;
                localStorage.setItem("profilePic", newPic);
            }
        }

        window.onload = function() {
            let savedProfilePic = localStorage.getItem("profilePic");
            if (savedProfilePic) {
                document.getElementById("profilePic").src = savedProfilePic;
            }
        };
    </script>

</body>
</html>