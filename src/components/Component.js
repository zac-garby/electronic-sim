import React from 'react';
import { Direction } from '../helpers';

export default class Component {
  constructor(x, y, options={}) {
    Object.assign(this, Object.assign({
      char: ' ',
      name: 'none',
      conductDirections: Direction.NONE,
      receiveDirections: Direction.NONE,
      initialPower: false,
      onClass: 'green',
      offClass: 'grey',
      properties: {},
      hasSettings: false
    }, options));

    this.x = x;
    this.y = y;
    this.on = false;
  }

  makeTableCell(key, selected, onClick) {
    const className = (selected ? 'selected ' : '') +
      (this.on ? this.onClass : this.offClass);
    return (
      <td key={key} className={className}
          onClick={onClick}>
        {this.char}
      </td>
    );
  }

  shouldPower(app) {
    return this.initialPower;
  }

  get conductableCoords() {
    return this.conductDirections.map((direction) => {
      return {
        x: direction.x + this.x,
        y: direction.y + this.y
      };
    });
  }

  get receiveableCoords() {
    return this.receiveDirections.map((direction) => {
      return {
        x: direction.x + this.x,
        y: direction.y + this.y
      };
    });
  }

  canReceiveFrom(x, y) {
    for (var i = 0; i < this.receiveableCoords.length; i++) {
      const coord = this.receiveableCoords[i];
      if (coord.x === x && coord.y === y) {
        return true;
      }
    }
    return false;
  }

  simulate(from, board, step) {
    const pos = {
      x: this.x,
      y: this.y
    };

    this.on = true;

    this.conductableCoords.map((coord) => {
      if (board.contains(coord.x, coord.y)) {
        const comp = board.get(coord.x, coord.y);

        if (comp.name && !comp.on && comp.canReceiveFrom(pos.x, pos.y) &&
            (from.x !== comp.x || from.y !== comp.y)) {
          comp.simulate(pos, board, step);
        }
      }

      return null; // Useless value to silence warning
    });
  }

  renderInspectorSettings() {
    return <span>No settings.</span>;
  }
}
