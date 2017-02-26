import Component from './Component';
import { Direction } from '../helpers';

export default class LDiode extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '<',
      name: 'ldiode',
      conductDirections: [Direction.LEFT],
      receiveDirections: [Direction.RIGHT]
    });
  }
}
