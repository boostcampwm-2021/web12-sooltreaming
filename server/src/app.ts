import 'dotenv/config';
import express from 'express';
import Loader from '@src/loader';
import http from 'http';
import apiRouter from '@src/api';
import { PORT } from '@src/constant';
import { FILE_PUBLIC_URL } from 'sooltreaming-domain/constant/addition';

const app = express();
const server = http.createServer(app);
app.set('port', PORT);

Loader({ server, app });

app.use('/api', apiRouter);
app.use(FILE_PUBLIC_URL, express.static(FILE_PUBLIC_URL));

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log(bind);
}

server.listen(PORT);
server.on('listening', onListening);
