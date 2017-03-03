import React from 'react';

import Component from './Component';
import { Direction, renderScriptSetting } from '../helpers';

import Errors from '../Errors';

export default class Microcontroller extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '#',
      name: 'microcontroller',
      conductDirections: Direction.NONE,
      receiveDirections: Direction.ALL,
      hasSettings: true,
      properties: {
        script: 'return {\n\ttest: true\n};',
        errors: []
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
    const fun = new Function('get', 'log', this.properties.script);

    const get = (x, y) => {
      const cell = this.board.get.bind(this.board)(x - 1, y - 1);

      return {
        on: cell.on,
        char: cell.char,
        name: cell.name,
        properties: cell.properties
      }
    }, log = console.log;

    let out;

    try {
      out = fun(get, log);
    } catch (e) {
      this.properties.errors.unshift(e);
    } finally {
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
  }

  renderInspectorSettings(app) {
    return (
      <div style={{position: 'relative', height: '100%'}}>
        {renderScriptSetting(app, this.properties, 'script')}
        <Errors app={this.board.app} comp={this} />
      </div>
    );
  }
}
