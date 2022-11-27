import { clientServices } from "../services/client-service.js";

const postNewProduct = (url, nombre, precio, id) => {
    const productBox = document.createElement("div");
    productBox.classList.add("producto");
    const product = `
        <img class="producto__imagen" src="../${url}" alt="${nombre}">
        <span class="producto__edit"><i class="fa-solid fa-trash" id="${id}"></i><a href="../screens/edicionProducto.html?id=${id}"><i class="fa-solid fa-pen"></i></a></span>
        <h3 class="producto__nombre">${nombre}</h3>
        <p class="producto__precio">${precio}</p>
        <a href="../screens/producto.html?id=${id}"><button class="producto__boton">Ver Producto</button></a>
    `;

    productBox.innerHTML = product;

    const deleteBoton = productBox.querySelector(".fa-trash");
    deleteBoton.addEventListener("click", () => {
        clientServices.deleteProduct(deleteBoton.id).catch((err) => console.log(err));
    });

    return productBox;
}

const productsContainer = document.querySelector("[data-productos-container]");


clientServices.productsList().then(response => {
    response.forEach(({ url, nombre, precio, id }) => {
        const newProduct = postNewProduct(url, nombre, precio, id);
        productsContainer.appendChild(newProduct);
    })
}).catch(error => console.log("Ocurrió un error: " + error));