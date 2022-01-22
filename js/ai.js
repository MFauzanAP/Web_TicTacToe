//	Hold the max number of iterations
let maxIterations = 5;

//	Function called to calculate the best move
let CalculateBestMove = (curBoard, curMoves, player, curRound) => {

	//	If only the first round
	if (curRound == 0) return [ [ Math.floor(Math.random() * 3), Math.floor(Math.random() * 3) ], 0 ]

	//	Check if the current move will result in a win
	let curPlayerWin = CheckWin(curBoard, curMoves, player, curRound);
	let prevPlayerWin = CheckWin(curBoard, curMoves, player == 'X' ? 'O' : 'X', curRound);

	//	If this board is a win for the ai
	if ((curPlayerWin && player == 'O') || (prevPlayerWin && player == 'X')) return [ [], 1 / (curRound - round) ];

	//	If this board is a win for the player
	if ((curPlayerWin && player == 'X') || (prevPlayerWin && player == 'O')) return [ [], -1 / (curRound - round) ];

	//	If this is the end of the iterative depth
	if (curRound >= round + maxIterations || curRound > 8) return [ [], 0 ];

	//	Declare best move
	let max = -Infinity;
	let moves = [];
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
				moves = [ [ x, y ] ];

			}
			else if (res == max) {

				//	Add to list of moves
				moves.push([ x, y ]);

			}

		}

	}

	//	Return nothing
	return [ moves[Math.floor(Math.random() * moves.length)], score ];

}