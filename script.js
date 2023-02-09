// Semua Variabel

let productCatalogue = [
    { id: 1, name: "AK-47", category: "Assault Rifle", price: 35000000, image: "./images/ak-47.jpg", stock: "12" },
    { id: 2, name: "M14", category: "Assault Rifle", price: 25000000, image: "./images/m14.jpg", stock: "12" },
    { id: 3, name: "Taurus G3C", category: "Pistol", price: 12500000, image: "./images/Taurus_G3c_Pistol.png", stock: "12" },
    { id: 4, name: "Charles Daly 1911", category: "Pistol", price: 18000000, image: "./images/Charles_Daly_1911_Pistol.png", stock: "12" },
    { id: 5, name: "KS-12", category: "Assault Rifle", price: 9000000, image: "./images/kalashnikov_KS-12.png", stock: "12" },
    { id: 6, name: "DPMS Lite 16 A3 Remington", category: "Assault Rifle", price: 45000000, image: "./images/DPMS_Lite_16_A3_Remington.png", stock: "12" },
    { id: 7, name: "C5 mine", category: "Bombs", price: 2000000, image: "./images/c5.jpg", stock: "12" },
    { id: 8, name: "Tsar Bomba", category: "Bombs", price: 1, image: "./images/tsar_bomba.jpeg", stock: "12" },
    { id: 9, name: "M1014", category: "shotgun", price: 1000000, image: "./images/M1014.png", stock: "12" },
    { id: 10, name: "M1873", category: "shotgun", price: 1000000, image: "./images/M1873.png", stock: "12" },
    { id: 11, name: "SPAS12", category: "shotgun", price: 1000000, image: "./images/SPAS12.png", stock: "12" },
    { id: 12, name: "SPAS15", category: "shotgun", price: 1000000, image: "./images/SPAS15.png", stock: "12" },
    { id: 13, name: "FlashBang", category: "bomb", price: 1000000, image: "./images/Flashbang.png", stock: "12" },
    { id: 14, name: "Flashsmoke", category: "bomb", price: 1000000, image: "./images/Smoke.png", stock: "12" },
    { id: 15, name: "M1911", category: "pistol", price: 1000000, image: "./images/M1911.png", stock: "12" },
    { id: 16, name: "Revolver", category: "pistol", price: 1000000, image: "./images/Revolver.png", stock: "12" },
];

let cart = []; // untuk menampung produk yang udah dibeli

let productCounts = {}; // untuk display count, nama dan price di dalam halaman cart

showAll(); // Untuk nunjukin semua barang

let searchBar = document.getElementById("searchBar"); // Untuk fungsi search

let searchInput = document.getElementById("searchBar").value.toLowerCase(); // untuk fungsi search


// Fungsi-Fungsi

// Menunjukkan semua barang di katalog
function showAll() {
    showCatalogue(productCatalogue);
    document.getElementById("emptyContainer").style.display = `none`;
    document.getElementById("showAll").style.display = `none`;
}

// Menambahkan barang ke keranjang
function addtoCart(id) {
    let product = productCatalogue.filter((el) => el.id === id);    // Filter barang berdasarkan id, hasil adalah barang
                                                                    // dengan id yang sama dengan parameter 
    cart.push(product[0]);
    productName = cart[cart.length - 1].name;
    if (!productCounts[productName]) {                              // Mindahin dari cart ke productCounts
        productCounts[productName] = {
            quantity: 1,
            price: product[0].price
        }
    } else {
        productCounts[productName].quantity++;
    }
    document.getElementById("count").innerHTML = Object.keys(productCounts).length;
    // Display keranjang counter
    if (document.getElementById("count").innerHTML > 0) {
        document.getElementById("count").style.display = `inline-block`;
    }
}

// Filter Barang berdasarkan kategori
function filterCategory(category) {
    let filteredProducts = productCatalogue.filter(el => el.category === category);
    showCatalogue(filteredProducts);
    document.getElementById("showAll").style.display = `block`;
    document.getElementById("emptyContainer").style.display = `none`;
}

// Menunjukkan barang di homepage
function showCatalogue(products) {
    if (products.length === 0) {
        document.getElementById("emptyContainer").style.display = 'block';
    }
    productContainer.style.display = `flex`;
    productContainer.style.flexWrap = `wrap`;
    productContainer.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        cardPrice = formatNumber(products[i].price);
        productContainer.innerHTML +=
        `<div class="productCard">
            <div class="productProfile">
                <img class="productImage" src="${products[i].image}" alt="">
                <p class="productName">${products[i].name}</p>
                <p class="productPrice">${cardPrice}</p>
                <p class="productCategory">${products[i].category}</p>
                <button onclick='addtoCart(${products[i].id})'>tambah ke keranjang</button>
            </div>
        </div>`
    }
}

// Modal Popup

function openModal() {
    modal.style.display = "block";
    showItems();
}

// Tutup Modal

function closeModal() {
    modal.style.display = "none";
}

// Nambahin/Kurangin barang
function addSubstract(num, index) {
    let cartName = Object.keys(productCounts);
    let cartList = Object.values(productCounts);
    console.log(cartList);
    console.log(cartName);
    let quantity = cartList[index-1].quantity;
    let price = cartList[index-1].price;
    if (quantity == 1 && num == -1) {
        quantity = quantity;
    } else {
        quantity += num;
        subTotal = formatNumber(quantity*price);
        productCounts[cartName[index-1]].quantity = quantity;
        document.getElementsByClassName("quantity")[index - 1].innerText = quantity;
        document.getElementsByClassName("rowSubtotal")[index - 1].innerText = subTotal;
    }
}

// Nunjukin Barang di Cart
function showItems() {
    let itemsLength = Object.keys(productCounts).length;
    let checkoutTable = document.getElementById("checkoutTable");
    let sumCheckout = 0;
    checkoutTable.innerHTML = 
    `<tr>
        <th>No</th>
        <th>Nama</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Subtotal</th>
        <th></th>
    </tr>`
    for (let i = 0; i < itemsLength; i++) {
        productPrice = formatNumber(Object.values(productCounts)[i].price);
        productSubtotal = formatNumber(Object.values(productCounts)[i].price * Object.values(productCounts)[i].quantity);
        sumCheckout += Object.values(productCounts)[i].price;
        checkoutTable.innerHTML += 
        `<tr>
            <td class="rowNumber">${i+1}</td>
            <td class="rowName">${Object.keys(productCounts)[i]}</td>
            <td class="rowQuantity">
                <span class="addSubstract" onclick="addSubstract(-1,document.getElementsByClassName('rowNumber')[${i}].innerText)">-</span>
                <span class="quantity">${Object.values(productCounts)[i].quantity}</span>
                <span class="addSubstract" onclick="addSubstract(1,document.getElementsByClassName('rowNumber')[${i}].innerText)">+</span>
            </td>
            <td class="rowPrice">${productPrice}</td>
            <td class="rowSubtotal">${productSubtotal}</td>
            <td class="rowDelete" onclick="removeItem(document.getElementsByClassName('rowName')[${i}].innerText)">x</td>
        </tr>`
    }
    checkoutTable.innerHTML +=
    `<tr>
        <td class="rowNumber"></td>
        <td class="rowName"></td>
        <td class="rowQuantity">
        </td>
        <td class="rowPrice">Total</td>
        <td class="rowSubtotal">${formatNumber(sumCheckout)}</td>
        <td class="rowDelete"></td>
    </tr>`
}

// Ngehapusin isi dari tabel checkout
function removeItem(rowName) {
    delete productCounts[rowName];
    document.getElementById("count").innerHTML = Object.keys(productCounts).length;
    showItems();
}

// tombol Clear
function removeAll() {
    cart = [];
    productCounts = {};
    document.getElementById("count").style.display = 'none';
    showItems();
}

// tombol Checkout
function buyProduct() {
    document.getElementById("checkoutTable").style.display = 'none';
    document.getElementById("buy").style.display = 'none';
    document.getElementById("modalTitle").innerHTML = '<span id="closeModalIcon" onclick="closeModal()">&times;</span></p>';
    document.getElementById("modalMessage").innerText = 'Terima kasih sudah belanja di sini!';
}

// Fungsi search barang pakai enter
searchBar.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("searchButton").click();
    }
})

// Fungsi search barang pakai tombol
function searchProduct() {
    let searchInput = document.getElementById("searchBar").value.toLowerCase();
    let searchedProducts = productCatalogue.filter((el) => {
        let searchedName = el.name.toLowerCase();
        let searchedCategory = el.category.toLowerCase();
        if (searchedName.includes(searchInput) || searchedCategory.includes(searchInput)) {
            return true;
        }
    });
    showCatalogue(searchedProducts);
    if (searchedProducts.length === productCatalogue.length) {
        document.getElementById("showAll").style.display = `none`;
    } else {
        document.getElementById("showAll").style.display = `block`;
    }
    if (searchedProducts.length > 0) {
        document.getElementById("emptyContainer").style.display = `none`;
    }
}

// Formatting harga ke Rp
function formatNumber(num) {
    let idr = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
        }).format(num);
        return idr;
}
