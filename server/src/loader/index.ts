import mongoLoader from '@loader/mongo';
import passportLoader from '@loader/passport';
import basicLoader from '@loader/basic';
import socketLoader from '@loader/socket';

const Loader = ({ server, app }): void => {
  mongoLoader();
  basicLoader(app);
  passportLoader(app);
  socketLoader(server, app);
};

export default Loader;
