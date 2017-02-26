export default class Board {
  constructor(cells, app) {
    this.cells = cells;
    this.app = app;
  }

  set(x, y, cell) {
    cell.x = x;
    cell.y = y;
    this.cells[y][x] = cell;
  }

  get(x, y) {
    return this.cells[y][x];
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

  contains(x, y) {
    return x >= 0 && y >= 0 && x < this.cells[0].length && y < this.cells.length;
  }

  simulate(x, y, num) {
    if (!this.contains(x, y)) return;
    this.get(x, y).simulate({x: -1, y: -1}, this, num);
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
}
