//	Holds the current state of the board
let board = [];

//	Function called to reset the board
let ResetBoard = () => {

	//	Create a new board
	let temp = [
		[ '', '', '' ],
		[ '', '', '' ],
		[ '', '', '' ],
	]

	//	Update board state
	UpdateBoard(temp);

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
			let index = (y * 3) + x;

			//	Update box element at this position
			boxes[index].textContent = board[x][y];

		}

	}

}

//	Subscribe to events
document.addEventListener('DOMContentLoaded', ResetBoard);