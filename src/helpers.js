import React from 'react';

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
      <span style={{fontWeight: 'bold'}}>{property}</span>: {properties[property]}{unit}
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
      <span style={{fontWeight: 'bold'}}>{property}</span>
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
      <span style={{fontWeight: 'bold'}}>{property}</span>
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
      <span style={{fontWeight: 'bold'}}>{property}</span>:
      <textarea className="script" defaultValue={properties[property]}
        id={property} cols="25" onBlur={(evt) => {
          properties[property] = evt.target.value;
          evt.target.innerHTML = evt.target.value;
          app.forceUpdate();
        }} onKeyDown={function(evt) { // This callback enables tab entering
          const keyCode = evt.keyCode;

          if (keyCode === 9) {
            evt.preventDefault();
            const v = evt.target.value,
              s = evt.target.selectionStart,
              e = evt.target.selectionEnd;

            evt.target.value = v.substring(0, s) + '\t' + v.substring(e);
            evt.target.selectionStart = evt.target.selectionEnd = s + 1;
            return false;
          }
        }} />
    </div>
  );
}

export {
  Direction, renderRangeSetting, renderColourSetting,
  renderBooleanSetting, renderStringSetting,
  renderScriptSetting
}