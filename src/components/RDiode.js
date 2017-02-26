import Component from './Component';
import { Direction } from '../helpers';

export default class RDiode extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '>',
      name: 'rdiode',
      conductDirections: [Direction.RIGHT],
      receiveDirections: [Direction.LEFT]
    });
  }
}
