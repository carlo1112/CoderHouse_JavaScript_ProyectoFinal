//--CAROUSEL--
"use strict"

//--FUNCIONES--------------------------------------

const crearCarousel = () => {
  $("#carouselExampleCaptions")
    .hide()
    .append(`
			<ol class="carousel-indicators">
				<li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
				<li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
				<li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
			</ol>
			<div class="carousel-inner" role="listbox">
				<div class="carousel-item active">
					<a id="btnCarouselCine" role="button">
						<img src="https://res.cloudinary.com/carlo1112/image/upload/v1630191033/tickets/carousel/image01_dzp6ch.jpg" class="d-block w-100" alt="Imagen 1">
						<div class="carousel-caption d-md-block">
							<h5>CINE</h5>
						<p>¡Comprá entradas para películas estreno!</p>
					</div>
					</a>
				</div>
				<div class="carousel-item">
					<a id="btnCarouselTeatro" role="button">
						<img src="https://res.cloudinary.com/carlo1112/image/upload/v1630191034/tickets/carousel/image02_lw3yti.jpg" class="d-block w-100" alt="Imagen 2">
						<div class="carousel-caption d-md-block">              
							<h5>TEATRO</h5>              
							<p>¡Comprá entradas para obras de teatro!</p>
						</div>
					</a>
				</div>
				<div class="carousel-item">
					<a id="btnCarouselRecital" role="button">
						<img src="https://res.cloudinary.com/carlo1112/image/upload/v1630191034/tickets/carousel/image03_prneaj.jpg" class="d-block w-100" alt="Imagen 3">
						<div class="carousel-caption d-md-block">         
							<h5>RECITALES</h5>             
							<p>¡Comprá entradas para los próximos recitales!</p>
						</div>
					</a>
				</div>
			</div>
			<a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="sr-only">Anterior</span>
			</a>
			<a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="sr-only">Siguiente</span>
			</a>`
    );
  $("#btnCarouselCine").click(() => { imprimirTarjetasFiltradas(espectaculosStorageConvertidos, 'PELICULA', listaDeCarrito) });
  $("#btnCarouselTeatro").click(() => { imprimirTarjetasFiltradas(espectaculosStorageConvertidos, 'TEATRO', listaDeCarrito) });
  $("#btnCarouselRecital").click(() => { imprimirTarjetasFiltradas(espectaculosStorageConvertidos, 'RECITAL', listaDeCarrito) });
}

const imprimirCarousel = () => {
  $("#carouselExampleCaptions")
    .fadeIn(300);
}

const eliminarCarousel = () => {
  $("#carouselExampleCaptions")
    .hide();
}