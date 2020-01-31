import React from 'react';
import ReactDOM from 'react-dom';
const root = document.getElementById('root');

const renderCell = ({
	value,
	index,
	turn
}) => {
	const cell = document.createElement('div')
	cell.style.backgroundColor = '#218032'
	cell.style.borderColor = '#1c4724'
	cell.style.width='30px'
	cell.style.height = '30px'
	return cell

}

const render = (root, state) =>{
	const board = document.createElement('div');
	board.style.backgroundColor = 'green'
	board.style.width = '100%';
	board.style.padding = '10px';
	
	state.board.map((row, irow) =>
		row.map((column,icolumn) => renderCell({
			value: column,
			index: [irow,icolumn],
			turn: state.turn
		}))).map(my_row =>{	
			const curr_row = document.createElement('div')
			curr_row.style.display = 'flex'
			my_row.forEach(
				cell => curr_row.appendChild(cell),
			)
			board.appendChild(curr_row)
	});
	root.appendChild(board);
};


const state = {
	turn: true,
	board: [[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,1,-1,0,0,0],
			[0,0,0,-1,1,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]
		]
};

render(root,state);
