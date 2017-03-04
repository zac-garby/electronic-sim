import Component from './Component';

import { Direction } from '../helpers';

export default class AndGate extends Component {
  constructor(x, y, options={}) {
    super(x, y, {
      char: '&',
      name: 'and',
      conductDirections: [Direction.LEFT, Direction.RIGHT],
      receiveDirections: [Direction.UP, Direction.DOWN]
    });
  }

  simulate(from, board) {
    if (this.board.get(this.x, this.y + 1).on &&
        this.board.get(this.x, this.y - 1).on) {
      super.simulate(from, board);
    }
  }
}
