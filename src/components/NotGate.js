import Component from './Component';

import { Direction } from '../helpers';

export default class NotGate extends Component {
  constructor(x, y, options={}) {
    super(x, y, {
      char: '\'',
      name: 'not',
      category: 'control',
      conductDirections: [Direction.RIGHT],
      receiveDirections: Direction.NONE
    });
  }

  shouldPower() {
    const left = this.board.get(this.x - 1, this.y);

    if (left) {
      return !left.on;
    } else {
      return true;
    }
  }
}
