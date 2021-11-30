import 'dotenv/config';
import express from 'express';
import Loader from '@src/loader';
import http from 'http';
import apiRouter from '@src/api';
import { PORT } from '@src/constant';
import { updateRankCron } from '@utils/cron';
import { updateRank } from '@service/rank';

const app = express();
const server = http.createServer(app);
app.set('port', PORT);

Loader({ server, app });

app.use('/api', apiRouter);

updateRank();
updateRankCron.start();

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log(bind);
}

server.listen(PORT);
server.on('listening', onListening);
