export function crearCard(objeto) {
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
    let p = document.createElement("p");
    p.className = "text-light fw-light m-0";
    p.textContent = ("Price: " + objeto.price);
    let a = document.createElement("a");
    a.className = "btn bg-btn text-light nav-link d-flex justify-content-center align-items-center";
    a.style= "height: 2.3rem;width: 4.5rem;";
    a.href= "/Assets/Pages/details.html?parametro="+ objeto._id;
    a.textContent = "Details";
    article.append(img, h4, div);
    div.append(h6, div_btn)
    div_btn.append(p,a)
    return article;
}

export function imprimirCard(array, elementoHTML) {
  let fragment = document.createDocumentFragment();
  for (let elemento of array) {
    fragment.appendChild(crearCard(elemento));
  }
  elementoHTML.appendChild(fragment);
}

export function vaciarCard(elementoHTML){
    elementoHTML.innerHTML = ""
}

export function filtrarEventosPasados(eventos, fechaMinima) {
    let eventosFiltrados = [];
    for (let evento of eventos) {
      if (evento.date <= fechaMinima) {
        eventosFiltrados.push(evento);
      }
    }
    return eventosFiltrados;
}  

export function filtrarEventosFuturos(eventos, fechaMinima) {
    let eventosFiltrados = [];
    for (let evento of eventos) {
      if (evento.date >= fechaMinima) {
        eventosFiltrados.push(evento);
      }
    }
    return eventosFiltrados;
}

//Checkbox
export function actualizarCategoriaUnicas (eventos){
    let categoria = eventos.map(events => events.category)
    let categoriaSinRepetir = new Set (categoria)
    let categoriaActualizados = Array.from (categoriaSinRepetir)
    return categoriaActualizados
}
  
export function crearCheckBox(objeto){
    let form = document.createElement("form")
    form.className = "text-light"
    let label = document.createElement ("label")
    label.textContent = objeto
    label.for = objeto
    let input = document.createElement ("input")
    input.type = "checkbox"
    input.id = objeto
    input.name = objeto
    input.value = objeto
    form.append(label, input)
    return form
}
  
export function imprimirCheckBox(array, elementoHTML) {
    let fragment = document.createDocumentFragment();
    for (let elemento of array) {
      fragment.appendChild(crearCheckBox(elemento));
    }
    elementoHTML.appendChild(fragment);
}

//filtro cruzado
export function filtroGeneral(eventos, categoriasSeleccionadas, inputValue) {
    let copiaArrayEventos = eventos;
    
    if (categoriasSeleccionadas.length > 0) {
      copiaArrayEventos = copiaArrayEventos.filter(evento => categoriasSeleccionadas.includes(evento.category));
    }
    
    if (inputValue) {
      copiaArrayEventos = copiaArrayEventos.filter(evento => evento.name.toLowerCase().startsWith(inputValue));
    }
    
    return copiaArrayEventos;
}
  
