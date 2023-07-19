let contenedorDetails = document.getElementById ("contenedorDetails")
let parametroLocation = location.search
let parametros = new URLSearchParams (parametroLocation)
let cardId = parametros.get('parametro')
let eventos = []

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then (repuesta => repuesta.json())
.then (data => {
    eventos=data.events
    let card = eventos.find( events =>  events._id == cardId)
    crearCard(contenedorDetails, card);
    
    
})


function crearCard (elementoHTML, objeto) { 
    let capacityOrEstimate = objeto.capacity ? objeto.capacity : objeto.estimate;
    elementoHTML.innerHTML = `   
        <div class="card mb-3 bg-card" style="max-width: 740px;">
            <div class="row g-0">
                <div class="col-md-4 p-2">
                    <img src="${objeto.image}"j class="img-fluid rounded-start object-fit-cover border rounded h-100"  alt="Cinema Avengers"/>
                </div>
                <div class="col-md-8">
                    <section class="card-body">
                        <h5 class="card-title text-light">${objeto.name}</h5>
                        <p class="card-text">${objeto.description}</p>
                        <p class="card-text">Date: ${objeto.date}</p>
                        <p class="card-text">Category: ${objeto.category}</p>
                        <p class="card-text">Place: ${objeto.place}</p>
                        <p class="card-text">Capacity/Estimate: ${capacityOrEstimate}</p>
                        <p class="card-text">Assistance: ${objeto.assistance}</p>
                        <p class="card-text"><small class="text-light">Price: ${objeto.price}</p>
                    </section>
                </div>
            </div>
        </div>`
} 




