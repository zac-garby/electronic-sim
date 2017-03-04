# Electronic Simulation
![Screenshot](img/screenshot.png)

## About
Electronic Simulation (I haven't thought of a good name yet) is a basic web-based
simulation of not-quite electronics.

By default, there are 20+ components:

 - Sources
 - Oscillators
 - Random Sources
 - Wires
 - Diodes
 - Wireless transmitters/receivers
 - Lights
 - Micro-controllers
 - Logic gates
 - Etc..

## Getting started:
Run the following commands (You'll need to install NodeJS beforehand):

```
git clone https://github.com/Zac-Garby/electronic-sim
cd electronic-sim
npm install
npm start
```

Or, you can just go to [this url](https://zac-garby.github.io/electronic-sim/)
to try it out instantly, however it won't necessarily be completely up to date,
as I only update it every 15 commits or so.

## TODO:
 - [ ] Clean code up a bit
 - [ ] Organise CSS into separate files
 - [ ] Add help page
 - [ ] Change favicon
 - [x] Add more components:
  - [x] Random power source (`%`)
  - [x] Logic gates (and, or, not)
  - [x] Micro-controllers
  - [x] Add wireless connections
 - [ ] Make component-list groups drop-downs
 - [x] Remove radix warnings from the oscillator class
 - [x] Have multiple choosable colours for the light
 - [ ] Add testing
 - [x] Add syntax highlighting into the micro-controller script editor
 - [x] Add error reporting to micro-controllers
 - [x] Add data stores (numeric, string, object, boolean) for use with micro-controllers
