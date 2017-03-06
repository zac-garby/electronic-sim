/*
 * After making a component,
 * import it into this file ...
 */

import Empty from './Empty';

import Source from './Source';
import Oscillator from './Oscillator';
import RandomSource from './RandomSource';

import CWire from './CWire';
import HWire from './HWire';
import VWire from './VWire';
import LDiode from './LDiode';
import RDiode from './RDiode';
import UDiode from './UDiode';
import DDiode from './DDiode';

import Transmitter from './Transmitter';
import Receiver from './Receiver';

import Light from './Light';

import Microcontroller from './Microcontroller';

import AndGate from './AndGate';
import OrGate from './OrGate';
import NotGate from './NotGate';

import NumStore from './NumStore';
import StringStore from './StringStore';
import BoolStore from './BoolStore';
import ObjectStore from './ObjectStore';


/*
 * ... add it here ...
 */

const components = {
  empty: Empty,

  power: {
    source: Source,
    oscillator: Oscillator,
    randomsource: RandomSource
  },

  conduction: {
    cwire: CWire,
    hwire: HWire,
    vwire: VWire,
    ldiode: LDiode,
    rdiode: RDiode,
    udiode: UDiode,
    ddiode: DDiode,
  },

  output: {
    light: Light
  },

  wireless: {
    transmitter: Transmitter,
    receiver: Receiver
  },

  control: {
    microcontroller: Microcontroller,
    and: AndGate,
    or: OrGate,
    not: NotGate,
  },

  storage: {
    numstore: NumStore,
    stringstore: StringStore,
    boolstore: BoolStore,
    objstore: ObjectStore
  }
};

export default components;
