import React, { Component } from 'react';

export default class Controls extends Component {
  renderPlayButton(app) {
    const className = app.state.simulating ? 'selected' : '';

    return (
      <button className={className} onClick={app.startSimulating.bind(app)}>
        <i className="fa fa-play" />
      </button>
    );
  }

  renderPauseButton(app) {
    const className = app.state.simulating ? '' : 'selected';

    return (
      <button className={className} onClick={app.stopSimulating.bind(app)}>
        <i className="fa fa-pause" />
      </button>
    );
  }

  renderStepButton(app) {
    return (
      <button onClick={app.step.bind(app)}>
        <i className="fa fa-step-forward" />
      </button>
    );
  }

  render() {
    const app = this.props.app;

    return (
      <div className="sim-controls">
        {this.renderPlayButton(app)}
        {this.renderPauseButton(app)}
        {this.renderStepButton(app)}
      </div>
    );
  }
}
