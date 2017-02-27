import React from 'react';

import Component from './Component';
import { Direction, renderRangeSetting } from '../helpers';

export default class RandomSource extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '%',
      name: 'oscillator',
      conductDirections: Direction.ALL,
      receiveDirections: Direction.NONE,
      initialPower: true,
      hasSettings: true,
      properties: {
        chance: 50
      }
    });
  }

  shouldPower(app) {
    return Math.random() < (this.properties.chance / 100);
  }

  handleChange(event) {
    console.log(event.target.value);
  }

  renderInspectorSettings(app) {
    return (
      <div>
        {renderRangeSetting(app, this, 'chance', 0, 100, 2, '%')}
      </div>
    );
  }
}
