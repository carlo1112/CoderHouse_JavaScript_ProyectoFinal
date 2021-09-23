//--TARJETAS / CARDS--
"use strict"

//--FUNCIONES--------------------------------------

const crearTarjeta = (espectaculo, idTarjetaEspectaculo, idButtonTarjetaEspectaculo, esCarrito = false) => {
  const tipoEspectaculo = espectaculo.tipo.toLowerCase();
  let entradas = '<div class="agotado"><strong> Agotado </strong></div>'; // Si no es carrito, o el espectaculo no tiene mas stock, se muestra agotado.
  let precio = esCarrito ? espectaculo.precio * espectaculo.cantidad : espectaculo.precio;    // Si es tarjeta de carrito muestra el valor de la cantidad * precio
  if (esCarrito || espectaculo.stockEntradas > 0) {
    // Si es carrito, se muestra "cantidad: numero", si no es carrito se muestra "cantidad: number box"
    const cantidadEntradas = esCarrito ? espectaculo.cantidad : `<input type="number" class="input-cantidad" id="${espectaculo.id}_cantidad" name="cantidad" min="0" max="${espectaculo.obtenerStock}" value="${espectaculo.cantidad || 0}">`;
    const cantidadClasses = esCarrito ? '' : ' d-flex flex-row';
    entradas = `<div id="${idTarjetaEspectaculo}_cantidad" class="cantidad ${cantidadClasses}">
                  <label for="cantidadEntradas">Cantidad:</label>
                  ${cantidadEntradas}
                </div>
                <div id="div_${idButtonTarjetaEspectaculo}">
                  <button id="${idButtonTarjetaEspectaculo}" class="btn btn-primary card-btn"></button>
                </div>`;
  }
  return `<div class="col-12 col-md-6 col-lg-4 d-flex justify-content-center my-5 ${esCarrito && 'carrito'}" id="${idTarjetaEspectaculo}">
            <div class="card p-3 bg-white rounded" style="width: 100%;">
              <img src="${espectaculo.imagen}" class="card-img-top" alt="">
              <div class="card-body">
                <h5 class="card-title text-left">${espectaculo.nombre}</h5>
                <div class="d-flex justify-content-between flex-row">
                  <p class="card-text text-left ${tipoEspectaculo}">${tipoEspectaculo}</p>    
                  <p class="card-text text-left precio"><strong>$ ${precio}</strong></p>  
                </div>          
                <div class="d-flex justify-content-between flex-row">                
                  ${entradas}
                </div>
              </div>
            </div>
          </div>`;
}

const imprimirTarjeta = (espectaculo, carrito) => {
  // Creo Tarjeta
  const idTarjetaEspectaculo = `espectaculo_${espectaculo.id}`;
  const idButtonTarjetaEspectaculo = `button_${idTarjetaEspectaculo}`;

  // Busco la lista, creo la tarjeta html y la incluyo en la lista
  const tarjetaEspectaculo = crearTarjeta(espectaculo, idTarjetaEspectaculo, idButtonTarjetaEspectaculo);
  $('#cardsId').append(tarjetaEspectaculo);

  // Busca el botón, le agrega el texto y la funcionalidad para el click
  $(`#${idButtonTarjetaEspectaculo}`)
    .append('<i class="fas fa-shopping-cart"></i>')
    .click(() => { agregarAlCarrito(espectaculo, carrito) });
}

const imprimirTarjetaCarrito = (espectaculos, carrito, itemCarrito) => {
  // Crea Tarjeta de carrito
  const idTarjetaEspectaculo = `espectaculo_${itemCarrito.id}`;
  const idButtonTarjetaEspectaculo = `button_${idTarjetaEspectaculo}`;

  const tarjetaEspectaculo = crearTarjeta(itemCarrito, idTarjetaEspectaculo, idButtonTarjetaEspectaculo, true);
  $('#cardsId').append(tarjetaEspectaculo);

  // Botón para eliminar espectáculo de carrito
  $(`#${idButtonTarjetaEspectaculo}`)
    .html('<i class="fas fa-trash"></i>')
    .attr('class', 'btn boton-carrito')
    .click(() => { eliminarDelCarrito(espectaculos, carrito, itemCarrito) });
}

// Se vacía, se remueve la clase, y se ocultan las tarjetas
const eliminarTarjetas = () => {
  $('#cardsId')
    .empty()
    .removeClass('search_card')
    .hide();
}

const eliminarLaTarjeta = (itemCarrito) => {
  // Elimina la card del HTML
  const idTarjetaEspectaculo = `espectaculo_${itemCarrito.id}`;
  $(`#${idTarjetaEspectaculo}`).remove();   // Borra el elemento seleccionado
}

const resetearVista = () => {
  scrollTop();                    // Se posiciona en la parte superior
  eliminarTarjetas();             // Se eliminan las tarjetas
  eliminarMensaje();              // Se elimina el contenido del mensaje superior
  eliminarBotonesPagoCarrito();   // Se eliminan botones del carrito
  eliminarCarousel();             // Se elimina carousel
  eliminarFormulario();           // Se elimina formulario
  eliminarTitulo();               // Se elimina titulo
}

const fadeInTarjetas = () => {
  $('#cardsId').fadeIn(1000);
}

const imprimirTarjetasFiltradas = (espectaculos, tipo, carrito, busqueda = '') => {
  resetearVista();

  if (tipo === "INICIO") {                     // Si recibe INICIO imprimo todas las tarjetas
    imprimirCarousel();
    espectaculos.forEach(espectaculo => {
      imprimirTarjeta(espectaculo, carrito);
    });
    fadeInTarjetas();
  } else if (tipo === "CARRITO") {             // Si recibo CARRITO, imprimo la lista del carrito
    // IMPRIMIR TARJETAS DE CARRITO
    if (carrito.length === 0) {
      // Mensaje de carrito vacío
      mostrarMensaje(`No posee elementos en el carrito`);
    } else {                                   // Si recibo otro tipo y coincide con las tarjetas, se imprimen las tarjetas de ese tipo
      mostrarTitulo("Carrito");
      imprimirBotonesPagoCarrito(espectaculos, carrito);  // IMPRIMIR BOTONES DE PAGO
      carrito.forEach(itemCarrito => {
        imprimirTarjetaCarrito(espectaculos, carrito, itemCarrito);
      });
      fadeInTarjetas();
    }
  } else if (tipo === "SUSCRIBITE") {
    mostrarTitulo("Suscripción");
    imprimirFormulario();
  } else if (tipo === "BUSQUEDA") {
    buscador(espectaculos, carrito, busqueda);
  } else {
    const titulo = ARREGLO_MENU.find(m => m.tipo === tipo).texto;
    mostrarTitulo(titulo);                   // Muestra el resto de tipos (Película, Teatro, Recital)
    const espectaculoFiltrados = espectaculos.filter(espectaculo => espectaculo.tipo === tipo);
    espectaculoFiltrados.forEach(espectaculo => {
      imprimirTarjeta(espectaculo, carrito);
    });
    fadeInTarjetas();
  }
}
