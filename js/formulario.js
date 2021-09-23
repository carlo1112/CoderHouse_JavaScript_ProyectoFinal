//--FORMULARIO--
"use strict"

//--CLASES--------------------------------------
class Suscriptor {
  constructor(nuevoSuscriptor) {
    this.nombre = nuevoSuscriptor.nombre;
    this.apellido = nuevoSuscriptor.apellido;
    this.email = nuevoSuscriptor.email;
  }
}

//--FUNCIONES--------------------------------------

const crearFormulario = () => {
  $('#formulario')
    .hide()
    .append(`<form class="my-form col-md-8 col-lg-6 col-sm-10 col-sx-12" id="formularioContacto">
            <div class="form-group">
              <label for="Nombre">Nombre: </label>
              <input id="nombre" type="text" class="form-control" placeholder="Nombre">
            </div>
            <div class="form-group">
              <label for="Apellido">Apellido: </label>
              <input id="apellido" type="text" class="form-control" placeholder="Apellido">
            </div>
            <div class="form-group">
              <label for="email">Email: </label>
              <input id="email" type="email" class="form-control" placeholder="ejemplo@ejemplo.com">
            </div>
            <button id="btnCrearSuscriptor" type="submit" class="button-form btn-primary">Crear Suscripción</button>
          </form>
          `
    )
    .submit((event) => { crearSuscriptor(event) });
};

const imprimirFormulario = () => {
  $('#formulario')
    .fadeIn(1000);
}

const eliminarFormulario = () => {
  $('#formulario').hide();
}

const validarCampos = (usuario) => {
  if (usuario.nombre == "" || usuario.apellido == "" || usuario.email == "" || !usuario.email.includes("@") || !usuario.email.includes(".com")) {
    return false;
  }
  return true;
}

const existeMailEnLista = (suscripciones, nuevoSuscriptor) => {
  const busquedaMail = suscripciones.filter(suscriptor => suscriptor.email === nuevoSuscriptor.email.toLowerCase());
  if (busquedaMail.length === 0) {
    return false;
  }
  return true;
}

// Si hay key suscriciones, se carga y se agrega (si el mail esta en la lista, no), sino se crea.
const agregarEnStorage = (nuevoSuscriptor) => {
  if (localStorage.getItem("suscripciones")) {

    let suscripcionesStorage = JSON.parse(localStorage.getItem("suscripciones"));

    if (!existeMailEnLista(suscripcionesStorage, nuevoSuscriptor)) {
      suscripcionesStorage.push(nuevoSuscriptor);
      localStorage.setItem("suscripciones", JSON.stringify(suscripcionesStorage));
      mostrarMensajeEnModal("Se ha suscripto correctamente.");
    } else {
      mostrarMensajeEnModal("El e-mail ingresado ya se encuentra en nuestra lista.", true);
    }
  } else {
    listaDeSuscriptores.push(nuevoSuscriptor);
    localStorage.setItem("suscripciones", JSON.stringify(listaDeSuscriptores));
    mostrarMensajeEnModal("Se ha suscripto correctamente.");
  }
}

const crearSuscriptor = (e) => {
  e.preventDefault();

  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let email = document.getElementById("email").value;

  let nuevoSuscriptor = new Suscriptor({
    nombre: nombre,
    apellido: apellido,
    email: email.toLowerCase(),
  });

  if (validarCampos(nuevoSuscriptor)) {
    agregarEnStorage(nuevoSuscriptor);             // Agrega el usuario al storage
    $('#formularioContacto').trigger("reset");  // vacia el formulario
  } else {
    mostrarMensajeEnModal("Los datos ingresados no son correctos.", true);
  }
}

//--VARIABLES--------------------------------------

// Lista de suscripciones
const listaDeSuscriptores = [];