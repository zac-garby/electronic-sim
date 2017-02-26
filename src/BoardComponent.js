import React, { Component } from 'react';

export default class Board extends Component {
  render() {
    const data = this.props.app.state.board.cells;

    return (
      <div>
        <table>
          <tbody>
            {data.map((row, y) => {
              return (
                <tr key={y}>
                  {row.map((cell, x) => {
                    const pos = this.props.app.state.selectedCoords;
                    const selected = pos.x === x && pos.y === y;
                    const td = cell.makeTableCell(x, selected, (evt) => {
                      this.props.app.setState({
                        selectedCoords: {
                          x: x,
                          y: y
                        }
                      });
                    });
                    return td;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
