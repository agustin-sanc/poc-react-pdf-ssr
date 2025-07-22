# React-PDF SSR - Prueba de Concepto

Esta es una prueba de concepto que demuestra cómo generar PDFs del lado del servidor usando React-PDF con Express.

## 🚀 Características

- ✅ Generación de PDFs del lado del servidor
- ✅ API REST con Express
- ✅ Diseño profesional con tablas y estilos
- ✅ Datos automáticos generados por el servidor
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

#### 2. Generar PDF automático

```bash
POST http://localhost:3000/generate-pdf
```

Este endpoint genera automáticamente un PDF con datos de ejemplo y lo guarda en el servidor.

#### 3. Generar PDF de prueba

```bash
GET http://localhost:3000/test-pdf
```

Este endpoint genera un PDF de prueba con datos simplificados.

#### 4. Listar PDFs generados

```bash
GET http://localhost:3000/pdfs
```

Este endpoint lista todos los PDFs generados y guardados en el servidor.

## 📋 Ejemplos de uso

### Con curl

**Health check:**

```bash
curl http://localhost:3000/health
```

**Generar PDF automático:**

```bash
curl -X POST http://localhost:3000/generate-pdf
```

**Generar PDF de prueba:**

```bash
curl -X GET http://localhost:3000/test-pdf
```

**Listar PDFs generados:**

```bash
curl http://localhost:3000/pdfs
```

### Con JavaScript/Fetch

```javascript
// Generar PDF automático
const response = await fetch("http://localhost:3000/generate-pdf", {
  method: "POST",
});

if (response.ok) {
  const result = await response.json();
  console.log("PDF generado:", result);
}

// Generar PDF de prueba
const testResponse = await fetch("http://localhost:3000/test-pdf", {
  method: "GET",
});

if (testResponse.ok) {
  const testResult = await testResponse.json();
  console.log("PDF de prueba generado:", testResult);
}

// Listar PDFs
const pdfsResponse = await fetch("http://localhost:3000/pdfs", {
  method: "GET",
});

if (pdfsResponse.ok) {
  const pdfs = await pdfsResponse.json();
  console.log("PDFs disponibles:", pdfs);
}
```

## 📁 Estructura del proyecto

```
├── src/
│   ├── server.js          # Servidor Express principal
│   ├── pdfGenerator.js    # Lógica de generación de PDFs
│   └── pdfs/              # Carpeta donde se guardan los PDFs generados
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

## 📊 Datos generados automáticamente

Los endpoints generan automáticamente datos con la siguiente estructura:

```javascript
{
  "titulo": "Reporte Automático",
  "fecha": "Fecha actual en formato español",
  "id": "REP-[timestamp]",
  "estado": "Generado",
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
    },
    {
      "id": 3,
      "nombre": "Producto C",
      "precio": 150,
      "cantidad": 3
    }
  ],
  "total": 750,
  "notas": "Este reporte fue generado automáticamente por el sistema."
}
```

## 🎨 Personalización

Podés modificar el diseño del PDF editando el archivo `src/pdfGenerator.js`. Los estilos están definidos usando `StyleSheet.create()` de React-PDF.

Para personalizar los datos generados automáticamente, podés editar la lógica en `src/server.js` en los endpoints `/generate-pdf` y `/test-pdf`.

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
