

const x = 1000; // Tickets Totales
const ArrayBoletosNoDisponible = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ArrayBoletosDisponible = Array.from({ length: x + 1 }, (_, i) => i);

function botonComprarPorNumero() {
    const container = document.querySelector('.days-btn-container');
    ArrayBoletosDisponible.forEach(boleto => {
        if (ArrayBoletosNoDisponible.includes(boleto)) {
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
    var cedula = document.getElementById('cedula').innerText;
    var nombre = document.getElementById('nombre').innerText;
    var apellido = document.getElementById('apellido').innerText;
    var telefono = document.getElementById('telefono').innerText;
    var estado = document.getElementById('estado').innerText;

    var mensaje = `Cédula: ${cedula}\nNombre: ${nombre}\nApellido: ${apellido}\nTeléfono: ${telefono}\nEstado: ${estado}`;
    var mensajeCodificado = encodeURIComponent(mensaje);
    var numeroTelefono = '584124007847';
    var url = `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`;
    window.open(url, '_blank');
}