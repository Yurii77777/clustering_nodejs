const cluster = require('cluster');
import * as http from 'http';
import * as os from 'os';
import App from './app';

require('dotenv').config();

import { generateMockData } from './utils/generateMockData';

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Master process is running with PID ${process.pid}`);

  // Створення робочих процесів (workers)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  // Робочі процеси запускають сервер
  const port = process.env.PORT || 3080;
  App.set('port', port);
  const server = http.createServer(App);
  server.listen(port);
  console.log(`Worker ${process.pid} started`);

  server.on('listening', function (): void {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`, null);
  });
}

// Закоментувати або видалити після першого запуску виклик функції нижче
generateMockData();

module.exports = App;
