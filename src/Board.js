import components from './components/AllComponents';
import { objectsAreEqual, getComponent } from './helpers';

export default class Board {
  constructor(cells, app) {
    this.cells = cells;
    this.app = app;
  }

  set(x, y, cell) {
    cell.x = x;
    cell.y = y;
    cell.board = this;
    this.cells[y][x] = cell;
  }

  get(x, y) {
    return this.cells[y][x];
  }

  get powerMap() {
    const map = [];
    for (var y = 0; y < this.cells.length; y++) {
      const row = this.cells[y];
      map[y] = row.map((cell, x) => {
        return cell.on
      });
    }
    return map;
  }

  get width() {
    return this.cells[0].length;
  }

  get height() {
    return this.cells.length;
  }

  each(fun) {
    for (var y = 0; y < this.cells.length; y++) {
      const row = this.cells[y];
      for (var x = 0; x < row.length; x++) {
        const cell = row[x];
        fun(cell, x, y);
      }
    }
  }

  map(fun) {
    const mapped = [];
    for (var y = 0; y < this.cells.length; y++) {
      mapped[y] = this.cells[y].map(fun);
    }
    return mapped;
  }

  contains(x, y) {
    return x >= 0 && y >= 0 && x < this.cells[0].length && y < this.cells.length;
  }

  simulate(x, y) {
    if (!this.contains(x, y)) return;
    this.get(x, y).simulate({x: -1, y: -1}, this);
  }

  allOff() {
    this.each((cell, x, y) => {
      this.cells[y][x].on = false;
    });
  }

  step(num) {
    this.allOff();
    this.each((cell, x, y) => {
      if (cell.shouldPower(this.app)) {
        this.simulate(x, y, num);
      }
    });
  }

  getReceiversOfChannel(channel) {
    const receivers = [];
    this.each((cell, x, y) => {
      if (cell.properties.channel === channel && cell.name === 'receiver') {
        receivers.push({
          x: x,
          y: y
        });
      }
    });
    return receivers;
  }

  getTransmittersOfChannel(channel) {
    const transmitters = [];
    this.each((cell, x, y) => {
      if (cell.properties.channel === channel && cell.name === 'transmitter') {
        transmitters.push({
          x: x,
          y: y
        });
      }
    });
    return transmitters;
  }

  clear() {
    this.each((_, x, y) => {
      this.set(x, y, new components.empty());
    });
  }

  serialize() {
    const data = {
      title: '',
      cells: []
    };

    this.each((cell, x, y) => {
      const constructor = cell.constructor;
      if (constructor !== components.empty) {
        const normal = new constructor(cell.x, cell.y);
        cell.board = null;
        cell.on = false;

        let cellData = {
          x: cell.x,
          y: cell.y,
          name: cell.name
        };


        if (!objectsAreEqual(normal, cell)) {
          cellData = JSON.parse(cell.serialize());
        }

        data.cells.push(cellData);
      }
    });

    return JSON.stringify(data);
  }

  deserialize(dataString) {
    this.clear();

    const data = JSON.parse(dataString);

    data.cells.map((cell) => {
      const constructor = getComponent(cell.name);
      const normal = new constructor(cell.x, cell.y);

      for (var key in cell) {
        if (cell.hasOwnProperty(key)) {
          normal[key] = cell[key];
        }
      }

      this.set(normal.x, normal.y, normal);

      return undefined;
    });

    return undefined;
  }
}
