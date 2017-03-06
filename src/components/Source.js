import React from 'react';

import Component from './Component';
import { Direction, renderBooleanSetting } from '../helpers';

export default class Source extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '@',
      name: 'source',
      category: 'power',
      conductDirections: Direction.ALL,
      receiveDirections: Direction.NONE,
      initialPower: true,
      hasSettings: true
    });
  }

  renderInspectorSettings(app) {
    return (
      <div>
        {renderBooleanSetting(app, this, 'initialPower')}
      </div>
    );
  }
}
