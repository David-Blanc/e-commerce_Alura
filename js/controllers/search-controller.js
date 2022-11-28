import { clientServices } from "../services/client-service.js";
import { postNewProduct } from "./client-controller.js";


const searchBar = document.querySelector("[data-form-search]");

searchBar.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchWord = event.target.querySelector("input").value;
    const regexp = /[\s\d\w]*(?=[a-zñA-ZÑ0-9]+)[\s\d\w]*/;

    if (regexp.test(searchWord)) {
        reemplazarBody(searchWord, "Productos"," encontrados");
        showSearchProducts(searchWord);
    }

})

export function reemplazarBody(searchWord, fraseAntes, fraseDespues) {
    const sectionsHidden = document.querySelectorAll("section");
    sectionsHidden.forEach(elto => document.querySelector("body").removeChild(elto))

    const section = document.createElement("section");
    section.classList.add("productos");
    const searchSection = `
        <div class="productos__descripcion">
            <h2 class="descripcion__titulo">${fraseAntes} "${searchWord}" ${fraseDespues}</h2>
        </div>
        <div class="productos__contenedor" data-productos-container>
        </div>
        `
    section.innerHTML = searchSection;
    document.querySelector("body").insertBefore(section, document.querySelector("footer"));
}

export function showSearchProducts(searchWord) {
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

//Despliegue de la barra de búsqueda en pantallas < 768px

const searchBoton = document.querySelector("[data-submit-search]");
const searchArea = document.querySelector(`[data-agregar="search"]`);

searchBoton.addEventListener("click", () => {
    if (!searchBar.classList.contains("buscador--desplegar")) {
        searchBar.classList.add("buscador--desplegar")
        searchArea.classList.add("textarea--desplegar")
        searchBoton.classList.add("searchboton--desplegar")
        searchArea.focus();

        if (document.querySelector(".cabecera__boton")) {
            document.querySelector(".cabecera__boton").classList.add("boton--desplegar");
        }

        document.addEventListener("mousedown", function (event) {
            if (!searchBar.contains(event.target)) {
                searchBar.classList.remove("buscador--desplegar")
                searchArea.classList.remove("textarea--desplegar")
                searchBoton.classList.remove("searchboton--desplegar")
                if (document.querySelector(".cabecera__boton")) {
                    setTimeout(() => {
                        document.querySelector(".cabecera__boton").classList.remove("boton--desplegar");
                    }, 900);
                }
            }
        });
    }
})