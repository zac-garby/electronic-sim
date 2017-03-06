import Component from './Component';
import React from 'react';

import { renderBooleanSetting } from '../helpers';

export default class NumStore extends Component {
  constructor(x, y) {
    super(x, y, {
      char: 'b',
      name: 'boolstore',
      category: 'storage',
      hasSettings: true,
      offClass: 'pink',
      properties: {
        value: false,
        store: true
      }
    });
  }

  renderInspectorSettings(app) {
    return (
      <div>
        {renderBooleanSetting(app, this.properties, 'value')}
      </div>
    );
  }
}
