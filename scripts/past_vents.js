import {imprimirCard, imprimirCheckBox, actualizarCategoriaUnicas, filtroGeneral, vaciarCard, filtrarEventosPasados} from './module/functions.js'
let contenedorPastEvents = document.getElementById("pastEvents");
let contenedorCheckBox = document.getElementById("contenedorCheckbox")
let search = document.getElementById("search");

let eventos = []
let date =[]
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then (repuesta => repuesta.json())
  .then (data => {
    eventos=data.events
    date = data.currentDate
    let eventosFiltrados = filtrarEventosPasados(data.events, date);
    imprimirCard(eventosFiltrados, contenedorPastEvents);
    imprimirCheckBox( actualizarCategoriaUnicas (eventos), contenedorCheckBox)

    // Evento Checkbox
  let checkbox = document.querySelectorAll("input[type='checkbox']")
  contenedorCheckBox.addEventListener("change", (e) => {
    let inputValue = search.value.toLowerCase();
    let categoriasSeleccionadas = Array.from(checkbox).filter(input => input.checked).map(input => input.value);
    let filtroDeEventos = filtroGeneral(eventosFiltrados, categoriasSeleccionadas, inputValue);

    vaciarCard(contenedorPastEvents);

  if (filtroDeEventos.length > 0) {
    imprimirCard(filtroDeEventos, contenedorPastEvents);
  } else {
    imprimirCard(eventosFiltrados, contenedorPastEvents);
    contenedorPastEvents.innerHTML ='<p class="d-flex justify-content-center card-text fs-4">No matching results found.</p>'
  }
  });


// Evento de búsqueda
search.addEventListener("input", (e) => {
  let inputValue = e.target.value.toLowerCase();
  let categoriasSeleccionadas = Array.from(checkbox).filter(input => input.checked).map(input => input.value);
  let filtroDeEventos = filtroGeneral(eventosFiltrados, categoriasSeleccionadas, inputValue);

  vaciarCard(contenedorPastEvents);
  if (filtroDeEventos.length > 0) {
    imprimirCard(filtroDeEventos, contenedorPastEvents);
  } else {
    imprimirCard(eventosFiltrados, contenedorPastEvents);
    contenedorPastEvents.innerHTML ='<p class="d-flex justify-content-center card-text fs-4">No matching results found.</p>'
  }
  });

})
  .catch(error => {
  console.error(error);
  contenedorPastEvents.innerHTML ='<p class="d-flex justify-content-center card-text fs-4">No matching results found.</p>'
})



