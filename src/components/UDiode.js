import Component from './Component';
import { Direction } from '../helpers';

export default class UDiode extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '^',
      name: 'udiode',
      category: 'conduction',
      conductDirections: [Direction.UP],
      receiveDirections: [Direction.DOWN]
    });
  }
}
