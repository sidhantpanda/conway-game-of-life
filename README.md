# Conway's Game of Life CLI
Command line version of the [zero player game](https://en.wikipedia.org/wiki/Zero-player_game?oldformat=true). Wiki page here: 
https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

Some context about this here: https://medium.com/@sidhantpanda/conways-game-of-life-explained-with-some-programming-a2970b468580

![Terminal preview](https://media.giphy.com/media/2UnJcfVZTkXJHAFtLk/giphy.gif)

## Setup
1. Clone this repo
2. Install dependencies: `npm install` or `yarn install`.
3. Run `npm start [rows][columns]`

## Samples
I've included 3 samples for fun These are:
* Blinker 

  ![Blinker configuration](https://media.giphy.com/media/5b9eg7UOynODtk3DBw/200w_d.gif)
  
  `node samples/blinker.js`
* Beacon

  ![Beacon configuration](https://media.giphy.com/media/93fK5oVEGTRBUl2Jeu/200w_d.gif)
  
  `node samples/beacon.js`
* Glider
  
  ![Glider configuration](https://media.giphy.com/media/9FW6lSM6SyhrxMNv2Z/giphy.gif)
  
  `node samples/glider.js`

### Options
This is currently still under development for options. Currently user can only configure number of rows and columns:

  `node index.js 20 16`

will start the game with 20 rows and 16 columns
