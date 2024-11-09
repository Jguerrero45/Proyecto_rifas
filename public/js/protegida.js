function revision() {
    var numeroBoleto = document.getElementById('id_boleto').value;
    var pago = document.getElementById('pago').value; // Obtener el estado de pago seleccionado

    if (numeroBoleto.length < 4) {
        alert('El número de boleto debe tener 4 dígitos');
    } else if (numeroBoleto.length > 4) {
        alert('El número de boleto no debe tener más de 4 dígitos');
    } else {
        fetch('/save-boleto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numeroBoleto: numeroBoleto.substring(0, 4),
                pago: pago // Incluir el estado de pago en el cuerpo de la solicitud
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al procesar el boleto');
                }
                return response.text();
            })
            .then(data => alert(data))
            .catch(error => alert(error.message));
    }
}