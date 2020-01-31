import React from 'react';
import ReactDOM from 'react-dom';
const root = document.getElementById('root');



const render = (root, state) =>{
	const board = document.createElement('div');
	board.style.backgroundColor = 'green'
	board.style.width = '100%';
	board.style.padding = '10px';
	root.appendChild(board);
};


const state = {
	turn: true,
	board: [[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,1,-1,0,0,0],
			[0,0,0,1,-1,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]
		]
};

render(root,state);
