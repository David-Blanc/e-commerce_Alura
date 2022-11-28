import { clientServices } from "../services/client-service.js";
import { filename } from "../validaciones.js";
import { reemplazarBody } from "./search-controller.js";
import { showSearchProducts } from "./search-controller.js";

export const postNewProduct = (url, nombre, precio, id) => {
    const productBox = document.createElement("div");
    productBox.classList.add("producto", "producto__inicio");

    let urlProd = url;
    let urlScreen = "";

    if (filename() != "index.html") {
        urlProd = "../" + url;
        urlScreen = "../";
    }

    const product = `
        <img class="producto__imagen" src="${urlProd}" alt="${nombre}">
        <h3 class="producto__nombre">${nombre}</h3>
        <p class="producto__precio">${precio}</p>
        <a href="${urlScreen}screens/producto.html?id=${id}"><button class="producto__boton">Ver Producto</button></a>
    `;

    productBox.innerHTML = product;
    return productBox;
}

if (filename() == "index.html") {
    
    clientServices.productsList().then(response => {
        const catStarWars = response.filter(producto => producto.categoria.toLowerCase() == "star wars");
        mostrarAleatorio(catStarWars, document.querySelector("[data-productos-inicio1]"));

        const catConsolas = response.filter(producto => producto.categoria.toLowerCase() == "consolas");
        mostrarAleatorio(catConsolas, document.querySelector("[data-productos-inicio2]"));

        const catDiversos = response.filter(producto => producto.categoria.toLowerCase() == "diversos");
        mostrarAleatorio(catDiversos, document.querySelector("[data-productos-inicio3]"));

    })

}


export const mostrarAleatorio = (prodCat, productsContainer) => {
    
    const arrAux = [];
    const rango = prodCat.length;

    if (rango > 6) {
        while (arrAux.length < 6) {
            let num = Math.floor(Math.random() * rango);
            if (!arrAux.some(n => n == num)) {
                arrAux.push(num);
            }
        }
        for (let i = 0; i < 6; i++) {
            const newProduct = postNewProduct(prodCat[arrAux[i]].url, prodCat[arrAux[i]].nombre, prodCat[arrAux[i]].precio, prodCat[arrAux[i]].id);
            productsContainer.appendChild(newProduct);
        }
    } else {
        for (let i = 0; i < rango; i++) {
            const newProduct = postNewProduct(prodCat[i].url, prodCat[i].nombre, prodCat[i].precio, prodCat[i].id);
            productsContainer.appendChild(newProduct);
        }
    }
}

const seccionesPorCat = document.querySelectorAll(`[data-categoria]`);

seccionesPorCat.forEach( seccion => {
    seccion.addEventListener("click", (seccion) => {
        const cat = seccion.target.parentElement.querySelector("h2").innerHTML;
        reemplazarBody(cat, "Categoría", "");
        showSearchProducts(cat)
        window.scrollTo(0, 0);
    })
})