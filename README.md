# Challenge 13 - “Minesweeper”

Before we take a break from grid-based challenges, your dastardly dare for this week is to recreate the logic behind the classic Minesweeper game. Given a grid of characters where each X represents a mine and each - represents empty space, the aim is to return a grid where each - is replaced by an integer indicating the number of mines adjacent to that spot (including diagonally).
Rewards:

- five: Points are awarded for a working solution.
- three: Further points are awarded for creating a playable game (i.e. a working GUI).
- two: Further points are awarded for creating more than one difficulty level in your playable game.

Example:

`minesweeper([ "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "X", "X", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "X", ])`

would return:

`[ "0", "0", "0", "0", "0", "2", "2", "1", "0", "0", "X", "X", "1", "0", "0", "2", "2", "1", "1", "1", "0", "0", "0", "1", "X", ]`

## To run

### `npm i`

### `npm start`

## To test

### `npm run test`

or

### `npm run watch`

## Deployed

The app is deployed on Netlify at https://minesweeper-ec.netlify.app/
