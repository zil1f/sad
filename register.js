function checkRegisterInput() {
    let username = document.getElementById("register-username").value;
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;
    let agreeTerms = document.getElementById("agreeTerms").checked;
    let registerBtn = document.getElementById("register-btn");

    if (username.trim() !== "" && email.trim() !== "" && password.trim() !== "" && agreeTerms) {
        registerBtn.classList.add("active");
    } else {
        registerBtn.classList.remove("active");
    }
}

function register() {
    let usernameInput = document.getElementById("register-username");
    let emailInput = document.getElementById("register-email");
    let passwordInput = document.getElementById("register-password");
    let errorMsg = document.getElementById("error-msg");

    let storedUser = localStorage.getItem("user");

    if (storedUser) {
        let userData = JSON.parse(storedUser);
        if (usernameInput.value === userData.username) {
            errorMsg.innerText = "Username sudah terdaftar!";
            errorMsg.style.display = "block";
            return;
        }
    }

    if (usernameInput.value && emailInput.value && passwordInput.value) {
        let newUser = {
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };

        localStorage.setItem("user", JSON.stringify(newUser));
        alert("Registrasi Berhasil! Silakan login.");
        window.location.href = "index.html";
    } else {
        errorMsg.innerText = "Harap isi semua data!";
        errorMsg.style.display = "block";
    }
}

function toggleVisibility(id) {
    let inputField = document.getElementById(id);
    inputField.type = (inputField.type === "password") ? "text" : "password";
}

document.getElementById("register-form").addEventListener("submit", function(e) {
  e.preventDefault();
  register();
});

document.getElementById("register-form").addEventListener("submit", function(e) {
  e.preventDefault();
  register();
});
