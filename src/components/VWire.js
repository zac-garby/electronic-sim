import Component from './Component';
import { Direction } from '../helpers';

export default class VWire extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '|',
      name: 'vwire',
      conductDirections: [Direction.UP, Direction.DOWN],
      receiveDirections: [Direction.UP, Direction.DOWN]
    });
  }
}
