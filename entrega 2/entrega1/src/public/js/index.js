console.log("Hola desde el server");

const SOCKET = io();
const FORM = document.getElementById("form");

// Conexión al servidor
SOCKET.on("connect", () => {
    console.log("Conectado al server");
});

// Actualización de la lista de productos
SOCKET.on("products", (products) => {
    const PRODUCT_LIST = document.getElementById("product-list");
    PRODUCT_LIST.innerHTML = "";
    products.forEach((product) => {
        const availabilityIcon = product.available
            ? "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\" height=\"15\" fill=\"currentColor\" color=\"green\" class=\"bi bi-check2 available\" viewBox=\"0 0 16 16\"><path d=\"M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0\"/></svg>"
            : "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\" height=\"15\" fill=\"currentColor\" color=\"red\" class=\"bi bi-x-lg available\" viewBox=\"0 0 16 16\"><path d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z\"/></svg>";

        const cardHTML = `
            <div class="card">
                <div class="actions">
                    <a class="available" id="available-${product.id}">${availabilityIcon}</a>
                    <a class="delete" id="delete-${product.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" color="red" class="bi bi-trash3 delete" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </a>
                </div>
                <span class="id">ID: ${product.id}</span>
                <p class="code">Code: ${product.code}</p>
                <p class="category">Category: ${product.category}</p>
                <p class="title">Title: ${product.title}</p>
                <img src="${product.thumbnail[0]}" alt="Thumbnail">
                <p class="price">Price: ${product.price}</p>
                <p class="stock">Stock: ${product.stock}</p>
                <p class="description">Description: ${product.description}</p>
            </div>
        `;

        PRODUCT_LIST.innerHTML += cardHTML;

        // Agregar eventos a los botones de disponibilidad y eliminación
        const availableButton = document.getElementById(`available-${product.id}`);
        const deleteButton = document.getElementById(`delete-${product.id}`);

        availableButton.addEventListener("click", function() {
            SOCKET.emit("toggle-availability", product.id);
        });

        deleteButton.addEventListener("click", function() {
            SOCKET.emit("delete-product", product.id);
        });
    });
});

// Envío de formulario para agregar productos
FORM.addEventListener("submit", function(event) {
    event.preventDefault();

    const CODE = document.getElementById("code").value;
    const CATEGORY = document.getElementById("category").value;
    const TITLE = document.getElementById("title").value;
    const PRICE = document.getElementById("price").value;
    const STOCK = document.getElementById("stock").value;
    const DESCRIPTION = document.getElementById("description").value;
    const FILE = document.getElementById("file").value;

    if (!validateForm(CODE, CATEGORY, TITLE, PRICE, STOCK, DESCRIPTION, FILE)) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const product = {
        code: CODE,
        category: CATEGORY,
        title: TITLE,
        description: DESCRIPTION,
        price: Number(PRICE),
        stock: Number(STOCK),
        thumbnail: [FILE],
        available: true,
    };

    SOCKET.emit("add-product", product);
    FORM.reset();
});

// Validación básica del formulario
function validateForm(code, category, title, price, stock, description, file) {
    return code && category && title && price && stock && description && file;
}

// Desconexión del servidor
SOCKET.on("disconnect", () => {
    console.log("Se desconectó el servidor");
});