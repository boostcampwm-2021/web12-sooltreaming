const createProxyMiddleware = require('http-proxy-middleware');
const dotenv = require('dotenv');
dotenv.config();

const host = process.env.REACT_APP_BACK_HOST;
const port = process.env.REACT_APP_BACK_PORT;

const setupProxy = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${host}:${port}`,
      changeOrigin: true,
    }),
  );
};

module.exports = setupProxy;
