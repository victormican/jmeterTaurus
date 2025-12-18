import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://api.mi-servicio.com/health');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
