import { clientServices } from "../services/client-service.js";

const agregar = document.querySelector("[data-agregar-form]");
const adminBoton = document.querySelector("[data-admin-boton]");

adminBoton.addEventListener("click", () => {
    window.location.href = "../screens/productos.html";
})

agregar.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = document.querySelector(`[data-agregar="url"]`).value;
    const categoria = document.querySelector(`[data-agregar="categoria"]`).value;
    const nombre = document.querySelector(`[data-agregar="nombre"]`).value;
    const precio = document.querySelector(`[data-agregar="precio"]`).value;
    const descripcion = document.querySelector(`[data-agregar="descripcion"]`).value;

    clientServices.crearProducto(url, categoria, nombre, precio, descripcion).then(() => {
        window.location.href = "../screens/productos.html";
    }).catch(error => console.log(error));

});

const precio = document.querySelector(`[data-agregar="precio"]`);

precio.addEventListener("focusin", () => {
    if (precio.value == "") {
        precio.value = "$ "
    }
});