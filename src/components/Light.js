import React from 'react';

import Component from './Component';
import { Direction, renderColourSetting } from '../helpers';

export default class Light extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '*',
      name: 'light',
      conductDirections: Direction.ALL,
      receiveDirections: Direction.ALL,
      onClass: 'red',
      hasSettings: true
    });
  }

  renderInspectorSettings(app) {
    const colours = [
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'pink'
    ];

    return (
      <div>
        {renderColourSetting(app, this, 'onClass', colours)}
      </div>
    );
  }
}
