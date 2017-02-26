import React from 'react';

import Component from './Component';
import { Direction } from '../helpers';

export default class Source extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '@',
      name: 'source',
      conductDirections: Direction.ALL,
      receiveDirections: Direction.NONE,
      initialPower: true,
      hasSettings: true
    });
  }

  handleChange(event) {
    console.log(event.target.value);
  }

  renderInspectorSettings(app) {
    return (
      <div>
        Powered? <input type="checkbox" checked={this.initialPower} onChange={() => {
          this.initialPower = !this.initialPower;
          app.forceUpdate();
        }}/>
      </div>
    );
  }
}
