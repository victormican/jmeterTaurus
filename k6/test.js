import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: __ENV.USUARIOS ? parseInt(__ENV.USUARIOS) : 10,
  duration: __ENV.DURACION ? `${__ENV.DURACION}s` : '60s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000'],
  },
};

export default function () {
  const res = http.get('https://example.com');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
