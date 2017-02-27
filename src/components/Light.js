import React from 'react';

import Component from './Component';
import { Direction } from '../helpers';

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
      <div style={{textAlign: 'center'}}>
        <div className="colours">
          {colours.map((colour, index) => {
            const className = `colour bg-${colour} ${
              colour === this.onClass ? 'selected' : ''
            }`;

            return (
              <div className={className} key={index} onClick={(evt) => {
                this.onClass = colour;
                app.forceUpdate();
              }}></div>
            );
          })}
        </div>
      </div>
    );
  }
}
