import mongoLoader from './mongo';
import basicLoader from './basic';
import socketLoader from './socket';

const Loader = ({ server, app }) => {
  mongoLoader();
  basicLoader(app);
  socketLoader(server, app);
}

export default Loader;
