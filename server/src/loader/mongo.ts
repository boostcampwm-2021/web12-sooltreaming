import initMongo from '@src/models';

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pwd: process.env.DB_PASSWORD,
};

const mongoLoader = () => {
  initMongo(dbConfig);
};

export default mongoLoader;
