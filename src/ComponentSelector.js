import React, { Component } from 'react';

import {
  CWire, HWire,
  Light, RDiode,
  Source, VWire,
  Empty, LDiode,
  UDiode, DDiode,
  Oscillator, RandomSource,
  Transmitter, Receiver
} from './components/AllComponents';

export default class ComponentSelector extends Component {
  constructor() {
    super();

    this.components = {
      'Power': [
        Source,
        Oscillator,
        RandomSource
      ],
      'Conduction': [
        CWire,
        HWire,
        VWire,
        RDiode,
        LDiode,
        UDiode,
        DDiode
      ],
      'Wireless': [
        Transmitter,
        Receiver
      ],
      'Output': [
        Light
      ]
    };
  }

  render() {
    return (
      <div className="comp-selector">
        <div className="title">
          Components
        </div>
        <div className="clear" onClick={() => {
          const board = this.props.app.state.board;
          const pos = this.props.app.state.selectedCoords;

          board.set(pos.x, pos.y, new Empty());
          this.props.app.setState({board: board});
        }}>
          <i className="fa fa-times" aria-hidden="true" /> Clear cell
        </div>
        <div>
          {Object.keys(this.components).map((key, index) => {
            const set = this.components[key];

            return (
              <div key={index}>
                <div className="subtitle">
                  {key}
                </div>
                {set.map((comp, index) => {
                  const instance = new comp(null, null);
                  return (
                    <div key={index} className="comp" onClick={() => {
                      const board = this.props.app.state.board;
                      const pos = this.props.app.state.selectedCoords;

                      board.set(pos.x, pos.y, instance);
                      this.props.app.setState({board: board});

                      if (this.props.app.state.simulating) {
                        this.props.app.step();
                      }
                    }}>
                      {instance.char} <span className="name">{instance.name}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
