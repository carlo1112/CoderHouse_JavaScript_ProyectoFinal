//--MODAL----------------------------------
"use strict"

//--FUNCIONES--------------------------------------

const mostrarMensajeEnModal = (texto, esError = false) => {
  const myModal = $("#myModal");
  const mensaje = $('#mensajeModal');
  mensaje.text(texto);
  if (esError) {
    if (!mensaje.hasClass("error")) {
      mensaje.addClass("error");
    }
  } else {
    if (mensaje.hasClass("error")) {
      mensaje.removeClass("error");
    }
  }
  myModal.modal('show');
}

//--EVENTOS--------------

$("#closeModal").click(() => { $("#myModal").modal('hide'); });

$("#btnCloseModal").click(() => { $("#myModal").modal('hide'); });