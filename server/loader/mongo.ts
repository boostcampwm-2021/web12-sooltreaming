import tunnel from 'tunnel-ssh';
import initMongo from '../models';

const sshConfig: any = {
  username: process.env.DB_SSH_USER,
  password: process.env.DB_SSH_PASSWORD,
  host: process.env.DB_SSH_HOST,
  port: process.env.DB_SSH_PORT,

  dstHost: process.env.DB_HOST,
  dstPort: process.env.DB_PORT,
  // keepAlive: true
};

function mongoLoader() {
  tunnel(sshConfig, function (error, server) {
    if (error) return console.log('Error!! ', error);
    if (server === null) return console.log('No Server!');

    initMongo();
    // keepAlive 상태이기 때문에 서버가 꺼지면 close 명령을 해주어야 한다.
    // process.on('SIGTERM', () => {
    //   server.close();
    // });
  });
}

export default mongoLoader;
