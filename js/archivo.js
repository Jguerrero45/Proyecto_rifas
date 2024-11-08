

const x = 1000; // Tickets Totales
const ArrayBoletosNoDisponible = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ArrayBoletosDisponible = Array.from({ length: x + 1 }, (_, i) => i.toString().padStart(4, '0'));

function botonComprarPorNumero() {
    const container = document.querySelector('.days-btn-container');
    ArrayBoletosDisponible.forEach(boleto => {
        if (ArrayBoletosNoDisponible.includes(parseInt(boleto))) {
            return; // Skip this boleto if it's in ArrayBoletosNoDisponible
        }

        const input = document.createElement('input');
        input.className = 'day-btn';
        input.id = boleto;
        input.type = 'checkbox';
        input.checked = false;

        const label = document.createElement('label');
        label.className = 'day-label';
        label.htmlFor = boleto;
        label.textContent = boleto;

        container.appendChild(input);
        container.appendChild(label);
    });
    const button = document.getElementById('Numero');
    button.disabled = true;
}
function enviarWhatsApp() {
    var cedula = document.getElementById('cedula').value;
    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('telefono').value;
    var estado = document.getElementById('estado').value;

    var mensaje = `Cédula: ${cedula}\nNombre: ${nombre}\nTeléfono: ${telefono}\nEstado: ${estado}`;
    var mensajeCodificado = encodeURIComponent(mensaje);
    var numeroTelefono = '584124007847';
    var url = `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`;
    window.open(url, '_blank');
}