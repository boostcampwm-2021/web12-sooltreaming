import 'dotenv/config';
import express from 'express';
import Loader from './loader';
import http from 'http';
import apiRouter from './api';

const app = express();
Loader(app);

app.use('/api', apiRouter);

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
