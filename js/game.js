//	Hold the current round
let round = 0;

//	Hold winner
let winner = 'draw';

//	Function called to end the round
let EndRound = () => {

	//	Check for a win
	if (CheckWin(board, moves, curPlayer)) EndGame(curPlayer);
	else if (CheckWin(board, moves, curPlayer == 'X' ? 'O' : 'X')) EndGame(curPlayer == 'X' ? 'O' : 'X');
	else if (round >= 8) EndGame('draw');
	else {

		//	Increment round
		round++;

		//	Switch current player
		curPlayer = curPlayer == 'X' ? 'O' : 'X';

		//	Update current player graphics
		document.querySelector('.scoreboard .active').classList.remove('active');
		document.querySelector(`.scoreboard .${curPlayer == 'X' ? 'left' : 'right'}`).classList.add('active');

		//	Unlock board if current player is not ai
		if (curPlayer !== 'O') document.querySelector('.board').classList.remove('locked');
		else {
			
			//	Lock the board
			document.querySelector('.board').classList.add('locked');

			//	Make the AI move
			let bestMove = CalculateBestMove(JSON.parse(JSON.stringify(board)), JSON.parse(JSON.stringify(moves)), curPlayer, round)[0];
			ChooseBox(bestMove[0], bestMove[1]);

		}

	}

}

//	Function called when a player wins
let EndGame = (w = 'draw') => {

	//	Update winner variable
	winner = w;

	//	If not a draw then increment the winners score
	if (winner !== 'draw') score[winner == 'X' ? 0 : 1] += 1

	//	Reset board
	ResetBoard();

}