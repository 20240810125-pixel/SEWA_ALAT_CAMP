function validasiLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username === "admin" && password === "123456") {
      alert("Login berhasil!");
      // Bisa redirect ke halaman lain, contoh:
      window.location.href = "dashboard-admin.html";
      return false; // cegah submit default
    } else {
      alert("Username atau password salah.");
      return false;
    }
  }
  