const root = document.getElementById('root');

const renderCell = ({
	value,
	index,
	state
}) => {
	const cell = document.createElement('div')
	cell.style.backgroundColor = '#218032'
	cell.style.borderColor = 'blac'
	cell.style.display = 'block'
	cell.style.borderStyle = 'solid'
	cell.marginTop = '2px'
	cell.marginBottom = '2px'
	cell.marginRight = '2px'
	cell.marginLeft = '2px'
	cell.style.width='100%'
	cell.style.height='33px'
	const piece = document.createElement('button')
	piece.style.borderRadius = '100px'
	piece.style.width = '100%'
	piece.style.height = '100%'
	if(value===0 || value===2){
		piece.style.backgroundColor = '#218032'
	}
	else if(value===1){
		piece.style.backgroundColor = 'white'
	}
	else if(value===-1){
		piece.style.backgroundColor = 'black'
	}

	piece.onclick = () => {
		if(value===2){
			state.board[index[0]][index[1]] = (state.turn) ? 1 : -1;
			let control = 1;
			let boolcontrol = (index[0]+control>0 && index[0]+control<8) ? true : false;
			while(boolcontrol && state.board[index[0]+control][index[1]]!=state.board[index[0]][index[1]] && state.board[index[0]+control][index[1]]!=0 && state.board[index[0]+control][index[1]]!=2){
				state.board[index[0]+control][index[1]] = state.board[index[0]][index[1]]
				if (index[0]+control+1>=0 && index[0]+control+1<8){
					control = control + 1
				}
				else{
					boolcontrol = false;
				}
			}
			control = 1;
			boolcontrol = (index[0]-control>0 && index[0]-control<8) ? true : false;
			while(boolcontrol && state.board[index[0]-control][index[1]]!=state.board[index[0]][index[1]] && state.board[index[0]-control][index[1]]!=0 && state.board[index[0]-control][index[1]]!=2){
				state.board[index[0]-control][index[1]] = state.board[index[0]][index[1]]
				if (index[0]-control+1>=0 && index[0]-control+1<8){
					control = control + 1
				}
				else{
					boolcontrol = false;
				}
			}
			control = 1;
			boolcontrol = (index[1]+control>0 && index[1]+control<8) ? true : false;
			console.log(state.board[index[0]])
			while(boolcontrol && state.board[index[0]][index[1]+control]!=state.board[index[0]][index[1]] && state.board[index[0]][index[1]+control]!=0 && state.board[index[0]][index[1]+control]!=2){
				state.board[index[0]][index[1]+control] = state.board[index[0]][index[1]]
				if (index[1]+control+1>=0 && index[1]+control+1<8){
					control = control + 1
				}
				else{
					boolcontrol = false;
				}
			}
			control = 1;
			boolcontrol = (index[1]-control>0 && index[1]-control<8) ? true : false;
			while(boolcontrol && state.board[index[0]][index[1]-control]!=state.board[index[0]][index[1]] && state.board[index[0]][index[1]-control]!=0 && state.board[index[0]][index[1]-control]!=2){
				state.board[index[0]][index[1]-control] = state.board[index[0]][index[1]]
				if (index[1]-control+1>=0 && index[1]-control+1<8){
					control = control + 1
				}
				else{
					boolcontrol = false;
				}
			}
			if(index[0]+1>=0 && index[0]+1<8){
				state.board[index[0]+1][index[1]] = (state.board[index[0]+1][index[1]]==0 && state.board[index[0]+1][index[1]]!=1 && state.board[index[0]+1][index[1]]!=-1) ? 2 : state.board[index[0]+1][index[1]];
			}				
			if(index[0]-1>=0 && index[0]-1<8){
				state.board[index[0]-1][index[1]] = (state.board[index[0]-1][index[1]]==0 && state.board[index[0]-1][index[1]]!=1 && state.board[index[0]-1][index[1]]!=-1) ? 2 : state.board[index[0]-1][index[1]];	
			}
			if(index[1]+1>=0 && index[1]+1<8){
				state.board[index[0]][index[1]+1] = (state.board[index[0]][index[1]+1]==0 && state.board[index[0]][index[1]+1]!=1 && state.board[index[0]][index[1]+1]!=-1) ? 2 : state.board[index[0]][index[1]+1];	
			}
			if(index[1]-1>=0 && index[1]-1<8){
				state.board[index[0]][index[1]-1] = (state.board[index[0]][index[1]-1]==0 && state.board[index[0]][index[1]-1]!=1 && state.board[index[0]][index[1]-1]!=-1) ? 2 : state.board[index[0]][index[1]-1];	
			}
			state.turn = !state.turn;
			root.innerHTML = '';
        	render(root, state);
		}
	};
	cell.appendChild(piece)
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
			state: state
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
			[0,0,0,2,2,0,0,0],
			[0,0,2,1,-1,2,0,0],
			[0,0,2,-1,1,2,0,0],
			[0,0,0,2,2,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]
		]
};

render(root,state);
