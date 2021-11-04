import 'dotenv/config';
import express from 'express';
import Loader from './loader';
import http from 'http';
import apiRouter from './api';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || '5000';
app.set('port', port);

Loader({ server, app });

app.use('/api', apiRouter);

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log(bind);
}

server.listen(port);
server.on('listening', onListening);
