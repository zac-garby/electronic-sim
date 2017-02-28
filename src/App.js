import React, { Component } from 'react';

import BoardComponent from './BoardComponent';
import InspectorPanel from './InspectorPanel';
import Controls from './Controls';
import ComponentSelector from './ComponentSelector';

import Board from './Board';
import { Empty, HWire, Light, Oscillator, RDiode, Source } from './components/AllComponents';

class App extends Component {
  constructor() {
    super();

    this.state = {
      board: new Board(this.initialiseCells(16, 16), this),
      selectedCoords: { x: 2, y: 2 },
      stepCount: 0,
      simulating: false,
      channels: {
        test: true
      }
    };

    /* Set up an initial board */
    this.state.board.set(2, 2, new Source());
    this.state.board.set(3, 2, new HWire());
    this.state.board.set(4, 2, new RDiode());
    this.state.board.set(5, 2, new HWire());
    this.state.board.set(6, 2, new Light());

    this.state.board.set(2, 4, new Oscillator());
    this.state.board.set(3, 4, new HWire());
    this.state.board.set(4, 4, new RDiode());
    this.state.board.set(5, 4, new HWire());
    this.state.board.set(6, 4, new Light());
  }

  componentDidMount() {
    this.step();

    this.startSimulating();
  }

  componentWillUnmount() {
    window.clearInterval(this.stepTimer);
  }

  startSimulating() {
    this.setState({ simulating: true });
    this.stepTimer = window.setInterval(() => {
      this.step();
    }, 250);
  }

  stopSimulating() {
    this.setState({ simulating: false });
    window.clearInterval(this.stepTimer);
  }

  step() {
    this.state.board.step(this.state.stepCount);

    const stepCount = this.state.stepCount;
    this.setState({
      stepCount: stepCount + 1
    });
  }

  stepAndPause() {
    this.step();
    this.stopSimulating();
  }

  get selectedCell() {
    return this.state.board.get(
      this.state.selectedCoords.x,
      this.state.selectedCoords.y
    );
  }

  initialiseCells(width, height) {
    let cells = [];

    for (var i = 0; i < height; i++) {
      let row = [];
      for (var j = 0; j < width; j++) {
        row.push(new Empty(i, j));
      }
      cells.push(row);
    }

    return cells;
  }

  render() {
    return (
      <div className="App">
        <span className="step-count">
          tick #{this.state.stepCount} @ 4/sec
        </span>

        <div className="left">
          <div className="wrapper">
            <BoardComponent app={this} />
          </div>
          <div className="wrapper">
            <Controls app={this} />
          </div>
          <div className="wrapper">
            <InspectorPanel app={this} />
          </div>
        </div>

        <div className="right">
          <div className="wrapper">
            <ComponentSelector app={this} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
