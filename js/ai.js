//	Hold the max number of iterations
let maxIterations = 5;

//	Function called to calculate the best move
let CalculateBestMove = (curBoard, curMoves, player, curRound) => {

	//	Check if the current move will result in a win
	let curPlayerWin = CheckWin(curBoard, curMoves, player, curRound);
	let prevPlayerWin = CheckWin(curBoard, curMoves, player == 'X' ? 'O' : 'X', curRound);

	//	If this board is a win for the ai
	if ((curPlayerWin && player == 'O') || (prevPlayerWin && player == 'X')) return [ [], 1 / (curRound - round) ];

	//	If this board is a win for the player
	if ((curPlayerWin && player == 'X') || (prevPlayerWin && player == 'O')) return [ [], -1 / (curRound - round) ];

	//	If this is the end of the iterative depth
	if (curRound >= round + maxIterations) return [ [], 0 ];

	//	Declare best move
	let max = -Infinity;
	let move = [];
	let score = 0;

	//	Go through the board and generate possible moves
	for (let x = 0; x < curBoard.length; x++) {

		//	Loop through each row
		for (let y = 0; y < curBoard[x].length; y++) {

			//	If this box isnt empty then skip
			if (curBoard[x][y] !== '.') continue;

			//	Declare temporary board and moves list
			let tempBoard = JSON.parse(JSON.stringify(curBoard));
			let tempMoves = JSON.parse(JSON.stringify(curMoves));

			//	Generate board and moves list if this move was performed
			tempBoard[x][y] = player;
			tempMoves[player].push([ x, y ]);

			//	If this is an empty box then predict the score for this move
			let res = CalculateBestMove(tempBoard, tempMoves, player == 'X' ? 'O' : 'X', curRound + 1)[1];
			score += res / (curRound - round);

			//	If this is a new max then set it as the best move
			if (res > max) {

				//	Set best move as this
				max = res;
				move = [ x, y ];

			}

		}

	}

	//	Return nothing
	return [ move, score ];

}