import Component from './Component';
import React from 'react';

import { renderObjectSetting } from '../helpers';

export default class NumStore extends Component {
  constructor(x, y) {
    super(x, y, {
      char: 'o',
      name: 'objstore',
      hasSettings: true,
      offClass: 'pink',
      properties: {
        value: {
          x: 'y'
        },
        store: true
      }
    });
  }

  renderInspectorSettings(app) {
    return (
      <div>
        {renderObjectSetting(app, this.properties, 'value')}
      </div>
    );
  }
}
