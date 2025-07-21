const express = require('express');
const fs = require('fs');
const path = require('path');
const { generatePDF } = require('./pdfGenerator');

const app = express();
const PORT = process.env.PORT || 3000;

// Crear carpeta para PDFs si no existe
const pdfDir = path.join(__dirname, 'pdfs');
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

// Middleware para parsear JSON
app.use(express.json());

// Endpoint para generar PDF
app.post('/generate-pdf', async (req, res) => {
  try {
    // Datos de ejemplo para generar el PDF
    const data = {
      titulo: 'Reporte Automático',
      fecha: new Date().toLocaleDateString('es-ES'),
      id: `REP-${Date.now()}`,
      estado: 'Generado',
      items: [
        {
          id: 1,
          nombre: 'Producto A',
          precio: 100,
          cantidad: 2
        },
        {
          id: 2,
          nombre: 'Producto B',
          precio: 200,
          cantidad: 1
        },
        {
          id: 3,
          nombre: 'Producto C',
          precio: 150,
          cantidad: 3
        }
      ],
      total: 750,
      notas: 'Este reporte fue generado automáticamente por el sistema.'
    };

    console.log('Generando PDF con datos automáticos:', data);
    
    // Generar el PDF
    const pdfBuffer = await generatePDF(data);
    
    // Verificar que el buffer sea válido
    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error('El PDF generado está vacío');
    }
    
    // Guardar el PDF en el backend
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `reporte-${timestamp}.pdf`;
    const filepath = path.join(pdfDir, filename);
    
    fs.writeFileSync(filepath, pdfBuffer);
    
    console.log(`PDF guardado exitosamente en: ${filepath}`);
    console.log(`Tamaño del archivo: ${pdfBuffer.length} bytes`);
    
    // Devolver confirmación
    res.json({ 
      success: true,
      message: 'PDF generado exitosamente',
      filename: filename,
      filepath: filepath,
      size: pdfBuffer.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error generando PDF:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor al generar PDF',
      details: error.message 
    });
  }
});

// Endpoint de prueba
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Endpoint de ejemplo con datos de prueba
app.get('/test-pdf', async (req, res) => {
  try {
    const testData = {
      titulo: 'Reporte de Prueba',
      fecha: new Date().toLocaleDateString('es-ES'),
      items: [
        { id: 1, nombre: 'Producto A', precio: 100 },
        { id: 2, nombre: 'Producto B', precio: 200 },
        { id: 3, nombre: 'Producto C', precio: 150 }
      ],
      total: 450
    };
    
    console.log('Generando PDF de prueba con datos:', testData);
    
    const pdfBuffer = await generatePDF(testData);
    
    // Verificar que el buffer sea válido
    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error('El PDF generado está vacío');
    }
    
    // Guardar el PDF en el backend
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `test-reporte-${timestamp}.pdf`;
    const filepath = path.join(pdfDir, filename);
    
    fs.writeFileSync(filepath, pdfBuffer);
    
    console.log(`PDF de prueba guardado exitosamente en: ${filepath}`);
    console.log(`Tamaño del archivo: ${pdfBuffer.length} bytes`);
    
    // Devolver confirmación
    res.json({ 
      success: true,
      message: 'PDF de prueba generado exitosamente',
      filename: filename,
      filepath: filepath,
      size: pdfBuffer.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error en test PDF:', error);
    res.status(500).json({ 
      error: 'Error generando PDF de prueba',
      details: error.message 
    });
  }
});

// Endpoint para listar PDFs generados
app.get('/pdfs', (req, res) => {
  try {
    const files = fs.readdirSync(pdfDir);
    const pdfFiles = files
      .filter(file => file.endsWith('.pdf'))
      .map(file => {
        const filepath = path.join(pdfDir, file);
        const stats = fs.statSync(filepath);
        return {
          filename: file,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime
        };
      })
      .sort((a, b) => b.modified - a.modified);
    
    res.json({
      success: true,
      count: pdfFiles.length,
      files: pdfFiles
    });
  } catch (error) {
    console.error('Error listando PDFs:', error);
    res.status(500).json({ 
      error: 'Error listando PDFs',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📄 Endpoint PDF: POST http://localhost:${PORT}/generate-pdf`);
  console.log(`🧪 Test PDF: GET http://localhost:${PORT}/test-pdf`);
  console.log(`📁 Listar PDFs: GET http://localhost:${PORT}/pdfs`);
  console.log(`💚 Health check: GET http://localhost:${PORT}/health`);
  console.log(`📂 PDFs se guardan en: ${pdfDir}`);
}); 