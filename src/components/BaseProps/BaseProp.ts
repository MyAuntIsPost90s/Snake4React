import Match from './Match';
import History from './History';
import Location from './Location';
import AuthRoute from './AuthRoute';

export default interface BaseProp {
  children?: BaseProp | any;

  computedMatch?: Match | any;

  history?: History | any;

  location?: Location | any;

  match?: Match | any;

  route?: AuthRoute;
}
