const productsList = async () => {
    const respuesta = await fetch("http://localhost:3000/producto");
    return respuesta.json();
};

const crearProducto = (url, categoria, nombre, precio, descripcion) => {
    return fetch("http://localhost:3000/producto", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url, categoria, nombre, precio, descripcion, id: uuid.v4() }), redirect: "error" })
}

const usersList = async () => {
    const respuesta = await fetch("http://localhost:3000/usuario");
    return respuesta.json();
}

const deleteProduct = (id) => {
    return fetch(`http://localhost:3000/producto/${id}`, { method: "DELETE" })
}

const detalleProduct = async (id) => {
    const respuesta = await fetch(`http://localhost:3000/producto/${id}`);
    return respuesta.json();
}

const editProduct = async (url, categoria, nombre, precio, descripcion, id) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/producto/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url, categoria, nombre, precio, descripcion })
        });
        return respuesta;
    } catch (err) {
        return console.log(err);
    }
}

export const clientServices = {
    productsList,
    crearProducto,
    deleteProduct,
    editProduct,
    detalleProduct,
    usersList
};