import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '15s',
};

export default function () {
  const res = http.get('https://httpbin.org/get');
  if (res.status !== 200) {
    throw new Error('Request failed');
  }
  sleep(1);
}
