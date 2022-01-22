//	Hold the current round
let round = 0;

//	Function called to end the round
let EndRound = () => {

	//	Check for a win
	if (CheckWin(board, moves, curPlayer)) EndGame(curPlayer);
	else if (round >= 8) EndGame('draw');

	//	Switch current player
	curPlayer = curPlayer == 'X' ? 'O' : 'X';

	//	Unlock board if current player is not ai
	if (curPlayer !== 'O') document.querySelector('.board').classList.remove('locked');
	else {
		
		//	Lock the board
		document.querySelector('.board').classList.add('locked');

		//	Make the AI move
		let bestMove = CalculateBestMove(JSON.parse(JSON.stringify(board)), JSON.parse(JSON.stringify(moves)), curPlayer, round)[0];
		ChooseBox(bestMove[0], bestMove[1]);

	}

	//	Update current player graphics
	document.querySelector('.scoreboard .active').classList.remove('active');
	document.querySelector(`.scoreboard .${curPlayer == 'X' ? 'left' : 'right'}`).classList.add('active');

	//	Increment round
	round++;

}

//	Function called when a player wins
let EndGame = (winner) => {

	//	If not a draw then increment the winners score
	if (winner !== 'draw') score[winner == 'X' ? 0 : 1] += 1

	//	Set starting player as loser
	curPlayer = winner == 'draw' ? winner == 'X' ? 'O' : 'X' : Math.round(Math.random()) == 0 ? 'O' : 'X';

	//	Lock board if current player is ai
	if (curPlayer == 'O') document.querySelector('.board').classList.add('locked');
	else document.querySelector('.board').classList.remove('locked');

	//	Update current player graphics
	document.querySelector('.scoreboard .active').classList.remove('active');
	document.querySelector(`.scoreboard .${curPlayer == 'X' ? 'left' : 'right'}`).classList.add('active');

	//	Reset board
	ResetBoard();

}