import pipe from '../utils/pipe';
import basicLoader from './basic';
import mongoLoader from './mongo';

function Loader(app: any): any {
  pipe(basicLoader)(app);
  pipe(mongoLoader)(app);
}

export default Loader;
