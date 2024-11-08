const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});