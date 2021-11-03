import mongoLoader from './mongo';
import basicLoader from './basic';
import socketLoader from './socket';

function Loader({ server, app }: any): any {
  mongoLoader();
  basicLoader(app);
  socketLoader(server, app);
}

export default Loader;
