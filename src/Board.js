import components from './components/AllComponents';

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
    const data = this.map((cell) => {
      if (cell.name === 'none') {
        return '';
      } else {
        return cell.serialize();
      }
    });

    return JSON.stringify(data);
  }

  deserialize(dataString) {
    const data = JSON.parse(dataString);

    data.map((row, y) => {
      row.map((cell, x) => {
        let newCell;

        if (cell.length === 0) {
          newCell = new components.empty();
        } else {
          cell = JSON.parse(cell);
          const constructor = components[cell.category][cell.name];
          // console.log(cell.name);
          // console.log(constructor);
          const component = new constructor();

          for (var key in cell) {
            if (cell.hasOwnProperty(key)) {
              component[key] = cell[key];
            }
          }

          newCell = component;
        }

        this.set(x, y, newCell);

        return undefined;
      });

      return undefined;
    });
  }
}
