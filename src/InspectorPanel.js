import React, { Component } from 'react';

export default class InspectorPanel extends Component {
  render() {
    const
      app = this.props.app,
      cell = app.selectedCell,
      name = cell.name,
      x = app.selectedCell.x + 1,
      y = app.selectedCell.y + 1,
      formattedName = (
        <span className={`${cell.on ? 'green' : 'red'}`}>
          {name}
        </span>
      );

    return (
      <div className="inspector">
        <h1>{formattedName} <span className="right">at ({x}, {y})</span></h1>
        <br />
        id: <input value={cell.id} onChange={(evt) => {
          this.cell.id = evt.target.value;
          app.forceUpdate();
        }} />

        {cell.hasSettings &&
        <div>
          <hr />
          {cell.renderInspectorSettings(this.props.app)}
        </div>}
      </div>
    );
  }
}
