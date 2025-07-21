# React-PDF SSR - Prueba de Concepto

Esta es una prueba de concepto que demuestra cómo generar PDFs del lado del servidor usando React-PDF con Express.

## 🚀 Características

- ✅ Generación de PDFs del lado del servidor
- ✅ API REST con Express
- ✅ Diseño profesional con tablas y estilos
- ✅ Soporte para datos dinámicos
- ✅ Endpoint de prueba incluido

## 📦 Instalación

1. **Instalar dependencias:**

```bash
pnpm install
```

2. **Compilar el proyecto:**

```bash
pnpm run build
```

3. **Iniciar el servidor:**

```bash
pnpm start
```

Para desarrollo con auto-reload:

```bash
pnpm dev
```

## 🎯 Uso

### Endpoints disponibles

#### 1. Health Check

```bash
GET http://localhost:3000/health
```

#### 2. Generar PDF con datos personalizados

```bash
POST http://localhost:3000/generate-pdf
Content-Type: application/json

{
  "data": {
    "titulo": "Mi Reporte Personalizado",
    "fecha": "2024-01-15",
    "id": "REP-001",
    "estado": "Aprobado",
    "items": [
      {
        "id": 1,
        "nombre": "Producto A",
        "precio": 100,
        "cantidad": 2
      },
      {
        "id": 2,
        "nombre": "Producto B",
        "precio": 200,
        "cantidad": 1
      }
    ],
    "total": 400,
    "notas": "Este es un reporte de ejemplo con notas adicionales."
  }
}
```

#### 3. Generar PDF de prueba

```bash
GET http://localhost:3000/test-pdf
```

## 📋 Ejemplos de uso

### Con curl

**Health check:**

```bash
curl http://localhost:3000/health
```

**Generar PDF de prueba:**

```bash
curl -o test-reporte.pdf http://localhost:3000/test-pdf
```

**Generar PDF personalizado:**

```bash
curl -X POST http://localhost:3000/generate-pdf \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "titulo": "Reporte de Ventas",
      "fecha": "2024-01-15",
      "id": "VENT-2024-001",
      "estado": "Completado",
      "items": [
        {"id": 1, "nombre": "Laptop", "precio": 1200, "cantidad": 1},
        {"id": 2, "nombre": "Mouse", "precio": 25, "cantidad": 3},
        {"id": 3, "nombre": "Teclado", "precio": 80, "cantidad": 2}
      ],
      "total": 1335,
      "notas": "Reporte generado automáticamente por el sistema."
    }
  }' \
  -o reporte-personalizado.pdf
```

### Con JavaScript/Fetch

```javascript
// Generar PDF personalizado
const response = await fetch("http://localhost:3000/generate-pdf", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    data: {
      titulo: "Reporte de Inventario",
      fecha: new Date().toLocaleDateString("es-ES"),
      id: "INV-001",
      estado: "Pendiente",
      items: [
        { id: 1, nombre: "Producto 1", precio: 50, cantidad: 10 },
        { id: 2, nombre: "Producto 2", precio: 75, cantidad: 5 },
      ],
      total: 875,
      notas: "Inventario actualizado al día de hoy.",
    },
  }),
});

if (response.ok) {
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "reporte.pdf";
  a.click();
}
```

## 📁 Estructura del proyecto

```
├── src/
│   ├── server.js          # Servidor Express principal
│   └── pdfGenerator.js    # Lógica de generación de PDFs
├── package.json           # Dependencias y scripts
├── webpack.config.js      # Configuración de Webpack
├── .babelrc              # Configuración de Babel
└── README.md             # Este archivo
```

## 🔧 Tecnologías utilizadas

- **Express.js** - Servidor web
- **React-PDF** - Generación de PDFs
- **Webpack** - Bundling del código
- **Babel** - Transpilación de JavaScript
- **Puppeteer** - Renderizado del lado del servidor

## 📊 Formato de datos

El endpoint acepta un objeto con la siguiente estructura:

```javascript
{
  "titulo": "Título del reporte",
  "fecha": "Fecha de generación",
  "id": "ID único del reporte",
  "estado": "Estado del reporte",
  "items": [
    {
      "id": 1,
      "nombre": "Nombre del producto",
      "precio": 100,
      "cantidad": 2
    }
  ],
  "total": 200,
  "notas": "Notas adicionales (opcional)"
}
```

## 🎨 Personalización

Podés modificar el diseño del PDF editando el archivo `src/pdfGenerator.js`. Los estilos están definidos usando `StyleSheet.create()` de React-PDF.

## 🚨 Solución de problemas

### Error de compilación

Si tenés problemas con la compilación, asegúrate de tener Node.js 14+ instalado y ejecuta:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm run build
```

### Error de fuentes

Si hay problemas con las fuentes, el sistema usará las fuentes por defecto del sistema.

## 📝 Licencia

MIT
