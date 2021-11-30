import mongoose from 'mongoose';

const db = mongoose.connection;
db.on('error', () => {
  console.log('MongoDB Connection Failed!');
});
db.once('open', () => {
  console.log('MongoDB Connected');
});

const initMongo = (dbConfig): void => {
  const { host, port, dbName, user, pwd } = dbConfig;
  mongoose.connect(`mongodb://${user}:${pwd}@${host}:${port}/${dbName}`);
};

export default initMongo;
