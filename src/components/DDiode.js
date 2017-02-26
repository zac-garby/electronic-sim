import Component from './Component';
import { Direction } from '../helpers';

export default class DDiode extends Component {
  constructor(x, y) {
    super(x, y, {
      char: 'v',
      name: 'ddiode',
      conductDirections: [Direction.DOWN],
      receiveDirections: [Direction.UP]
    });
  }
}
