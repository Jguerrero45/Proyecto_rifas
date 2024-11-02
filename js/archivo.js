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