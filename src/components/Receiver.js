import React from 'react';

import Component from './Component';
import { Direction, renderStringSetting } from '../helpers';

export default class Receiver extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '?',
      name: 'receiver',
      category: 'wireless',
      conductDirections: Direction.ALL,
      hasSettings: true,
      properties: {
        channel: ''
      }
    });
  }

  get receiveableCoords() {
    if (this.properties.channel === '') return [];
    return this.board.getTransmittersOfChannel(this.properties.channel);
  }

  renderInspectorSettings(app) {
    return (
      <div>
        {renderStringSetting(app, this.properties, 'channel')}
      </div>
    );
  }
}
