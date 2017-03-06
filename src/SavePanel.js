import React, { Component } from 'react';

import './styles/SavePanel.css';

export default class SavePanel extends Component {
  constructor() {
    super();

    this.state = {
      data: ''
    };
  }

  render() {
    return (
      <div>
        <button className="btn" onClick={() => {
          this.props.app.state.board.clear();
        }}>Clear board</button>

        <hr />

        <textarea className="file-input" rows={30}
          value={this.state.data} placeholder="Save data" onChange={(evt) => {
            this.setState({
              data: evt.target.value
            });
          }}></textarea>

        <hr />

        <button className="btn" onClick={() => {
          const serial = this.props.app.state.board.serialize();
          this.setState({
            data: serial
          });
        }}>Create save data</button>

        <button className="btn" onClick={() => {
          const data = this.state.data;
          this.props.app.state.board.deserialize(data);
        }}>Load save data</button>
      </div>
    );
  }
}
