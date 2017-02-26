import Component from './Component';
import { Direction } from '../helpers';

export default class CWire extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '+',
      name: 'cwire',
      conductDirections: Direction.ALL,
      receiveDirections: Direction.ALL
    });
  }
}
