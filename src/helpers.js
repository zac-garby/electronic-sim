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

export { Direction }
