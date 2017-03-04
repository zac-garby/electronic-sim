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
        script: 'return {\n\t/* Output channels here */\n};',
        data: {},
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
    const fun = new Function('read', 'write', 'readById', 'writeToId',
        'getCellById', 'getCell', 'log', this.properties.script).bind({
      x: this.x,
      y: this.y,
      on: this.on
    });

    const getCell = (x, y) => {
      const cell = this.board.get.bind(this.board)(x - 1, y - 1);

      return {
        on: cell.on,
        char: cell.char,
        name: cell.name,
        properties: cell.properties
      };
    }

    const getCellById = (id) => {
      let obj;

      this.board.each((cell, x, y) => {
        if (cell.id === id && !obj) {
          obj = {
            on: cell.on,
            char: cell.char,
            name: cell.name,
            properties: cell.properties
          }
        }
      });

      return obj;
    }

    const read = (x, y) => {
      const cell = getCell(x, y);

      if (cell.properties.store) {
        return cell.properties.value;
      } else {
        return undefined;
      }
    }

    const readById = (id) => {
      const cell = getCellById(id);

      if (cell.properties.store) {
        return cell.properties.value;
      } else {
        return undefined;
      }
    }

    const write = (x, y, value) => {
      const cell = getCell(x, y);

      if (cell.properties.store && typeof value === typeof cell.properties.value) {
        cell.properties.value = value;
        this.board.set.bind(this.board)(x - 1, y - 1, cell);
      }
    }

    const writeToId = (id, value) => {
      this.board.each((cell, x, y) => {
        if (cell.id === id && cell.properties.store && typeof value === typeof cell.properties.value) {
          cell.properties.value = value;
          this.board.set.bind(this.board)(x, y, cell);
        }
      });
    }

    let out;

    try {
      out = fun(read, write, readById, writeToId, getCellById, getCell, console.log);
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
