import React, { Component } from 'react';

import './styles/Error.css';

export default class Errors extends Component {
  render() {
    const errors = this.props.comp.properties.errors;

    if (errors.length === 0) {
      return null;
    }

    return (
      <div className="error-box">
        <h1>Errors:
          <span className="clear" onClick={(evt) => {
            this.props.comp.properties.errors = [];
            this.props.app.forceUpdate();
          }}>
            clear
          </span>
        </h1>
        <div className="body">
          {errors.map((error, index) => {
            return (
              <div key={index} className="error" onClick={(evt) => {
                this.props.comp.properties.errors.splice(index, 1);
                this.props.app.forceUpdate();
              }}>
                <h3>{error.name}</h3>
                {error.message}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
