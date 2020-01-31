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
		const { board } = state;
		if(value===2){
			board[index[0]][index[1]] = (state.turn) ? 1 : -1;
			let control = 1;
			let boolcontrol = (index[0]+control>0 && index[0]+control<8) ? true : false;
			while(boolcontrol && board[index[0]+control][index[1]]!=board[index[0]][index[1]] && board[index[0]+control][index[1]]!=0 && board[index[0]+control][index[1]]!=2){
				board[index[0]+control][index[1]] = board[index[0]][index[1]]
				if (index[0]+control+1>=0 && index[0]+control+1<8){
					control = control + 1
				}
				else{
					boolcontrol = false;
				}
			}
			control = 1;
			boolcontrol = (index[1]+control>0 && index[1]+control<8) ? true : false;
			while(boolcontrol && board[index[0]][index[1]+control]!=board[index[0]][index[1]] && board[index[0]][index[1]+control]!=0 && board[index[0]][index[1]+control]!=2){
				board[index[0]][index[1]+control] = board[index[0]][index[1]]
				if (index[1]+control+1>=0 && index[1]+control+1<8){
					control = control + 1
				}
				else{
					boolcontrol = false;
				}
			}
			control = 1;
			boolcontrol = (index[1]-control>0 && index[1]-control<8) ? true : false;
			while(boolcontrol && board[index[0]][index[1]-control]!=board[index[0]][index[1]] && board[index[0]][index[1]-control]!=0 && board[index[0]][index[1]-control]!=2){
				board[index[0]][index[1]-control] = board[index[0]][index[1]]
				if (index[1]-control+1>=0 && index[1]-control+1<8){
					control = control + 1
				}
				else{
					boolcontrol = false;
				}
			}
			try{
				control = 1;
				boolcontrol = (index[0]-control>=0 && index[0]-control<8) ? true : false;
				while(boolcontrol && board[index[0]-control][index[1]]!=board[index[0]][index[1]] && board[index[0]-control][index[1]]!=0 && board[index[0]-control][index[1]]!=2){
					board[index[0]-control][index[1]] = board[index[0]][index[1]]
					if (index[0]-control+1>=0 && index[0]-control+1<8){
						control = control + 1
					}
					else{
						boolcontrol = false;
					}
				}
			}
			catch(error){
				console.log(error);
			}
			
			if(index[0]+1>=0 && index[0]+1<8){
				board[index[0]+1][index[1]] = (board[index[0]+1][index[1]]==0 && board[index[0]+1][index[1]]!=1 && board[index[0]+1][index[1]]!=-1) ? 2 : board[index[0]+1][index[1]];
			}				
			if(index[0]-1>=0 && index[0]-1<8){
				board[index[0]-1][index[1]] = (board[index[0]-1][index[1]]==0 && board[index[0]-1][index[1]]!=1 && board[index[0]-1][index[1]]!=-1) ? 2 : board[index[0]-1][index[1]];	
			}
			if(index[1]+1>=0 && index[1]+1<8){
				board[index[0]][index[1]+1] = (board[index[0]][index[1]+1]==0 && board[index[0]][index[1]+1]!=1 && board[index[0]][index[1]+1]!=-1) ? 2 : board[index[0]][index[1]+1];	
			}
			if(index[1]-1>=0 && index[1]-1<8){
				board[index[0]][index[1]-1] = (board[index[0]][index[1]-1]==0 && board[index[0]][index[1]-1]!=1 && board[index[0]][index[1]-1]!=-1) ? 2 : board[index[0]][index[1]-1];	
			}
			state.turn = !state.turn;
			let whites = 0;
			let blacks = 0;
			let end_of_game = 0;
			board.map((row,irow) => {
				row.map((column,icolumn) => {
					if(column==1){
						whites = whites + 1;
					}
					else if(column==-1){
						blacks = blacks + 1;
					}
					else if(column==2){
						end_of_game = end_of_game + 1;
					}
				})
			})
			let message = '';
			if(end_of_game==0){
				message = (whites>0) ? 'WHTE HAVE WON' : 'BLACK HAVE WON'
				state = {
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
				alert(message)
			}
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

	const tittle = 'OTHELLO'
	const header_tittle = document.createElement('div',{tittle}	);
	header_tittle.style.backgroundColor = 'black'
	header_tittle.style.color = 'white'
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
