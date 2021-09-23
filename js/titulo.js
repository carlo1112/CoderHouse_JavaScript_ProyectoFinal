//--TITULOS DE CATEGORIAS--
"use strict"

//--FUNCIONES--------------------------------------

const mostrarTitulo = (texto) => {
  $('#titulo')
    .empty()
    .append(texto)
    .slideDown(150);
}

const eliminarTitulo = () => {
  $('#titulo')
    .hide()
    .empty();
}
