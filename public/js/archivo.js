
let precioTicket = 5; // Precio por Ticket en $$
const x = 1000; // Tickets Totales
const ArrayBoletosNoDisponible = [];
const ArrayBoletosDisponible = Array.from({ length: x + 1 }, (_, i) => i.toString().padStart(4, '0'));

let selectedCount = 0;
let selectedBoletos = [];

selecting = false;
function revision() {
    var numeroBoleto = document.getElementById('id_boleto').value;
    if (numeroBoleto.length < 4) {
        alert('El número de boleto debe tener 4 dígitos y una letra al final sea p o e');
    } else {
        if (numeroBoleto[4] !== 'p' && numeroBoleto[4] !== 'e') {
            alert('El número de boleto debe tener 4 dígitos y una letra al final sea p o e');
        } else if (numeroBoleto[4] === 'p') {
            if (ArrayBoletosNoDisponible.includes(parseInt(numeroBoleto.substring(0, 3)))) {
                alert('El número de boleto ya fue vendido');
            } else {
                ArrayBoletosNoDisponible.push(parseInt(numeroBoleto.substring(0, 3)));
                alert('Boleto vendido con exito');
            }
        } else if (numeroBoleto[4] === 'e') {
            if (ArrayBoletosNoDisponible.includes(parseInt(numeroBoleto.substring(0, 3)))) {
                const index = ArrayBoletosNoDisponible.indexOf(parseInt(numeroBoleto.substring(0, 3)));
                if (index > -1) {
                    ArrayBoletosNoDisponible.splice(index, 1);
                }
                alert('Boleto agregado a la lista de venta exitosamente');
            } else {
                alert('El número de boleto no ha sido vendido');

            }
        }
    }
}
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

function botonComprarPorNumero() {
    const container = document.querySelector('.days-btn-container');
    container.innerHTML = ``;
    ArrayBoletosDisponible.forEach(boleto => {
        if (ArrayBoletosNoDisponible.includes(parseInt(boleto))) {
            return; // Skip this boleto if it's in ArrayBoletosNoDisponible
        }
        const input = document.createElement('input');
        input.className = 'day-btn';
        input.id = boleto;
        input.type = 'checkbox';
        input.checked = false;

        input.addEventListener('change', (event) => {
            updateSelection(boleto, event.target.checked);
        });

        const label = document.createElement('label');
        label.className = 'day-label';
        label.htmlFor = boleto;
        label.textContent = boleto;

        container.appendChild(input);
        container.appendChild(label);
    });
    const button = document.getElementById('Numero');
    button.disabled = true;
    const button2 = document.getElementById('Suerte');
    button2.disabled = false;
    selecting = true;
}

document.getElementById('comprar').addEventListener('click', botonComprarPorNumero);

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
    `;

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
    label.textContent = currentValue + 2;
    precio.textContent = label.textContent * precioTicket;
}

function minus() {
    const label = document.getElementById('numeros');
    const precio = document.getElementById('precio');
    let currentValue = parseInt(label.textContent);
    if (currentValue > 0) {
        label.textContent = currentValue - 2;
        precio.textContent = label.textContent * precioTicket;
    }

}

function enviarWhatsApp() {
    var cedula = document.getElementById('cedula').value;
    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('telefono').value;
    var estado = document.getElementById('estado').value;
    var formadePago = document.getElementById('pago').value;
    var boletos = 0;
    var NmrosBoletos = '';
    if (selecting) {
        if (selectedCount === 0 || selectedCount % 2 !== 0) {
            alert('Debe seleccionar minimo de 2 numeros y unicamente en numeros pares (2, 4, 6, 8, 10, etc.)');
            return;
        }
        boletos = selectedCount;
        NmrosBoletos = selectedBoletos.join(', ');
    } else if (!selecting) {
        boletos = document.getElementById('numeros').textContent;
        var Rnumeros = parseInt(boletos);
        if (Rnumeros === 0) {
            alert('Debe seleccionar minimo de 2 numeros y unicamente en numeros pares (2, 4, 6, 8, 10, etc.)');
            return;
        } else {
            for (let i = 0; i < Rnumeros; i++) {
                var numero = Math.floor(Math.random() * 1000);
                if (ArrayBoletosNoDisponible.includes(numero)) {
                    i--;
                } else {
                    NmrosBoletos += numero + ', ';
                }
            }
            NmrosBoletos = NmrosBoletos.substring(0, NmrosBoletos.length - 2);
        }
    }


    var mensaje = `Cédula: ${cedula}\nNombre: ${nombre}\nTeléfono: ${telefono}\nEstado: ${estado}\nCantidad de Boletos: ${boletos}\nNmros de Boletos: ${NmrosBoletos}\nForma de Pago: ${formadePago}`;
    var mensajeCodificado = encodeURIComponent(mensaje);
    var numeroTelefono = '584124007847';
    var url = `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`;
    window.open(url, '_blank');
}