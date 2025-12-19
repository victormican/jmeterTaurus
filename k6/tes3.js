import http from 'k6/http';
import { sleep } from 'k6';

// Script K6 siguiendo documentación oficial de BlazeMeter
export default function() {
  // URL simple y confiable
  http.get('https://httpbin.org/get');
  
  // Pausa entre requests
  sleep(1);
}
