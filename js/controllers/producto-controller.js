import { clientServices } from "../services/client-service.js";
import { mostrarAleatorio } from "./client-controller.js";

const url = new URL(window.location);
const id = url.searchParams.get("id");
let categ = "";

const obtenerInf = async () => {

    if (id === null) {
        window.location.href = "../index.html";
    }

    try {
        const producto = await clientServices.detalleProduct(id);

        document.querySelector(`[data-detalle-url]`).src = `../${producto.url}`;
        document.querySelector(`[data-detalle-nombre]`).innerHTML = producto.nombre;
        document.querySelector(`[data-detalle-precio]`).innerHTML = producto.precio;
        document.querySelector(`[data-detalle-descripcion]`).innerHTML = producto.descripcion;
        categ = producto.categoria;

    } catch (error) {
        console.log(error)
    }
}

const productosSimilares = async () => {
    try {
        const listaCompleta = await clientServices.productsList();
        const listaFiltrada = listaCompleta.filter( prod => {

            return prod.id != id && prod.categoria.toLowerCase() == categ.toLowerCase();
        })
        
        mostrarAleatorio(listaFiltrada, document.querySelector("[data-productos-inicio]"));
        
    } catch (error) {
        console.log(error)
    }
}

const fun = async () => {
    await obtenerInf();
    productosSimilares();
}

fun();