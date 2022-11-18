# Tic-Tac-Toe DOM

In this practice, I created a well-designed HTML+CSS+JS browser-based
application [Tic-Tac-Toe][tic-tac-toe].

## Set up

Run `node app.js` from the base directory to start the server which will serve
the static assets. Navigate to [http://localhost:5001] in your
browser to see the **public/index.html** file rendered.

## Background and Context

You will find the following files:

- **public/index.html**: The HTML file that has the UI structure
- **public/main.css**: The CSS file that has the style for the UI
- **public/tic-tac-toe.js**: The JavaScript file that the behavior
  to the game.

**Important Note:** Images in the **wireframes** directory was used for guidelines and the expected behavior of completing each phase.

The goal of this practice is to apply everything I've learned about
building a web application using DOM manipulation.

## Phase 1: The UI

The first step to complete a minimum viable product is to
build the front-end for the game. The UI should look like this:

![sketch]

The interface should include the following:

- A heading in which the game will announce a winner when the game ends
  (or a tie if that happens). The heading should be horizontally center aligned.
- A 3x3 grid for the playing surface. You should try to use either the
  _flexbox_ or _grid_ layouts to achieve this.
- Two buttons at the bottom that are , one that reads "New Game" on the
  left, and one that reads "Give Up" on the right. You should try to use either
  _flexbox_ or _grid_ layouts to achieve this.
- The entire UI should be horizontally center aligned in the page.

Apply paddings and margins where necessary to avoid overcrowding of components.
Remember, whitespace positioning is just as important as the actual UI elements'
positioning.

## Phase 2: Tracking Clicks

In this step, track the clicks of the players and fill the grid with the appropriate symbols.

- When the player clicks an empty square, then it is filled with that player's
  symbol.
- When the player clicks a square that already contains a symbol, the game does
  nothing.
- The first click results in an "X". After that, the symbols "O" and "X"
  alternate with each click per the rules of tic-tac-toe.

## Phase 3: Determining Game Status

In this step, determine if a game is won or in a tie state. A
reminder of the logic:

- If a player has any three in a row, then that player wins.
- If a player has any three in a column, then that player wins.
- If a player has either of the diagonals, then that player wins.
- If there is no win _and_ all squares have a player symbol in there, then
  the game is a tie.
- When a player wins the game, then the following happens:
  - The header at the top should read "Winner: X" or "Winner: O" depending on
    which player won.
  - Empty squares in the grid no longer react to clicks.
- When the game goes into a tied state, the header at the top should read
  "Winner: None".

## Phase 4: Refactor

Refactor code. Keep DRY and SRP when organizing code. You may want
to try separating code blocks into functions or try implementing classes. With
any approach you take, a good way to organize your code is by separating game
logic from the UI or HTML element manipulation. That way, you can more easily
debug an error in your code by isolating it as a game logic error or a UI error.

## Phase 5: Creating a New Game

In this step, create the "New Game" button. The button should
behave like so:

- When the game status is not "won" or "tied", then the "New Game" button is
  disabled.
- When the game status is "won" or "tied", then the "New Game" button is
  enabled.
- When a player clicks the "New Game" button, then it
  - clears the game status,
  - clears the header,
  - clears the board, and
  - makes it so the next click of the tic-tac-toe board is an "X"
  - (disables the "New Game" button)

## Phase 6: Giving Up

In this step, make the "Give Up" button work. In the event one
user realized their impending doom, they may want to opt to immediately quit
and start a new game. Here's how it should work:

- When a player clicks the "Give Up" button:
  - Set the status of the game as "won" by the "other" player. That is, if "X"
    is the current player, when that player clicks the "Give Up" button, then
    "O" wins the game.
  - Show the winner status as won by the "other" player.
  - Disable the "Give Up" button.
  - Enable the "New Game" button.
- When a game is ongoing:
  - Enable the 'Give Up" button.

## Phase 7: Saving Game State

In this phase, store the game state using your choice of storage so that when
the user refreshes the page, the game isn't reset. The only way to reset should
be by pressing the "New Game" button.

## BONUS Phase

When you click "New Game", randomly assign the computer as Player X or Player O.
Then, have the computer play automatically in response to its turn.

For example, if you click "New Game" and the computer becomes Player X, then it
will play an "X" on the board. Then, you will play an "O". After you click your
square, the computer will automatically play its "X". And, so on.

If the computer is Player O, then it will play after you play your first "X".

[tic-tac-toe]: https://en.wikipedia.org/wiki/Tic-tac-toe
[sketch]: https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/ui-design.svg
