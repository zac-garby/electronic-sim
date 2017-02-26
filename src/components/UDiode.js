import Component from './Component';
import { Direction } from '../helpers';

export default class UDiode extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '^',
      name: 'udiode',
      conductDirections: [Direction.UP],
      receiveDirections: [Direction.DOWN]
    });
  }
}
