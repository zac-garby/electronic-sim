import Component from './Component';
import React from 'react';

import { renderNumberSetting } from '../helpers';

export default class NumStore extends Component {
  constructor(x, y) {
    super(x, y, {
      char: 'n',
      name: 'numstore',
      hasSettings: true,
      offClass: 'pink',
      properties: {
        value: 0,
        store: true
      }
    });
  }

  renderInspectorSettings(app) {
    return (
      <div>
        {renderNumberSetting(app, this.properties, 'value')}
      </div>
    );
  }
}
