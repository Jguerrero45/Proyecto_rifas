document.getElementById('pago-select').addEventListener('change', function() {
    var pagoSpan = document.getElementById('pago-span');
    if (this.value === 'Pago movil') {
        pagoSpan.innerHTML = `
        <label class="label">Banco:  xxx.</label>
        <label class="label">Telf: 04xx-xxxxxxx.</label>
        <label class="label">Rif: J-xxxxxxxx-x.</label>`;
    } else if (this.value === 'Zelle') {
        pagoSpan.innerHTML = `
        <label class="label">Correo:  xxxxx@gmail.com </label>`;;
    } else{
        pagoSpan.innerHTML = '';
    }
});