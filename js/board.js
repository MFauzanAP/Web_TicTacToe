//	Holds the current state of the board
let board = [];

//	Holds the moves made
let moves = { X: [], O: [] };

//	Hold current score
let score = [ 0, 0 ];

//	Holds current player
let curPlayer = 'X';

//	Hold the current round
let round = 0;

//	Function called to reset the board
let ResetBoard = () => {

	//	Create a new board
	let temp = [
		[ '.', '.', '.' ],
		[ '.', '.', '.' ],
		[ '.', '.', '.' ],
	]

	//	Reset list of moves and round
	moves = { X: [], O: [] };
	round = 0;

	//	Get elements
	let left = document.querySelector('.left .score');
	let right = document.querySelector('.right .score');

	//	Update scoreboard
	left.textContent = score[0] || '-';
	right.textContent = score[1] || '-';

	//	Update board state
	UpdateBoard(temp);

}

//	Function called to choose a box
let ChooseBox = (x, y) => {

	//	If this box is already selected then exit
	if (board[x][y] !== '.') return

	//	Add to list of moves
	moves[curPlayer].push([ x, y ]);

	//	Generate updated board
	board[x][y] = curPlayer;

	//	Update board state
	UpdateBoard(board);

	//	Check for a win
	if (CheckWin()) EndGame(curPlayer);
	else if (round >= 8) EndGame('draw');

	//	Switch current player
	curPlayer = curPlayer == 'X' ? 'O' : 'X';

	//	Increment round
	round++;

}

//	Function called to check for a win
let CheckWin = () => {

	//	If each player still doesn't have 3 boxes yet then exit
	if (round < 4) return false;

	//	Go through each move made by the current player
	for (let i = 0; i < moves[curPlayer].length; i++) {

		//	Get the position at this index
		let pos = moves[curPlayer][i];

		//	Temporary counter variable
		let j = 1;
		let x = pos[0];
		let y = pos[1];

		//	Check for boxes north
		while (x - j >= 0 && j <= 2) {

			//	Get box
			let box = x - j >= 0 ? board[x - j][y] : '';

			//	If this box is empty or not the current players box then break the check
			if (box !== curPlayer) break;

			//	Else if the whole column is for the current player
			else if (box === curPlayer && j == 2) return true;

			//	Else then increment j
			j++;

		}

		//	Reset j
		j = 1;

		//	Check for boxes north east
		while (x - j >= 0 && y + j <= 2 && j <= 2) {

			//	Get box
			let box = x - j >= 0 && y + j <= 2 ? board[x - j][y + j] : '';

			//	If this box is empty or not the current players box then break the check
			if (box !== curPlayer) break;

			//	Else if the whole diagonal is for the current player
			else if (box === curPlayer && j == 2) return true;

			//	Else then increment j
			j++;

		}

		//	Reset j
		j = 1;

		//	Check for boxes east
		while (y + j <= 2 && j <= 2) {

			//	Get box
			let box = y + j <= 2 ? board[x][y + j] : '';

			//	If this box is empty or not the current players box then break the check
			if (box !== curPlayer) break;

			//	Else if the whole row is for the current player
			else if (box === curPlayer && j == 2) return true;

			//	Else then increment j
			j++;

		}

		//	Reset j
		j = 1;

		//	Check for boxes south east
		while (x + j <= 2 && y + j <= 2 && j <= 2) {

			//	Get box
			let box = x + j <= 2 && y + j <= 2 ? board[x + j][y + j] : '';

			//	If this box is empty or not the current players box then break the check
			if (box !== curPlayer) break;

			//	Else if the whole diagonal is for the current player
			else if (box === curPlayer && j == 2) return true;

			//	Else then increment j
			j++;

		}

	}

	//	Return false
	return false;

}

//	Function called when a player wins
let EndGame = (winner) => {

	//	If not a draw then increment the winners score
	if (winner !== 'draw') score[winner == 'X' ? 0 : 1] += 1

	//	Set starting player as loser
	curPlayer = winner == 'draw' ? winner == 'X' ? 'O' : 'X' : curPlayer;

	//	Reset board
	ResetBoard();

}

//	Function called to update board state
let UpdateBoard = (newBoard) => {

	//	Replace the old board with new board
	board = newBoard;

	//	Get a list of all boxes
	let boxes = document.getElementsByClassName('box');

	//	Loop through all the boxes on the board
	for (let x = 0; x < board.length; x++) {

		//	Loop through each row
		for (let y = 0; y < board[x].length; y++) {

			//	Calculate index
			let index = (x * 3) + y;

			//	Update box element at this position if not a .
			boxes[index].textContent = board[x][y] !== '.' ? board[x][y] : '';

		}

	}

}

//	Subscribe to events
document.addEventListener('DOMContentLoaded', ResetBoard);