export function valida(input) {
    const tipoDeInput = input.dataset.agregar;
    if (validadores[tipoDeInput]) {
        if (validadores[tipoDeInput] = "no mostrar mensaje") {
            return
        }
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input__container--invalid");
        input.parentElement.querySelector("span").innerHTML = "";
        input.parentElement.style.cssText = "margin-bottom: none;"
    }else {
        input.parentElement.classList.add("input__container--invalid");
        input.parentElement.querySelector("span").innerHTML = mostrarMsjDeError(tipoDeInput, input);
        input.parentElement.style.cssText = "margin-bottom: .5rem;"
    }
};

const tipoDeErrores = [
    "valueMissing",
    "patternMismatch",
    "typeMismatch"
];

const mensajesDeError = {
    url: {
        valueMissing: "URL no puede estar vacío."
    },
    categoria: {
        valueMissing: "Categoría no puede estar vacío."
    },
    nombre: {
        valueMissing: "Nombre no puede estar vacío."
    },
    precio: {
        valueMissing: "Precio no puede estar vacío.",
        patternMismatch: "Seguir formato: $ 00,00 (en dólares e incluir céntimos)."
    },
    descripcion: {
        valueMissing: "Descripción no puede estar vacío."
    },
    email: {
        valueMissing: "Ingrese su correo electrónico.",
        typeMismatch: "El correo electrónico no es válido."
    },
    password: {
        valueMissing: "Ingrese su contraseña.",
    },
    nombreUsuario: {
        valueMissing: "Ingrese su nombre.",
    },
    mensajeUsuario: {
        valueMissing: "Mensaje no puede estar vacío.",
    },
    search: {
        valueMissing: "Ingrese una palabra",
        patternMismatch: "Ingrese una palabra"
    }
}

const validadores = {
    /*url: ,
    categoria: ,
    nombre: ,
    descripcion: ,*/
    precio: input => validarPrecio(input),
    search: "no mostrar mensaje"
};

const mostrarMsjDeError = (tipoDeInput, input) => {
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
            return mensaje
        }
    })
    return mensaje
}

const validarPrecio = (input) => {
    const aux = /[.]/;
    const aux2 = /^[$] \d+[,.]\d{2}$/;
    let msj = "";
    if (!aux2.test(input.value)) {
        msj = "Formato: $ 00,00 (en dólares e incluir céntimos)"
    }

    input.setCustomValidity(msj);

    if (aux.test(input.value)) {
        input.value = input.value.replace(aux, ",");
    }
};

export function filename(){
    var rutaAbsoluta = self.location.href;   
    var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
    var rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length );
    return rutaRelativa;  
}