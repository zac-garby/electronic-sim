import React, { Component } from 'react';

import GoPlaybackPlay from 'react-icons/lib/go/playback-play';
import GoPlaybackPause from 'react-icons/lib/go/playback-pause';
import GoMoveRight from 'react-icons/lib/go/move-right';

export default class Controls extends Component {
  renderPlayButton(app) {
    const className = app.state.simulating ? 'selected' : '';

    return (
      <button className={className} onClick={app.startSimulating.bind(app)}>
        <GoPlaybackPlay />
      </button>
    );
  }

  renderPauseButton(app) {
    const className = app.state.simulating ? '' : 'selected';

    return (
      <button className={className} onClick={app.stopSimulating.bind(app)}>
        <GoPlaybackPause />
      </button>
    );
  }

  renderStepButton(app) {
    return (
      <button onClick={app.step.bind(app)}>
        <GoMoveRight />
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
