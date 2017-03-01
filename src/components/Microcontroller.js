import React from 'react';

import Component from './Component';
import { Direction, renderScriptSetting } from '../helpers';

export default class Microcontroller extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '#',
      name: 'microcontroller',
      conductDirections: Direction.NONE,
      receiveDirections: Direction.ALL,
      hasSettings: true,
      properties: {
        script: 'return {\n\ttest: true\n};'
      }
    });
  }

  simulate(from, board) {
    super.simulate(from, board);
    this.runScript();
  }

  runScript() {
    // Disable linting the next line because using the
    // function constructor gives a warning.

    // eslint-disable-next-line
    const fun = new Function('powerMap', 'cells', 'query', this.properties.script);
    const out = fun(
      this.board.powerMap,
      this.board.cells.slice(),
      (x, y) => {
        if (this.board.contains(x, y)) {
          return this.board.powerMap[y][x];
        }
        return false;
      }
    );

    for (var channel in out) {
      if (out.hasOwnProperty(channel)) {
        if (out[channel]) {
          for (let receiver of this.board.getReceiversOfChannel(channel)) {
            this.board.simulate(receiver.x, receiver.y);
          }
        }
      }
    }
  }

  renderInspectorSettings(app) {
    return (
      <div>
        {renderScriptSetting(app, this.properties, 'script')}
      </div>
    )
  }
}
