import React from 'react';

import './styles/InspectorSettings.css';

import '../node_modules/codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import CodeMirror from 'react-codemirror';

const Direction = {
  UP:    { x: 0,  y: -1  },
  DOWN:  { x: 0,  y: 1 },
  LEFT:  { x: -1, y: 0  },
  RIGHT: { x: 1,  y: 0  },
  ALL: [
    { x: 0,  y: -1  },
    { x: 0,  y: 1 },
    { x: -1, y: 0  },
    { x: 1,  y: 0  }
  ],
  NONE: []
};

function renderRangeSetting(app, properties, property, min=1, max=100, step=1, unit='') {
  return (
    <div>
      <span className="key">{property}</span>: {properties[property]}{unit}
      <input type="range" min={min} max={max} step={step}
        value={properties[property]} onChange={(evt) => {
          properties[property] = parseInt(evt.target.value, 10);
          app.forceUpdate();
      }} />
    </div>
  )
}

function renderColourSetting(app, properties, property, colours) {
  return (
    <div style={{textAlign: 'center'}}>
      <div className="colours">
        {colours.map((colour, index) => {
          const className = `colour bg-${colour} ${
            colour === properties[property] ? 'selected' : ''
          }`;

          return (
            <div className={className} key={index} onClick={(evt) => {
              properties[property] = colour;
              app.forceUpdate();
            }}></div>
          );
        })}
      </div>
    </div>
  );
}

function renderBooleanSetting(app, properties, property) {
  return (
    <div>
      <span className="key">{property}</span>:
      <input type="checkbox" checked={properties[property]} onChange={() => {
        properties[property] = !properties[property];
        app.forceUpdate();
      }}/>
    </div>
  );
}

function renderStringSetting(app, properties, property) {
  return (
    <div>
      <span className="key">{property}</span>:
      <input type="text" value={properties[property]} onChange={(evt) => {
        properties[property] = evt.target.value;
        app.forceUpdate();
      }} />
    </div>
  );
}

function renderScriptSetting(app, properties, property) {
  return (
    <div>
      <span className="key">{property}</span>:
      <CodeMirror options={{mode: 'javascript'}} value={properties[property]}
        onChange={(evt) => {
          if (app.state.simulating) {
            app.stopSimulating();
          }
          properties[property] = evt;
          app.forceUpdate();
        }} />
    </div>
  );
}

function renderNumberSetting(app, properties, property) {
  return (
    <div>
      <span className="key">{property}</span>:
      <input type="number" value={properties[property]} onChange={(evt) => {
        properties[property] = parseFloat(evt.target.value);
        app.forceUpdate();
      }} />
    </div>
  );
}

function renderObjectSetting(app, properties, property) {
  const obj = properties[property];

  function addKey(type) {
    const key = prompt('What do you want to name your new item?');
    properties.value[key] = type === 'string' ? '' : type === 'number' ? 0 : false;
    app.forceUpdate();
  }

  return (
    <div>
      <span className="key">{property}:</span>
      <div className="obj-props">
        {Object.keys(obj).map((key, index) => {
          const type = typeof obj[key];

          return (
            <div key={index} className="obj-prop">
              {
                type === 'number' ? renderNumberSetting(app, obj, key) :
                type === 'string' ? renderStringSetting(app, obj, key) :
                type === 'boolean' ? renderBooleanSetting(app, obj, key) :
                (<span>Invalid type: {type}</span>)
              }
            </div>
          )
        })}
      </div>
      <div>
        <button className="new-key-btn" onClick={() => {addKey('string')}}>
          Add string...
        </button>

        <button className="new-key-btn" onClick={() => {addKey('number')}}>
          Add number...
        </button>

        <button className="new-key-btn" onClick={() => {addKey('boolean')}}>
          Add boolean...
        </button>
      </div>
    </div>
  );
}

export {
  Direction, renderRangeSetting, renderColourSetting,
  renderBooleanSetting, renderStringSetting,
  renderScriptSetting, renderNumberSetting,
  renderObjectSetting
}
