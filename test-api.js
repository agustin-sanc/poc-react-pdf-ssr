const fetch = require('node-fetch');
const fs = require('fs');

// URL base del servidor
const BASE_URL = 'http://localhost:3000';

// Función para hacer peticiones HTTP
async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error('Error en la petición:', error.message);
    throw error;
  }
}

// Función para probar el health check
async function testHealthCheck() {
  console.log('🏥 Probando health check...');
  
  try {
    const response = await makeRequest(`${BASE_URL}/health`);
    const data = await response.json();
    
    console.log('✅ Health check exitoso:');
    console.log(JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.log('❌ Health check falló:', error.message);
    return false;
  }
}

// Función para probar la generación de PDF de prueba
async function testSamplePDF() {
  console.log('\n🧪 Probando generación de PDF de prueba...');
  
  try {
    const response = await makeRequest(`${BASE_URL}/test-pdf`);
    
    if (response.ok) {
      const buffer = await response.buffer();
      fs.writeFileSync('test-sample.pdf', buffer);
      console.log('✅ PDF de prueba generado exitosamente: test-sample.pdf');
      console.log(`📄 Tamaño del archivo: ${(buffer.length / 1024).toFixed(2)} KB`);
      return true;
    } else {
      console.log('❌ Error generando PDF de prueba:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.log('❌ Error en PDF de prueba:', error.message);
    return false;
  }
}

// Función para probar la generación de PDF automático
async function testCustomPDF() {
  console.log('\n🎨 Probando generación de PDF automático...');
  
  try {
    const response = await makeRequest(`${BASE_URL}/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const buffer = await response.buffer();
      fs.writeFileSync('test-automatic.pdf', buffer);
      console.log('✅ PDF automático generado exitosamente: test-automatic.pdf');
      console.log(`📄 Tamaño del archivo: ${(buffer.length / 1024).toFixed(2)} KB`);
      return true;
    } else {
      const errorData = await response.json();
      console.log('❌ Error generando PDF automático:', errorData);
      return false;
    }
  } catch (error) {
    console.log('❌ Error en PDF automático:', error.message);
    return false;
  }
}

// Función principal para ejecutar todas las pruebas
async function runTests() {
  console.log('🚀 Iniciando pruebas de la API React-PDF SSR\n');
  
  const results = {
    healthCheck: await testHealthCheck(),
    samplePDF: await testSamplePDF(),
    customPDF: await testCustomPDF()
  };
  
  console.log('\n📊 Resumen de pruebas:');
  console.log(`Health Check: ${results.healthCheck ? '✅' : '❌'}`);
  console.log(`PDF de Prueba: ${results.samplePDF ? '✅' : '❌'}`);
  console.log(`PDF Automático: ${results.customPDF ? '✅' : '❌'}`);
  
  const allPassed = Object.values(results).every(result => result);
  
  if (allPassed) {
    console.log('\n🎉 ¡Todas las pruebas pasaron exitosamente!');
    console.log('📁 Archivos generados:');
    console.log('   - test-sample.pdf (PDF de prueba)');
    console.log('   - test-automatic.pdf (PDF automático)');
  } else {
    console.log('\n⚠️  Algunas pruebas fallaron. Revisa los errores arriba.');
  }
}

// Ejecutar las pruebas si el script se ejecuta directamente
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testHealthCheck,
  testSamplePDF,
  testCustomPDF,
  runTests
}; 