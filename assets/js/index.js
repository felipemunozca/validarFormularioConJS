/** Se crean las variables de entorno. **/
const formulario = document.getElementById('formulario');
const usuario = document.getElementById('usuario');
const email = document.getElementById('email');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');


/** Funcion para mostrar los mensajes de error. **/
/** Recibe dos valores como parametros, el primero es el input donde se produce el error, el segundo es el mensaje que aparecera en el formulario. **/
function mostrarError(input, mensaje) {
    const form = input.parentElement;
    form.className = 'formulario-control error';
    const small = form.querySelector('small');
    small.innerHTML = mensaje;
}

/** Funcion para mostrar los input que estan correctos. **/
function mostrarCorrecto(input) {
    const form = input.parentElement;
    form.className = 'formulario-control correcto';
}

/** Funcion para validar el email escrito utilizando expresiones regulares. **/
/** Para evitar errores, se utiliza trim() para quitar los espacios en blanco que pueda tener el input. **/
function validarEmail(input) {
    const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (expresionRegular.test(input.value.trim())) {
        mostrarCorrecto(input);
    } else {
        mostrarError(input, 'El email ingresado no cumple con el formato');
    }
}

/** Funcion para definir la cantidad minima y maxima de caracteres que tendra un input. **/
/** Los valores seran recibidos como parametros una vez que se inicialice la funcion, por lo que pueden ser diferentes valores. **/
function definirLargo(input, min, max) {
    if (input.value.length < min) {
        mostrarError(input, `${input.name} debe tener un mínimo de ${min} caracteres.`);
    } else if (input.value.length > max) {
        mostrarError(input, `${input.name} debe tener un máximo de ${min} caracteres.`)
    } else {
        mostrarCorrecto(input);
    }
}


/** Funcion para revisar que las contraseñas sean iguales. **/
/** Se reciben como parametros password1 y password2 desde el evento al presionar el boton. **/
function compararPassword(pass1, pass2) {
    if (pass1.value !== pass2.value) {
        mostrarError(pass2, 'Las constraseñas no coinciden.');
    } else if (pass2.value.trim() === '') {
        mostrarError(password2, `¡La repeticion de la contraseña es requerida!`)
        esRequerido = true;
    } else {
        mostrarCorrecto(password2);
    }
    
}


/** Funcion para requerir todos los campos del formulario. **/
function revisarRequerido(usuario, email, password1, password2) {
    let esRequerido = false;

    if (usuario.value.trim() === '') {
        mostrarError(usuario, `¡El usuario es requerido!`)
        esRequerido = true;
    } else {
        mostrarCorrecto(usuario);
    }

    if (email.value.trim() === '') {
        mostrarError(email, `¡El email es requerido!`)
        esRequerido = true;
    } else {
        mostrarCorrecto(email);
    }

    if (password1.value.trim() === '') {
        mostrarError(password1, `¡La contraseña es requerida!`)
        esRequerido = true;
    } else {
        mostrarCorrecto(password1);
    }

    if (password2.value.trim() === '') {
        mostrarError(password2, `¡La repeticion de la contraseña es requerida!`)
        esRequerido = true;
    } else {
        mostrarCorrecto(password2);
    }

    return esRequerido;

}

/** Funcion que mostrara un mensaje en pantalla una vez que el formulario este llenado correctamente. **/
function enviarDatos() {
    alert('Datos ingresados correctamente\nAhora puede iniciar sesion.')
}

/** Evento que detecta las teclas que son presionadas y compara si las contraseñas son iguales. **/
formulario.addEventListener('keyup', function(e) {
    compararPassword(password1, password2)
});

/** Evento al presionar el boton Registrarse. **/
formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    if ( revisarRequerido(usuario, email, password1, password2) ) {
        definirLargo(usuario, 3, 20);
        definirLargo(password1, 6, 25);
        validarEmail(email);
        
    } else {
        enviarDatos();
    }

})