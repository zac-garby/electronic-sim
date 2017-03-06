import Component from './Component';
import { Direction } from '../helpers';

export default class HWire extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '-',
      name: 'hwire',
      category: 'conduction',
      conductDirections: [Direction.LEFT, Direction.RIGHT],
      receiveDirections: [Direction.LEFT, Direction.RIGHT]
    });
  }
}
