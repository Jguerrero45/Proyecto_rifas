const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

let ArrayBoletosNoDisponible = [];

// Ruta de acceso protegida con token
app.get('/ruta-protegida', (req, res) => {
    const token = req.query.token ? req.query.token.trim() : ''; // Obtiene el token de la URL y elimina espacios en blanco
    const authorizedToken = "XFFPAU!!PPmpbt5w7Wf"; // Token autorizado

    console.log(`Token recibido: '${token}'`); // Log del token recibido
    if (token === authorizedToken) {
        console.log('Acceso concedido'); // Log de acceso concedido
        res.sendFile(path.join(__dirname, 'public', 'templates', 'rutaprotegida.html')); // Archivo protegido
    } else {
        console.log('Acceso denegado: Token no válido'); // Log de acceso denegado
        res.status(403).send("Acceso denegado"); // Si el token no es válido
    }
});

// Endpoint to save boleto
app.post('/save-boleto', (req, res) => {
    const { numeroBoleto, pago } = req.body;
    if (!numeroBoleto || !pago) {
        return res.status(400).send('Datos incompletos');
    }
    if (pago === 'pagado') {
        if (ArrayBoletosNoDisponible.includes(numeroBoleto)) {
            return res.status(400).send('El número de boleto ya fue vendido');
        }
        ArrayBoletosNoDisponible.push(numeroBoleto);
        res.send('Boleto vendido con exito');
    } else if (pago === 'no_pagado') {
        const index = ArrayBoletosNoDisponible.indexOf(numeroBoleto);
        if (index > -1) {
            ArrayBoletosNoDisponible.splice(index, 1);
            return res.send('Boleto agregado a la lista de venta exitosamente');
        }
        res.status(400).send('El número de boleto no ha sido vendido');
    } else {
        res.status(400).send('Estado de pago no válido');
    }
});

// Endpoint to get all boletos
app.get('/boletos', (req, res) => {
    res.json(ArrayBoletosNoDisponible);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});