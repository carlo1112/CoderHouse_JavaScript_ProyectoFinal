//--MENSAJES--
"use strict"

//--FUNCIONES--------------------------------------

const mostrarMensaje = (texto) => {
  $('#mensaje')
    .empty()
    .append(texto)
    .slideDown(300);
}

const eliminarMensaje = () => {
  $('#mensaje')
    .hide()
    .empty();
}
