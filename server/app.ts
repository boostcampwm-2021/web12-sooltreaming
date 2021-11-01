import 'dotenv/config';
import express from 'express';
import Loader from './loader';
import http from 'http';
import testRouter from './api/v1/test';

const app = express();
Loader(app);

app.use('/test', testRouter);

const port = process.env.PORT || '5000';
app.set('port', port);
function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log(bind);
}

const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);
