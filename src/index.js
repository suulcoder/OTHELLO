import React from 'react';
import ReactDOM from 'react-dom';
const root = document.getElementById('root');

const renderCell = ({
	value,
	index,
	turn
}) => {
	const cell = document.createElement('button')
	cell.style.backgroundColor = '#218032'
	cell.style.borderColor = 'blac'
	cell.style.display = 'block'
	cell.style.borderStyle = 'solid'
	cell.marginTop = '2px'
	cell.marginBottom = '2px'
	cell.marginRight = '2px'
	cell.marginLeft = '2px'
	cell.style.width='100%'
	cell.style.height='37px'
	return cell

	

}

const render = (root, state) =>{
	const header = document.createElement('div');
	header.style.backgroundColor='black';
	header.style.width = '100%';
	header.style.height = '120px';

	const header_tittle = document.createElement('h1',null,'OTHELLO');
	header_tittle.style.backgroundColor = 'black'
	header_tittle.style.fontSize = '40px';
	header.appendChild(header_tittle)

	const body = document.createElement('div');
	body.style.backgroundColor = 'black'
	body.style.width = '100%';
	body.style.height = '850px'
	body.style.display = 'flex';
	body.style.justifyContent = 'center';
	body.style.marginTop = '2px';

	const board = document.createElement('div');
	board.style.backgroundColor = 'green'
	board.style.width = '295px';
	board.style.height = '295px';
	board.style.marginTop = '50px';
	
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

	body.appendChild(board);
	root.appendChild(header);
	root.appendChild(body);
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
