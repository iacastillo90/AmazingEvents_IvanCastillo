let eventosFuturos = document.getElementById("upComing");

function filtrarEventos(eventos, fechaMinima) {
  let eventosFiltrados = [];
  for (let evento of eventos) {
    if (evento.date >= fechaMinima) {
      eventosFiltrados.push(evento);
    }
  }
  return eventosFiltrados;
}
function imprimirCard(array, elementoHTML) {
  let fragment = document.createDocumentFragment();
  for (let elemento of array) {
    fragment.appendChild(crearCard(elemento));
  }
  elementoHTML.appendChild(fragment);
}

let eventosFiltrados = filtrarEventos(data.events, "2023-01-07");
imprimirCard(eventosFiltrados, eventosFuturos);


function crearCard(objeto) {
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
  a.href= "/Assets/Pages/details.html";
  a.textContent = "Details";
  article.append(img, h4, div, h6, div_btn, p, a);
  div.append(h6, div_btn, p, a)
  div_btn.append(p,a)
  return article;
}


