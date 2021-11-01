import mongoose from 'mongoose';
import User from './User';

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
};

const db = mongoose.connection;
db.on('error', () => {
  console.log('MongoDB Connection Failed!');
});
db.once('open', () => {
  console.log('MongoDB Connected');
});

const initMongo = () => {
  mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`);
};
export default initMongo;
