import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Métrica personalizada para tasa de error
const errorRate = new Rate('errors');

// Opciones de configuración
export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp-up a 10 VUs
    { duration: '1m', target: 10 },   // Mantener 10 VUs
    { duration: '30s', target: 0 },   // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% de requests < 500ms
    http_req_failed: ['rate<0.1'],     // Menos del 10% de errores
    errors: ['rate<0.1'],              // Tasa de errores < 10%
  },
};

export default function () {
  // URL de ejemplo - cambia esto por tu endpoint
  const url = 'https://httpbin.test.k6.io/get';
  
  // Headers opcionales
  const params = {
    headers: {
      'User-Agent': 'k6-performance-test/1.0',
      'Content-Type': 'application/json',
    },
    tags: {
      name: 'TestEndpoint',
    },
  };

  // Enviar solicitud GET
  const res = http.get(url, params);
  
  // Verificar la respuesta
  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'has response body': (r) => r.body.length > 0,
  });

  // Registrar error si la verificación falla
  errorRate.add(!checkRes);

  // Agregar puntos de chequeo específicos para el body si es necesario
  if (res.status === 200) {
    try {
      const body = JSON.parse(res.body);
      check(body, {
        'has origin': (b) => b.origin !== undefined,
        'has url': (b) => b.url !== undefined,
      });
    } catch (e) {
      // Error al parsear JSON
      errorRate.add(1);
    }
  }

  // Tiempo de espera entre iteraciones (1-2 segundos)
  sleep(Math.random() * 1 + 1);
}

// Función de setup (opcional) - ejecutada una vez al inicio
export function setup() {
  console.log('Iniciando prueba de rendimiento...');
  return { startTime: new Date().toISOString() };
}

// Función de teardown (opcional) - ejecutada al final
export function teardown(data) {
  console.log('Finalizando prueba...');
  console.log('Inicio:', data.startTime);
  console.log('Fin:', new Date().toISOString());
}
