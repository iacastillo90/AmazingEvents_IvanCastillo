import {filtrarEventosPasados, filtrarEventosFuturos} from './module/functions.js'
let contenedorError = document.getElementById ("contenedorError")
let contenedorTabla1 = document.getElementById ("contenedorTabla1")
let contenedorTabla2 = document.getElementById ("contenedorTabla2")
let contenedorTabla3 = document.getElementById ("contenedorTabla3")

let eventos = []
let date =[]
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then (repuesta => repuesta.json())
    .then (data => {
        eventos=data.events
        date = data.currentDate
        let eventosPasados = filtrarEventosPasados (eventos, date).sort((a,b) =>b.assistance - a.assistance )
        let porcentajeAsistencia = calcularPorcentajeAsistencia(eventosPasados);
        let mayorCapacidad = eventosConMayorCapacidad (eventos)
        let eventosFuturos = filtrarEventosFuturos (eventos, date).sort((a,b) =>b.estimate - a.estimate )
        let calculoCategoriaFutura = calcularPorCategoriaFutura (eventosFuturos)
        let categoriasUnicasFuturas = upComingByCategoria (eventosFuturos)
        let categoriasUnicas = pastEventsByCategoria(eventosPasados);
        crearTabla1 (contenedorTabla1, porcentajeAsistencia, mayorCapacidad)
        imprimirTabla (categoriasUnicas, contenedorTabla2)
        imprimirTabla (categoriasUnicasFuturas, contenedorTabla3)
})
    .catch(error => {
      console.error(error);
      contenedorError.innerHTML ='<p class="d-flex justify-content-center card-text fs-4">No matching results found.</p>'
})

//Funciones

function calcularPorcentajeAsistencia(eventosPasados) {
    let asistenciaPorPorcentaje = [];
  
    eventosPasados.forEach((evento) => {
      let nombreEvento = evento.name;
      let asistenciaTotal = evento.assistance;
      let capacidadTotal = evento.capacity;
      let porcentajeAsistencia = (asistenciaTotal / capacidadTotal) * 100;
  
      asistenciaPorPorcentaje.push({
        nombreEvento,
        asistenciaTotal,
        capacidadTotal,
        porcentajeAsistencia,
      
      });
    });
    return asistenciaPorPorcentaje.sort((a,b) =>b.porcentajeAsistencia - a.porcentajeAsistencia )
}

function eventosConMayorCapacidad (eventos){
    return eventos.sort((a,b) =>b.capacity - a.capacity )
}

function pastEventsByCategoria(eventosPasados) {
    let categoriasUnicas = {};
  
    eventosPasados.forEach(evento => {
      let { category, name, assistance, capacity, price } = evento;
      let porcentajeGanancia = capacity * price;
      let porcentajeAsistencia = (assistance / capacity) * 100;
  
      categoriasUnicas[category] = categoriasUnicas[category] || [];
      categoriasUnicas[category].push({
        nombreEvento: name,
        porcentajeGanancia,
        porcentajeAsistencia
      });
    });
  
    let resultado = [];
  
    for (let categoria in categoriasUnicas) {
      let eventosCategoria = categoriasUnicas[categoria];
      let totalPorcentajeGanancia = eventosCategoria.reduce((total, evento) => total + evento.porcentajeGanancia, 0);
      let totalPorcentajeAsistencia = eventosCategoria.reduce((total, evento) => total + evento.porcentajeAsistencia, 0);
  
      resultado.push({
        categoria,
        totalPorcentajeGanancia,
        totalPorcentajeAsistencia,
    });
 
    }
  
    return resultado;
}

function upComingByCategoria(eventosPasados) {
    let categoriasUnicas = {};
  
    eventosPasados.forEach(evento => {
      let { category, name, estimate, capacity, price } = evento;
      let porcentajeGanancia = capacity * price;
      let porcentajeEstimado = estimate
  
      categoriasUnicas[category] = categoriasUnicas[category] || [];
      categoriasUnicas[category].push({
        nombreEvento: name,
        porcentajeGanancia,
        porcentajeEstimado
      });
    });
  
    let resultado = [];
  
    for (let categoria in categoriasUnicas) {
      let eventosCategoria = categoriasUnicas[categoria];
      let totalPorcentajeGanancia = eventosCategoria.reduce((total, evento) => total + evento.porcentajeGanancia, 0);
      let totalPorcentajeEstimado = eventosCategoria.reduce((total, evento) => total + evento.porcentajeEstimado, 0);
  
      resultado.push({
        categoria,
        totalPorcentajeGanancia,
        totalPorcentajeEstimado,
    });
 
    }
  
    return resultado;
}

function calcularPorCategoriaFutura(eventosFuturos) {
    let resultados = [];
    
    eventosFuturos.forEach((evento) => {
      let porcentajeGanancia = evento.capacity * evento.price
      let precio = evento.price
      let estimadoTotal = evento.estimate;
      let capacidad = evento.capacity;
      let nombreEvento = evento.name
      let categoriaEvento = evento.category
  
      resultados.push({
        nombreEvento,
        precio,
        porcentajeGanancia,
        capacidad,
        estimadoTotal,
        categoriaEvento
      });
    }); 
    return resultados;
}


// tablas

function crearTabla1(elementoHTML, porcentajeAsistencia, mayorCapacidad) {
    elementoHTML.innerHTML += `
      <table class="table table-bordered rounded row-cols-6 mt-5 mb-5 bg-card">
        <tbody>
          <tr>
            <th class="table-secondary border rounded" colspan="3">Events Statistics</th>
          </tr>
          <tr>
            <td>Events with highest % of assistance</td>
            <td>Events with lowest % of assistance</td>
            <td>Events with larger capacity</td>
          </tr>
          <tr>
            <td>Events: ${porcentajeAsistencia[0].nombreEvento}, Assistance %: ${porcentajeAsistencia[0].porcentajeAsistencia}</td>
            <td>Events: ${porcentajeAsistencia[porcentajeAsistencia.length - 1].nombreEvento}, Assistance %: ${porcentajeAsistencia[porcentajeAsistencia.length - 1].porcentajeAsistencia}</td>
            <td>Events: ${mayorCapacidad[0].name}, Capacity: ${mayorCapacidad[0].capacity} </td>
          </tr>
        </tbody>
      </table>`;
}

function crearTabla2y3(categoriasUnicasFuturas){
  let EstimateOrcapacity =categoriasUnicasFuturas.totalPorcentajeEstimado ? categoriasUnicasFuturas.totalPorcentajeEstimado: categoriasUnicasFuturas.totalPorcentajeAsistencia
  let tr = document.createElement("tr")
  let td = document.createElement ("td")
  td.textContent = categoriasUnicasFuturas.categoria
  let td2 = document.createElement ("td")
  td2.textContent = categoriasUnicasFuturas.totalPorcentajeGanancia
  let td3 = document.createElement ("td")
  td3.textContent = EstimateOrcapacity
  tr.append(td, td2, td3)
  return tr
}

function imprimirTabla(array, elementoHTML) {
  let fragment = document.createDocumentFragment();
  for (let elemento of array) {
    fragment.appendChild(crearTabla2y3(elemento));
  }
  elementoHTML.appendChild(fragment);
}