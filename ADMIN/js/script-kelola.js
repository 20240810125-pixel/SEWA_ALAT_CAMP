// Data produk Rimba Shelter
const products = [
    // Baris pertama (2 card besar)
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
    // Baris berikutnya (3 card per baris)
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
let productToDelete = null;

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
    
    // Tambahkan event listener untuk tombol edit dan hapus
    attachEventListeners();
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${formatPrice(product.price)}/HARI</p>
                <p class="card-text">stok: ${product.stock}</p>
                <a href="#" class="btn-edit" data-id="${product.id}">Edit</a>
                <a href="#" class="btn-hapus" data-id="${product.id}">hapus</a>
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

// Attach event listeners ke tombol edit dan hapus
function attachEventListeners() {
    // Event listener untuk tombol edit
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(e.target.getAttribute('data-id'));
            openEditModal(productId);
        });
    });
    
    // Event listener untuk tombol hapus
    document.querySelectorAll('.btn-hapus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(e.target.getAttribute('data-id'));
            openDeleteModal(productId);
        });
    });
}

// Buka modal edit
function openEditModal(productId) {
    selectedProduct = products.find(p => p.id === productId);
    if (!selectedProduct) return;
    
    // Isi form dengan data produk
    document.getElementById('productName').value = selectedProduct.name;
    document.getElementById('productPrice').value = selectedProduct.price;
    document.getElementById('productStock').value = selectedProduct.stock;
    
    // Tampilkan modal
    document.getElementById('editModal').style.display = 'block';
}

// Buka modal konfirmasi hapus
function openDeleteModal(productId) {
    productToDelete = productId;
    document.getElementById('deleteModal').style.display = 'block';
}

// Tutup modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Event listeners untuk modal edit
document.querySelector('.close').addEventListener('click', () => {
    closeModal('editModal');
});

document.querySelector('.btn-cancel').addEventListener('click', () => {
    closeModal('editModal');
});

// Event listener untuk upload gambar
document.querySelector('.upload-btn').addEventListener('click', () => {
    document.getElementById('productImage').click();
});

document.getElementById('productImage').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            // Simpan gambar baru (dalam implementasi nyata, upload ke server)
            selectedProduct.image = event.target.result;
            console.log('Gambar baru dipilih:', file.name);
        };
        reader.readAsDataURL(file);
    }
});

// Submit form edit
document.getElementById('editForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (selectedProduct) {
        // Update data produk
        selectedProduct.name = document.getElementById('productName').value;
        selectedProduct.price = parseInt(document.getElementById('productPrice').value);
        selectedProduct.stock = parseInt(document.getElementById('productStock').value);
        
        // Render ulang produk
        renderProducts();
        
        // Tutup modal
        closeModal('editModal');
        
        alert('Produk berhasil diupdate!');
    }
});

// Event listeners untuk modal hapus
document.getElementById('cancelDelete').addEventListener('click', () => {
    closeModal('deleteModal');
    productToDelete = null;
});

document.getElementById('confirmDelete').addEventListener('click', () => {
    if (productToDelete !== null) {
        // Hapus produk dari array
        const index = products.findIndex(p => p.id === productToDelete);
        if (index > -1) {
            products.splice(index, 1);
        }
        
        // Render ulang produk
        renderProducts();
        
        // Tutup modal
        closeModal('deleteModal');
        productToDelete = null;
        
        alert('Produk berhasil dihapus!');
    }
});

// Tutup modal jika klik di luar modal
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal('editModal');
        closeModal('deleteModal');
        closeModal('addModal'); // Tambahkan untuk modal tambah
    }
});

// Event listener untuk tombol tambah produk
document.getElementById('btnTambahProduk').addEventListener('click', () => {
    // Reset form tambah produk
    document.getElementById('addForm').reset();
    document.getElementById('selectedFileName').textContent = '';
    // Tampilkan modal tambah
    document.getElementById('addModal').style.display = 'block';
});

// Event listeners untuk modal tambah produk
document.querySelector('.close-add').addEventListener('click', () => {
    closeModal('addModal');
});

document.querySelector('.btn-cancel-add').addEventListener('click', () => {
    closeModal('addModal');
});

// Event listener untuk upload gambar pada modal tambah
document.querySelector('.upload-btn-add').addEventListener('click', () => {
    document.getElementById('newProductImage').click();
});

document.getElementById('newProductImage').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('selectedFileName').textContent = file.name;
        // Dalam implementasi nyata, Anda bisa menyimpan file ini untuk upload
    }
});

// Submit form tambah produk
document.getElementById('addForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Ambil data dari form
    const name = document.getElementById('newProductName').value;
    const price = parseInt(document.getElementById('newProductPrice').value);
    const stock = parseInt(document.getElementById('newProductStock').value);
    const row = document.getElementById('newProductRow').value;
    const imageFile = document.getElementById('newProductImage').files[0];
    
    if (!name || !price || stock < 0) {
        alert('Harap isi semua field dengan benar!');
        return;
    }
    
    // Generate ID baru (ID terbesar + 1)
    const newId = Math.max(...products.map(p => p.id)) + 1;
    
    // Default image jika tidak ada file dipilih
    let image = 'gambar/default.png'; // Ganti dengan gambar default jika diperlukan
    if (imageFile) {
        // Dalam implementasi nyata, upload file ke server dan dapatkan URL
        // Untuk demo, gunakan FileReader untuk preview
        const reader = new FileReader();
        reader.onload = (event) => {
            image = event.target.result;
            // Tambahkan produk baru ke array
            const newProduct = {
                id: newId,
                name: name,
                price: price,
                image: image,
                stock: stock,
                row: row
            };
            products.push(newProduct);
            
            // Render ulang produk
            renderProducts();
            
            // Tutup modal
            closeModal('addModal');
            
            alert('Produk berhasil ditambahkan!');
        };
        reader.readAsDataURL(imageFile);
    } else {
        // Jika tidak ada gambar, gunakan default
        const newProduct = {
            id: newId,
            name: name,
            price: price,
            image: image,
            stock: stock,
            row: row
        };
        products.push(newProduct);
        
        // Render ulang produk
        renderProducts();
        
        // Tutup modal
        closeModal('addModal');
        
        alert('Produk berhasil ditambahkan!');
    }
});

// Panggil renderProducts untuk menampilkan kartu saat halaman dimuat
renderProducts();