import Component from './Component';
import { Direction } from '../helpers';

export default class Light extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '*',
      name: 'light',
      conductDirections: Direction.ALL,
      receiveDirections: Direction.ALL,
      onClass: 'orange'
    });
  }
}
