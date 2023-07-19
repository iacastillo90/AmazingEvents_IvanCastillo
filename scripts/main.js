import {imprimirCard, imprimirCheckBox, actualizarCategoriaUnicas, filtroGeneral, vaciarCard, } from './module/functions.js'
let seccion = document.getElementById("contenedor");
let contenedorCheckBox = document.getElementById("contenedorCheckbox")
let search = document.getElementById("search");


let eventos = []
  fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then (repuesta => repuesta.json())
  .then (data => {
    eventos=data.events
    imprimirCard (eventos,seccion)
    imprimirCheckBox( actualizarCategoriaUnicas (eventos), contenedorCheckBox)

      // Evento Checkbox
    let checkbox = document.querySelectorAll("input[type='checkbox']")

    contenedorCheckBox.addEventListener("change", (e) => {
      let inputValue = search.value.toLowerCase()
      let categoriasSeleccionadas = Array.from(checkbox).filter(input => input.checked).map(input => input.value)
      let filtroDeEventos = filtroGeneral(eventos, categoriasSeleccionadas, inputValue)
      vaciarCard(seccion);

      if (filtroDeEventos.length > 0) {
        imprimirCard(filtroDeEventos, seccion)
      } else {
        imprimirCard(eventos, seccion)
        seccion.innerHTML = '<p class="d-flex justify-content-center card-text fs-4">No matching results found.</p>'
      }
    })

      // Evento de búsqueda
    search.addEventListener("input", (e) => {
      let inputValue = e.target.value.toLowerCase();
      let categoriasSeleccionadas = Array.from(checkbox).filter(input => input.checked).map(input => input.value)
      let filtroDeEventos = filtroGeneral(eventos, categoriasSeleccionadas, inputValue)
      vaciarCard(seccion)

      if (filtroDeEventos.length > 0) {
        imprimirCard(filtroDeEventos, seccion)
      } else {
        imprimirCard(eventos, seccion)
        seccion.innerHTML ='<p class="d-flex justify-content-center card-text fs-4">No matching results found.</p>'
      }
    })  
})
  .catch(error => {
    console.error(error);
    seccion.innerHTML ='<p class="d-flex justify-content-center card-text fs-4">No matching results found.</p>'
})
  .finally(() => {
    setTimeout(() => {
      let discount = data.discount
      vaciarCard(seccion)
      imprimirCupon(discount, seccion);
    }, 5000);
})
  
function crearCupon(objeto) {
    let article = document.createElement("article");
    article.className = "bg-card card p-3 col-md-4 col-lg-3";
    article.style.height = "25rem";
    article.style.width = "14rem";
    let img = document.createElement("img");
    img.src = objeto.image;
    img.className = "card-img-top border rounded"
    img.style= "height: 8rem;"
    let h4 = document.createElement("h4");
    h4.className = "text-center mt-2 text-light";
    h4.textContent = objeto.name;
    let div = document.createElement("div");
    div.className = "card-body d-flex flex-column justify-content-between";
    let h6 = document.createElement("h6");
    h6.className = "card-text fw-light";
    h6.textContent = objeto.description;
    let div_btn = document.createElement("div");
    div_btn.className = "d-flex justify-content-between align-items-baseline";
    let a = document.createElement("a");
    a.className = "btn bg-btn text-light nav-link d-flex justify-content-center align-items-center";
    a.style= "height: 2.3rem;width: 4.5rem;";
    a.href= "/Assets/Pages/upcoming_Events.html";
    a.textContent = "Cancelar";
    let a2 = document.createElement("a");
    a2.className = "btn bg-btn text-light nav-link d-flex justify-content-center align-items-center";
    a2.style= "height: 2.3rem;width: 4.5rem;";
    a2.href= "/Assets/Pages/contact.html";
    a2.textContent = "Details";
    article.append(img, h4, div);
    div.append(h6, div_btn)
    div_btn.append(a,a2)
    return article;
}
  
function imprimirCupon(array, elementoHTML) {
  let fragment = document.createDocumentFragment();
  for (let elemento of array) {
    fragment.appendChild(crearCupon(elemento));
  }
  elementoHTML.appendChild(fragment);
}

 
 



