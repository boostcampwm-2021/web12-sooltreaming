import pipe from '../utils/pipe';
import basicLoader from './basic';

function Loader(app: any): any {
  pipe(basicLoader)(app);
}

export default Loader;
