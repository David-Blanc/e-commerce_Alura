import { clientServices } from "../services/client-service.js";

const form = document.querySelector("[data-agregar-form]");
const url = new URL(window.location);
const id = url.searchParams.get("id");

const adminBoton = document.querySelector("[data-admin-boton]");

adminBoton.addEventListener("click", () => {
    window.location.href = "../screens/productos.html";
})

const obtenerInf = async () => {

    if (id === null) {
        window.location.href = "../screens/productos.html";
    }

    try {
        const producto = await clientServices.detalleProduct(id);

        document.querySelector(`[data-agregar="url"]`).value = producto.url;
        document.querySelector(`[data-agregar="categoria"]`).value = producto.categoria;
        document.querySelector(`[data-agregar="nombre"]`).value = producto.nombre;
        document.querySelector(`[data-agregar="precio"]`).value = producto.precio;
        document.querySelector(`[data-agregar="descripcion"]`).value = producto.descripcion;

    } catch (error) {
        console.log(error)
    }
}

obtenerInf();

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const urlProd = document.querySelector(`[data-agregar="url"]`).value;
    const categoria = document.querySelector(`[data-agregar="categoria"]`).value;
    const nombre = document.querySelector(`[data-agregar="nombre"]`).value;
    const precio = document.querySelector(`[data-agregar="precio"]`).value;
    const descripcion = document.querySelector(`[data-agregar="descripcion"]`).value;
    console.log(urlProd, id)

    clientServices.editProduct(urlProd, categoria, nombre, precio, descripcion, id).then(() => { window.location.href = "../screens/productos.html"; }).catch(error => console.log(error));
})