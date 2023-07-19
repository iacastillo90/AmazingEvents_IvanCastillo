import {imprimirCard, imprimirCheckBox, actualizarCategoriaUnicas, filtroGeneral, vaciarCard, filtrarEventosFuturos} from './module/functions.js'
let contenedorUpComing = document.getElementById("upComing")
let contenedorCheckBox = document.getElementById("contenedorCheckbox")
let checkbox = document.querySelectorAll("input[type='checkbox']")


let eventos = []
let date =[]
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then (repuesta => repuesta.json())
  .then (data => {
    eventos=data.events
    date = data.currentDate
    let eventosFiltrados = filtrarEventosFuturos(eventos, date)
    imprimirCard (eventosFiltrados,contenedorUpComing)
    imprimirCheckBox( actualizarCategoriaUnicas (eventos), contenedorCheckBox)
    
    // Evento Checkbox
    let checkbox = document.querySelectorAll("input[type='checkbox']")
    contenedorCheckBox.addEventListener("change", (e) => {
      let inputValue = search.value.toLowerCase()
      let categoriasSeleccionadas = Array.from(checkbox).filter(input => input.checked).map(input => input.value)
      let filtroDeEventos = filtroGeneral(eventosFiltrados, categoriasSeleccionadas, inputValue)
    
      vaciarCard(contenedorUpComing);
    
      if (filtroDeEventos.length > 0) {
        imprimirCard(filtroDeEventos, contenedorUpComing)
      } else {
        imprimirCard(eventosFiltrados, contenedorUpComing)
        contenedorUpComing.innerHTML ='<p class="d-flex justify-content-center card-text fs-4">No matching results found.</p>'
    
      }
    });
     
    // Evento de búsqueda
    let search = document.getElementById("search")
    search.addEventListener("input", (e) => {
      let inputValue = e.target.value.toLowerCase()
      let categoriasSeleccionadas = Array.from(checkbox).filter(input => input.checked).map(input => input.value)
      let filtroDeEventos = filtroGeneral(eventosFiltrados, categoriasSeleccionadas, inputValue)
    
      vaciarCard(contenedorUpComing)
      if (filtroDeEventos.length > 0) {
        imprimirCard(filtroDeEventos, contenedorUpComing)
      } else {
        imprimirCard(eventosFiltrados, contenedorUpComing)
        contenedorUpComing.innerHTML ='<p class="d-flex justify-content-center card-text fs-4">No matching results found.</p>'
      }
    });
})
  .catch(error => {
    console.error(error);
    contenedorUpComing.innerHTML ='<p class="d-flex justify-content-center card-text fs-4">No matching results found.</p>'
})
  







