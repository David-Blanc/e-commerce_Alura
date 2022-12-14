import { clientServices } from "../services/client-service.js";

const login = document.querySelector("[data-login]");

login.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.querySelector(`[data-agregar="email"]`).value;
    const password = document.querySelector(`[data-agregar="password"]`).value;

    loginCheckIn(email, password);
})

const loginCheckIn = (email, password) => {
    let aux = false;
    clientServices.usersList().then(response => {
        response.forEach(usuario => {
            if (usuario.email == email && usuario.contraseña == password) {
                aux = true;
                const sesionObj = {email, password};
                sessionStorage.setItem("sesion", JSON.stringify(sesionObj))

                window.location.href = "../screens/productos.html";
            }
        })

        if (!aux) {
            popUpError()
        }
        
    }).catch(error => console.log(error));

};

const popUpError = () => {
    const errorMessage = document.createElement("span");
    errorMessage.classList.add("login__error");
    errorMessage.innerHTML = `Credenciales incorrectas`;
    login.appendChild(errorMessage);

    setTimeout(() => login.removeChild(errorMessage), 2000);
};