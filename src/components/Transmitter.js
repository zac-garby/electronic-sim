import React from 'react';

import Component from './Component';
import { Direction, renderStringSetting } from '../helpers';

export default class Transmitter extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '!',
      name: 'transmitter',
      category: 'wireless',
      receiveDirections: Direction.ALL,
      hasSettings: true,
      properties: {
        channel: ''
      }
    });
  }

  get conductableCoords() {
    if (this.properties.channel === '') return [];
    // console.log(this.board.getReceiversOfChannel(this.properties.channel));
    return this.board.getReceiversOfChannel(this.properties.channel);
  }

  renderInspectorSettings(app) {
    return (
      <div>
        {renderStringSetting(app, this.properties, 'channel')}
      </div>
    );
  }
}
