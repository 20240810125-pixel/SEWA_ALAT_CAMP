const products = [
   
    { 
        id: 1, 
        name: 'Tenda dom DL Kapasitas 4', 
        price: 40000, 
        image: 'gambar/Borneo-4-c-1.png',
        stock: 5,
        row: 'first'
    },
    { 
        id: 2, 
        name: 'Tenda dom SL Kapasitas 4', 
        price: 25000, 
        image: 'gambar/tendsl.png',
        stock: 8,
        row: 'first'
    },
    { 
        id: 3, 
        name: 'Matras Spons', 
        price: 5000, 
        image: 'gambar/matras.jpeg',
        stock: 15,
        row: 'rest'
    },
    { 
        id: 4, 
        name: 'Flysheet', 
        price: 10000, 
        image: 'gambar/Flysheet-3x3-5mg-Blackcamp.jpg',
        stock: 10,
        row: 'rest'
    },
    { 
        id: 5, 
        name: 'Kompor Windproof', 
        price: 25000, 
        image: 'gambar/KOMPOR-WINDPROOF.png',
        stock: 6,
        row: 'rest'
    },
    { 
        id: 6, 
        name: 'Cooking Set', 
        price: 15000, 
        image: 'gambar/cookingset.jpg',
        stock: 12,
        row: 'rest'
    },
    { 
        id: 7, 
        name: 'Lampu Tenda', 
        price: 5000, 
        image: 'gambar/lampu.jpg',
        stock: 20,
        row: 'rest'
    },
    { 
        id: 8, 
        name: 'Sleeping Bag', 
        price: 15000, 
        image: 'gambar/sleeping bag.png',
        stock: 3,
        row: 'rest'
    },
    { 
        id: 9, 
        name: 'Carrier 65L', 
        price: 20000, 
        image: 'gambar/carrir.jpg',
        stock: 7,
        row: 'rest'
    },
    { 
        id: 10, 
        name: 'Sepatu Outdoor', 
        price: 20000, 
        image: 'gambar/sleeping bag.png',
        stock: 4,
        row: 'rest'
    },
    { 
        id: 11, 
        name: 'Jaket Outdoor', 
        price: 20000, 
        image: 'gambar/jacket.avif',
        stock: 9,
        row: 'rest'
    }
];

let selectedProduct = null;

// Render products
function renderProducts() {
    const rowContainer = document.getElementById('cardRow');
    const mainContainer = document.getElementById('cardContainer');
    
    // Render baris pertama (2 card)
    const firstRowProducts = products.filter(p => p.row === 'first');
    rowContainer.innerHTML = firstRowProducts.map(product => createProductCard(product)).join('');
    
    // Render baris berikutnya (3 card per baris)
    const restProducts = products.filter(p => p.row === 'rest');
    mainContainer.innerHTML = restProducts.map(product => createProductCard(product)).join('');
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="card">
            <img src="${product.image}" alt="${product.name}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${formatPrice(product.price)}/HARI</p>
                <a href="#" class="btn-booking" onclick="event.preventDefault(); openModal(${product.id})">Booking</a>
            </div>
        </div>
    `;
}

// Format harga ke format Indonesia
function formatPrice(price) {
    if (price >= 1000) {
        return (price / 1000) + 'K';
    }
    return 'Rp ' + price.toLocaleString('id-ID');
}

// stock status class
function getStockClass(stock) {
    if (stock >= 10) return 'stock-available';
    if (stock >= 5) return 'stock-limited';
    return 'stock-low';
}

// stock status text
function getStockText(stock) {
    if (stock >= 10) return `Tersedia: ${stock} unit`;
    if (stock >= 5) return `Tersedia: ${stock} unit (Terbatas)`;
    return `Tersedia: ${stock} unit (Stok Menipis!)`;
}

// Open modal
function openModal(productId) {
    selectedProduct = products.find(p => p.id === productId);
    
    document.getElementById('modalProductName').textContent = selectedProduct.name;
    document.getElementById('modalImage').innerHTML = `<img src="${selectedProduct.image}" alt="${selectedProduct.name}">`;
    
    // Update stock information
    const stockInfo = document.getElementById('stockInfo');
    const stockText = document.getElementById('stockText');
    stockText.textContent = getStockText(selectedProduct.stock);
    stockInfo.className = 'stock-info ' + getStockClass(selectedProduct.stock);
    
    // Set max value for jumlah based on stock
    const jumlahInput = document.getElementById('jumlah');
    jumlahInput.value = 1;
    jumlahInput.max = selectedProduct.stock;
    
    document.getElementById('sewaHari').value = 1;
    
    calculateTotal();
    document.getElementById('orderModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    document.getElementById('orderModal').classList.remove('active');
    document.querySelector('form').reset();
    document.body.style.overflow = 'auto';
}

// Calculate total
function calculateTotal() {
    const jumlahInput = document.getElementById('jumlah');
    let jumlah = parseInt(jumlahInput.value) || 0;
    
    // Validasi tidak melebihi stok
    if (jumlah > selectedProduct.stock) {
        jumlah = selectedProduct.stock;
        jumlahInput.value = selectedProduct.stock;
        alert(`Maaf, stok hanya tersedia ${selectedProduct.stock} unit`);
    }
    
    const hari = parseInt(document.getElementById('sewaHari').value) || 0;
    const total = selectedProduct.price * jumlah * hari;
    
    document.getElementById('totalHarga').textContent = 'Rp ' + total.toLocaleString('id-ID');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    // Event listeners untuk kalkulasi otomatis
    document.getElementById('jumlah').addEventListener('input', calculateTotal);
    document.getElementById('sewaHari').addEventListener('input', calculateTotal);
});

// Handle form submit

// Ganti fungsi handleSubmit yang ada dengan ini:
function handleSubmit(e) {
    e.preventDefault();
    
    const jumlah = parseInt(document.getElementById('jumlah').value);
    
    // Validasi stok
    if (jumlah > selectedProduct.stock) {
        alert(`Maaf, stok hanya tersedia ${selectedProduct.stock} unit`);
        return;
    }
    
    // Hitung harga
    const sewaHari = parseInt(document.getElementById('sewaHari').value);
    const totalHarga = selectedProduct.price * jumlah * sewaHari;
    
    // Simpan data pesanan ke localStorage
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderData = {
        id: Date.now(),
        nama: document.getElementById('nama').value,
        barang: selectedProduct.name,
        jumlah: jumlah,
        masaSewa: sewaHari + ' hari',
        hargaBarang: 'Rp ' + (selectedProduct.price * jumlah).toLocaleString('id-ID'),
        totalHarga: 'Rp ' + totalHarga.toLocaleString('id-ID'),
        metodePembayaran: document.getElementById('metodePembayaran').value,
        tanggal: document.getElementById('tanggal').value,
        status: 'pending',
        tanggalPesan: new Date().toLocaleDateString('id-ID')
    };
    
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Tampilkan struk
    showReceipt(orderData);
    
    // Tutup modal pemesanan
    closeModal();
}

// Fungsi untuk menampilkan struk
function showReceipt(orderData) {
    // Isi data ke struk
    document.getElementById('rcptNama').textContent = orderData.nama;
    document.getElementById('rcptBarang').textContent = orderData.barang;
    document.getElementById('rcptJumlah').textContent = orderData.jumlah;
    document.getElementById('rcptMasaSewa').textContent = orderData.masaSewa;
    document.getElementById('rcptHargaBarang').textContent = orderData.hargaBarang;
    document.getElementById('rcptTotalHarga').textContent = orderData.totalHarga;
    document.getElementById('rcptMetode').textContent = orderData.metodePembayaran.toUpperCase();
    
    // Tampilkan modal struk
    document.getElementById('receiptModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fungsi untuk menutup modal struk
function closeReceipt() {
    document.getElementById('receiptModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset form dan refresh halaman untuk update stok
    document.querySelector('form').reset();
    renderProducts();
}

// Tambahkan event listener untuk menutup modal struk saat klik di luar
document.getElementById('receiptModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeReceipt();
    }
});



// Close modal when clicking outside
document.getElementById('orderModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});