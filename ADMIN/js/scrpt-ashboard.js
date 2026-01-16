 // Simulasi data dummy 
 function loadDashboardData() {
    // Data contoh (bisa kamu ubah sesuka hati)
    const pendapatan_hariini = 100000;   
    const pendapatanBulanini = 100000;  
    const pesanan_hariini = 2;        
    const jumlh_pesanan_bulanini = 2;        
    const target = 100;            

    // Hitung produktivitas
    const productivity = Math.min(Math.round((jumlh_pesanan_bulanini / target) * 100), 100);

    // Update UI
    document.getElementById('pendapatan_hariini').textContent = 'Rp ' + pendapatan_hariini.toLocaleString('id-ID');
    document.getElementById('pendapatanBulanini').textContent = 'Rp ' + pendapatanBulanini.toLocaleString('id-ID');
    document.getElementById('pesanan_hariini').textContent = pesanan_hariini;
    document.getElementById('productivity').textContent = productivity + '%';
    document.getElementById('targetProgress').textContent = jumlh_pesanan_bulanini + '/' + target;
    document.getElementById('progressFill').style.width = productivity + '%';
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadDashboardData();
});

