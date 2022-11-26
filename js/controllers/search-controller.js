import { clientServices } from "../services/client-service.js";
import { postNewProduct } from "./client-controller.js";


const searchBar = document.querySelector("[data-form-search]");

searchBar.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchWord = event.target.querySelector("input").value;

    reemplazarBody(searchWord);

    showSearchProducts(searchWord);

})

function reemplazarBody(searchWord) {
    const sectionsHidden = document.querySelectorAll("section");
    sectionsHidden.forEach(elto => document.querySelector("body").removeChild(elto))

    const section = document.createElement("section");
    section.classList.add("productos");
    const searchSection = `
        <div class="productos__descripcion">
            <h2 class="descripcion__titulo">Productos "${searchWord}" encontrados</h2>
        </div>
        <div class="productos__contenedor" data-productos-container>
        </div>
        `
    section.innerHTML = searchSection;
    document.querySelector("body").insertBefore(section, document.querySelector("footer"));
}

function showSearchProducts(searchWord) {
    const productsContainer = document.querySelector("[data-productos-container]");

    clientServices.productsList().then(response => {
        const regexp = new RegExp(searchWord, "i");

        response.forEach(product => {
            if (regexp.test(product.categoria) || regexp.test(product.nombre)) {
                const newProduct = postNewProduct(product.url, product.nombre, product.precio, product.id);
                newProduct.classList.remove("producto__inicio");
                productsContainer.appendChild(newProduct);
            }

        })
    })
}