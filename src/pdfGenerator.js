const React = require('react');
const { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Font,
  pdf 
} = require('@react-pdf/renderer');

// Configurar React-PDF para Node.js
const { createElement } = React;

// Configuración específica para Node.js
const { renderToStream } = require('@react-pdf/renderer');

// Registrar fuentes (opcional - usar fuentes del sistema)
try {
  Font.register({
    family: 'Helvetica',
    fonts: [
      { src: 'Helvetica' },
      { src: 'Helvetica-Bold', fontWeight: 'bold' }
    ]
  });
} catch (error) {
  console.warn('No se pudieron registrar las fuentes:', error.message);
}

// Estilos del documento
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #2c3e50',
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
    backgroundColor: '#ecf0f1',
    padding: 8
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bdc3c7'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
    minHeight: 30,
    alignItems: 'center'
  },
  tableHeader: {
    backgroundColor: '#34495e',
    color: '#ffffff',
    fontWeight: 'bold'
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    textAlign: 'center'
  },
  tableCellLeft: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    textAlign: 'left'
  },
  totalRow: {
    backgroundColor: '#ecf0f1',
    fontWeight: 'bold'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: 10
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  infoItem: {
    fontSize: 12
  }
});

// Componente del documento PDF
const PDFDocument = ({ data }) => {
  // Validar datos
  const safeData = {
    titulo: data?.titulo || 'Reporte',
    fecha: data?.fecha || new Date().toLocaleDateString('es-ES'),
    id: data?.id || 'N/A',
    estado: data?.estado || 'Completado',
    items: Array.isArray(data?.items) ? data.items : [],
    total: data?.total || 0,
    notas: data?.notas || ''
  };

  return createElement(Document, {}, 
    createElement(Page, { size: "A4", style: styles.page }, [
      // Header
      createElement(View, { key: 'header', style: styles.header }, [
        createElement(Text, { key: 'title', style: styles.title }, safeData.titulo),
        createElement(Text, { key: 'subtitle', style: styles.subtitle }, 
          `Generado el: ${safeData.fecha}`)
      ]),

      // Información general
      createElement(View, { key: 'info', style: styles.section }, 
        createElement(View, { style: styles.infoRow }, [
          createElement(Text, { key: 'id', style: styles.infoItem }, 
            `ID del Reporte: ${safeData.id}`),
          createElement(Text, { key: 'estado', style: styles.infoItem }, 
            `Estado: ${safeData.estado}`)
        ])
      ),

      // Tabla de items (solo si hay items)
      ...(safeData.items.length > 0 ? [
        createElement(View, { key: 'table-section', style: styles.section }, [
          createElement(Text, { key: 'table-title', style: styles.sectionTitle }, 'Detalle de Items'),
          createElement(View, { key: 'table', style: styles.table }, [
            // Header de la tabla
            createElement(View, { key: 'table-header', style: [styles.tableRow, styles.tableHeader] }, [
              createElement(Text, { key: 'col-id', style: styles.tableCell }, 'ID'),
              createElement(Text, { key: 'col-nombre', style: styles.tableCellLeft }, 'Nombre'),
              createElement(Text, { key: 'col-precio', style: styles.tableCell }, 'Precio'),
              createElement(Text, { key: 'col-cantidad', style: styles.tableCell }, 'Cantidad'),
              createElement(Text, { key: 'col-subtotal', style: styles.tableCell }, 'Subtotal')
            ]),
            // Filas de datos
            ...safeData.items.map((item, index) => 
              createElement(View, { key: `row-${index}`, style: styles.tableRow }, [
                createElement(Text, { key: `id-${index}`, style: styles.tableCell }, item.id || ''),
                createElement(Text, { key: `nombre-${index}`, style: styles.tableCellLeft }, item.nombre || ''),
                createElement(Text, { key: `precio-${index}`, style: styles.tableCell }, `$${item.precio || 0}`),
                createElement(Text, { key: `cantidad-${index}`, style: styles.tableCell }, item.cantidad || 1),
                createElement(Text, { key: `subtotal-${index}`, style: styles.tableCell }, 
                  `$${((item.precio || 0) * (item.cantidad || 1)).toFixed(2)}`)
              ])
            ),
            // Fila de total
            createElement(View, { key: 'total-row', style: [styles.tableRow, styles.totalRow] }, [
              createElement(Text, { key: 'empty1', style: styles.tableCell }, ''),
              createElement(Text, { key: 'empty2', style: styles.tableCellLeft }, ''),
              createElement(Text, { key: 'empty3', style: styles.tableCell }, ''),
              createElement(Text, { key: 'total-label', style: styles.tableCell }, 'TOTAL:'),
              createElement(Text, { key: 'total-value', style: styles.tableCell }, `$${safeData.total}`)
            ])
          ])
        ])
      ] : []),

      // Información adicional (solo si hay notas)
      ...(safeData.notas ? [
        createElement(View, { key: 'notas-section', style: styles.section }, [
          createElement(Text, { key: 'notas-title', style: styles.sectionTitle }, 'Notas Adicionales'),
          createElement(Text, { key: 'notas-content', style: { fontSize: 12, lineHeight: 1.5 } }, safeData.notas)
        ])
      ] : []),

      // Footer
      createElement(Text, { key: 'footer', style: styles.footer }, 
        'Página 1 de 1 - Generado automáticamente por React-PDF SSR')
    ])
  );
};

// Función principal para generar PDF
async function generatePDF(data) {
  try {
    console.log('Iniciando generación de PDF con datos:', JSON.stringify(data, null, 2));
    
    // Crear el documento React
    const element = createElement(PDFDocument, { data });
    
    // Generar el PDF usando renderToStream
    const stream = await renderToStream(element);
    
    // Convertir stream a buffer
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        console.log(`PDF generado exitosamente. Tamaño: ${buffer.length} bytes`);
        resolve(buffer);
      });
      stream.on('error', reject);
    });
    
  } catch (error) {
    console.error('Error en generatePDF:', error);
    throw new Error(`Error generando PDF: ${error.message}`);
  }
}

module.exports = { generatePDF }; 