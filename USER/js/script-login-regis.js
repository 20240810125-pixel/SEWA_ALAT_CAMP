function validasiLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username === "rizal" && password === "123456") {
      alert("Login berhasil!");
      // Bisa redirect ke halaman lain, contoh:
      window.location.href = "home.html";
<<<<<<< HEAD
      return false; 
=======
      return false; // cegah submit default
>>>>>>> 2e36b8a0098651eddbfa1d5358010b8bbf3395cc
    } else {
      alert("Username atau password salah.");
      return false;
    }
  }
  