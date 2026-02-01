const filterDropdown = document.getElementById('filterPesanan');
const pesananHariIni = document.getElementById('pesanan-hari-ini');
const pesananBulanIni = document.getElementById('pesanan-bulan-ini');
const pesananBulanLalu = document.getElementById('pesanan-bulan-lalu');

filterDropdown.addEventListener('change', function() {
    // Sembunyikan semua section
    pesananHariIni.classList.add('hidden');
    pesananBulanIni.classList.add('hidden');
    pesananBulanLalu.classList.add('hidden');

    // Tampilkan section yang dipilih
    const selectedValue = this.value;
    if (selectedValue === 'hari-ini') {
        pesananHariIni.classList.remove('hidden');
    } else if (selectedValue === 'bulan-ini') {
        pesananBulanIni.classList.remove('hidden');
    } else if (selectedValue === 'bulan-lalu') {
        pesananBulanLalu.classList.remove('hidden');
    }
});