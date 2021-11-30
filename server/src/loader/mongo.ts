import initMongo from '@src/models';
import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from '@src/constant';

const dbConfig: Object = {
  host: DB_HOST,
  port: DB_PORT,
  dbName: DB_NAME,
  user: DB_USER,
  pwd: DB_PASSWORD,
};

const mongoLoader = (): void => {
  initMongo(dbConfig);
};

export default mongoLoader;
