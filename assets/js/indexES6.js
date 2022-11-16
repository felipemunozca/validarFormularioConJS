const formulario = document.getElementById('formulario');
const usuario = document.getElementById('usuario');
const email = document.getElementById('email');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');


const mostrarError = (input, mensaje) => {
    const form = input.parentElement;
    form.className = 'formulario-control error';
    const small = form.querySelector('small');
    small.innerHTML = mensaje;
}

const mostrarCorrecto = (input) => {
    const form = input.parentElement;
    form.className = 'formulario-control correcto';
}

const validarEmail = (input) => {
    const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    expresionRegular.test(input.value.trim()) ? mostrarCorrecto(input) : mostrarError(input, 'El email ingresado no cumple con el formato');

}

const definirLargo = (input, min, max) => {

    if (input.value.length < min) {
        mostrarError(input, `${input.name} debe tener un mínimo de ${min} caracteres.`);
    } else if (input.value.length > max) {
        mostrarError(input, `${input.name} debe tener un máximo de ${min} caracteres.`)
    } else {
        mostrarCorrecto(input);
    }
}

const compararPassword = (pass1, pass2) => {
    if (pass1.value !== pass2.value) {
        mostrarError(pass2, 'Las constraseñas no coinciden.');
    } else if (pass2.value.trim() === '') {
        mostrarError(password2, `¡La repeticion de la contraseña es requerida!`)
        esRequerido = true;
    } else {
        mostrarCorrecto(password2);
    }
    
}

const revisarRequerido = (usuario, email, password1, password2) => {
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

const enviarDatos = () => {
    alert('Datos ingresados correctamente\nAhora puede iniciar sesion.')
}



formulario.addEventListener('keyup', function(e) {
    compararPassword(password1, password2)
});

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