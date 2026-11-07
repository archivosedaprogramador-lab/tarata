const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // Sirve tu index.html y los geojson directamente

// Endpoint genérico para actualizar cualquier archivo geojson
app.post('/api/actualizar/:archivo', (req, res) => {
    const nombreArchivo = req.params.archivo;
    
    // Seguridad básica para permitir solo tus archivos actuales
    const permitidos = ['andenes.geojson', 'enmienda_organica.geojson', 'riego_parcelario.geojson'];
    if (!permitidos.includes(nombreArchivo)) {
        return res.status(400).json({ error: 'Archivo no permitido' });
    }

    const filePath = path.join(__dirname, nombreArchivo);
    const nuevoContenido = req.body;

    fs.writeFile(filePath, JSON.stringify(nuevoContenido, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'No se pudo guardar el archivo' });
        res.json({ success: true, message: `${nombreArchivo} actualizado correctamente` });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));