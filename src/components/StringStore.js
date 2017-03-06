import Component from './Component';
import React from 'react';

import { renderStringSetting } from '../helpers';

export default class StringStore extends Component {
  constructor(x, y) {
    super(x, y, {
      char: 's',
      name: 'stringstore',
      category: 'storage',
      hasSettings: true,
      offClass: 'pink',
      properties: {
        value: '',
        store: true
      }
    });
  }

  renderInspectorSettings(app) {
    return (
      <div>
        {renderStringSetting(app, this.properties, 'value')}
      </div>
    );
  }
}
