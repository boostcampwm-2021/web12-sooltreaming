import mongoLoader from '@loader/mongo';
import basicLoader from '@loader/basic';
import socketLoader from '@loader/socket';

const Loader = ({ server, app }) => {
  mongoLoader();
  basicLoader(app);
  socketLoader(server, app);
};

export default Loader;
