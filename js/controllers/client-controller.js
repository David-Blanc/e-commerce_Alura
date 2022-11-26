import { clientServices } from "../services/client-service.js";
import { filename } from "../validaciones.js";

export const postNewProduct = (url, nombre, precio) => {
    const productBox = document.createElement("div");
    productBox.classList.add("producto", "producto__inicio");

    let urlPath = url;

    if (filename() != "index.html") {
        urlPath = "../" + url;
    }
    
    const product = `
        <img class="producto__imagen" src="${urlPath}" alt="${nombre}">
        <h3 class="producto__nombre">${nombre}</h3>
        <p class="producto__precio">${precio}</p>
        <button class="producto__boton">Ver Producto</button>
    `;

    productBox.innerHTML = product;
    return productBox;
}

if (filename() == "index.html") {
    const productsContainer = document.querySelector("[data-productos-inicio]");


    clientServices.productsList().then(response => {
        const arrAux = [];
        const prodCat = response.filter(producto => producto.categoria.toLowerCase() == "star wars");
        const rango = prodCat.length;
    
        if (rango > 6) {
            while (arrAux.length < 6) {
                let num = Math.floor(Math.random() * rango);
                if (!arrAux.some(n => n == num)) {
                    arrAux.push(num);
                }
            }
            for (let i = 0; i < 6; i++) {
                const newProduct = postNewProduct(prodCat[arrAux[i]].url, prodCat[arrAux[i]].nombre, prodCat[arrAux[i]].precio);
                productsContainer.appendChild(newProduct);
            }
        } else {
            for (let i = 0; i < rango; i++) {
                const newProduct = postNewProduct(prodCat[i].url, prodCat[i].nombre, prodCat[i].precio);
                productsContainer.appendChild(newProduct);
            }
        }
    
    }).catch(error => console.log("Ocurrió un error" + error));
}

