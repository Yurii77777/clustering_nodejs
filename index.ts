const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Create an HTTP server
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end("It's ok!");
    })
    .listen(8000);
}
