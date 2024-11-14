
let precioTicket = 0.5; // Precio por Ticket en $$
const x = 9999; // Tickets Totales
let ArrayBoletosNoDisponible = [];
const ArrayBoletosDisponible = Array.from({ length: x + 1 }, (_, i) => i.toString().padStart(4, '0'));

let selectedCount = 0;
let selectedBoletos = [];

selecting = false;

function updateSelection(boleto, isChecked) {
    if (isChecked) {
        selectedCount += 1;
        selectedBoletos.push(boleto);
    } else {
        selectedCount -= 1;
        selectedBoletos = selectedBoletos.filter(item => item !== boleto);
    }
    console.log(`Selected Count: ${selectedCount}`);
    console.log(`Selected Boletos: ${selectedBoletos}`);
}

function fetchBoletosNoDisponible() {
    console.log('Fetching boletos...');
    fetch('/boletos')
        .then(response => response.json())
        .then(data => {
            console.log('data:', data);
            ArrayBoletosNoDisponible = data;
            console.log('Boletos No Disponibles:', ArrayBoletosNoDisponible);

        })
        .catch(error => console.error('Error fetching boletos:', error));
}

function botonComprarPorNumero() {
    const container = document.querySelector('.days-btn-container');
    container.innerHTML = `
        <form class="form">
            <div>
                <div class="form-row">
                    <span class="input-span">
                        <label for="buscar" class="label">Buscar boleto</label>
                        <input type="text" name="buscar" id="buscar" class="search-input" placeholder="Buscar boleto...">
                    </span>
                </div>
            </div>
        </form>
    `;

    const searchInput = container.querySelector('.search-input');
    const selectedBoletos = new Set();

    const mostrarBoletos = (filtro = '') => {
        container.querySelectorAll('.day-btn, .day-label').forEach(el => el.remove());
        ArrayBoletosDisponible.forEach(boleto => {
            if (ArrayBoletosNoDisponible.includes(boleto) || !boleto.includes(filtro)) {
                return;
            }
            const input = document.createElement('input');
            input.className = 'day-btn';
            input.id = boleto;
            input.type = 'checkbox';
            input.checked = selectedBoletos.has(boleto);

            input.addEventListener('change', (event) => {
                if (event.target.checked) {
                    selectedBoletos.add(boleto);
                } else {
                    selectedBoletos.delete(boleto);
                }
                updateSelection(boleto, event.target.checked);
            });

            const label = document.createElement('label');
            label.className = 'day-label';
            label.htmlFor = boleto;
            label.textContent = boleto;

            container.appendChild(input);
            container.appendChild(label);
        });
    };

    mostrarBoletos();
    searchInput.addEventListener('input', (event) => {
        mostrarBoletos(event.target.value);
    });

    const button = document.getElementById('Numero');
    button.disabled = true;
    const button2 = document.getElementById('Suerte');
    button2.disabled = false;
    selecting = true;
}


function botonComprarPorSuerte() {
    const container = document.querySelector('.days-btn-container');
    container.innerHTML = `
    <div class="button-container">
        <p>Los números seran seleccionados al azar, de la cantidad tickets que desea.
        <br><br>
        recuerde que debe seleccionar un mínimo de 2 números.</p>
    </div>
        <div class="button-container">
            <button class="button-3d" id="minus" onclick="minus()">
                <div class="button-top">
                    <span class="material-icons">-</span>
                </div>
                <div class="button-bottom"></div>
                <div class="button-base"></div>
            </button>
            <label for="numeros" class="numeros" id="numeros">0</label>
            <button class="button-3d" id="plus" onclick="plus()">
                <div class="button-top">
                    <span class="material-icons">+</span>
                </div>
                <div class="button-bottom"></div>
                <div class="button-base"></div>
            </button>
        </div>
        <div class="button-container">
            <label class="numeros">total en &#128178;: </label>
            <label class="numeros" id="precio">0</label>
        </div>
        <br><br>
        <tr><tr>
        <p>Boletos seleccionados:</p>
        <div class="label_container_random" id="numeros_random">
        
            
        </div>
    `;


    document.getElementById('minus').addEventListener('click', () => {
        let nmrosboletos = generateNmrosboletos();
        document.getElementById('numeros_random').innerText = nmrosboletos;
    });

    document.getElementById('plus').addEventListener('click', () => {
        let nmrosboletos = generateNmrosboletos();
        document.getElementById('numeros_random').innerText = nmrosboletos;
    });

    const button = document.getElementById('Suerte');
    button.disabled = true;
    const button2 = document.getElementById('Numero');
    button2.disabled = false;
    selecting = false;
    selectedCount = 0;
    selectedBoletos = [];
}

function plus() {
    const label = document.getElementById('numeros');
    const precio = document.getElementById('precio');
    let currentValue = parseInt(label.textContent);
    if (currentValue === 0) {
        label.textContent = currentValue + 2;
    } else {
        label.textContent = currentValue + 1;
    }
    precio.textContent = label.textContent * precioTicket;
}

function minus() {
    const label = document.getElementById('numeros');
    const precio = document.getElementById('precio');
    let currentValue = parseInt(label.textContent);
    if (currentValue === 2) {
        label.textContent = 0;
    } else if (currentValue > 0) {
        label.textContent = currentValue - 1;
    }
    precio.textContent = label.textContent * precioTicket;
}



function check() {
    var id = document.getElementById('idboleto').value;
    const lc = document.getElementById('resultado');

    // Verificar si el id contiene solo números y tiene exactamente 4 cifras
    if (!/^\d{4}$/.test(id)) {
        alert('Por favor, ingrese un número de boleto válido de 4 cifras.');
        return;
    }

    if (ArrayBoletosNoDisponible.includes(id)) {
        lc.innerHTML = `<h1>El Ticket ${id} esta aprobado</h1>`;
    } else {
        lc.innerHTML = `<h1>No se encontro el Ticket ${id} como pagado</h1>`;
    }

    var form = document.getElementById('resultado');
    if (form.style.display === 'none') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}

function generateNmrosboletos() {
    let nmrosboletos = '';
    let boletosR = document.getElementById('numeros').textContent;
    let Rnumeros = parseInt(boletosR);
    const numeros_random = document.getElementById('numeros_random');
    numeros_random.innerHTML += '';

    if (Rnumeros < 2) {
        alert('Debe seleccionar un mínimo de 2 números.');
        return '';
    } else {
        for (let i = 0; i < Rnumeros; i++) {
            let numero = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            if (ArrayBoletosNoDisponible.includes(numero)) {
                i--;
            } else {

                numeros_random.innerHTML += `<label class="numeros2">${numero}</label>`;
                nmrosboletos += numero + ', ';
            }
        }
        nmrosboletos = nmrosboletos.substring(0, nmrosboletos.length - 2);
    }

    return nmrosboletos;
}

function enviarWhatsApp() {
    var cedula = document.getElementById('cedula').value;
    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('telefono').value;
    var estado = document.getElementById('estado').value;
    var formadePago = document.getElementById('pago').value;
    var boletos = 0;
    var NmrosBoletos = '';

    // Verificar si todos los campos están llenos
    if (!cedula || !nombre || !telefono || !estado || !formadePago) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
    }

    if (selecting) {
        if (selectedCount < 2) {
            alert('Debe seleccionar un mínimo de 2 números.');
            return;
        }
        boletos = selectedCount;
        NmrosBoletos = selectedBoletos.join(', ');
    } else if (!selecting) {
        Nboletosgenerados = document.getElementById('numeros_random').textContent;
        boletos = document.getElementById('numeros').textContent;
        NmrosBoletos = Nboletosgenerados;

    }

    var mensaje = `Cédula: ${cedula}\nNombre: ${nombre}\nTeléfono: ${telefono}\nEstado: ${estado}\nCantidad de Boletos: ${boletos}\nNmros de Boletos: ${NmrosBoletos}\nForma de Pago: ${formadePago}`;
    var mensajeCodificado = encodeURIComponent(mensaje);
    var numeroTelefono = '584244061953';
    var url = `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`;
    window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchBoletosNoDisponible();
    console.log('DOMContentLoaded');
    console.log('Boletos No Disponibles:', ArrayBoletosNoDisponible);
});