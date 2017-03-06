import React, { Component } from 'react';

import GoX from 'react-icons/lib/go/x';

import components from './components/AllComponents';

export default class ComponentSelector extends Component {
  render() {
    return (
      <div className="comp-selector">
        <div className="clear" onClick={() => {
          const board = this.props.app.state.board;
          const pos = this.props.app.state.selectedCoords;

          board.set(pos.x, pos.y, new components.empty());
          this.props.app.setState({board: board});
        }}>
          <GoX /> Clear cell
        </div>
        <div>
          {Object.keys(components).map((key, index) => {
            if (index === 0) {
              return null;
            } else {
              const set = components[key];

              return (
                <div key={index}>
                  <div className="subtitle">
                    {key}
                  </div>
                  {Object.keys(set).map((key, index) => {
                    const comp = set[key], instance = new comp(null, null);
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
            }
          })}
        </div>
      </div>
    );
  }
}
