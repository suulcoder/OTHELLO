/*
	UNIVERSIDAD DEL VALLE DE GUATEMALA
	OTHELLO
	Diseño WEB
	SAÚL CONTRERAS (SUULCODER)

*/
const root = document.getElementById('root');									//root element from html

const renderCell = ({															//design for each cell
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

	piece.onclick = () => {														//logic of the game
		const { board } = state;
		if(value===2){
			board[index[0]][index[1]] = (state.turn) ? 1 : -1;					//change color and all rows of the same color
			let control = 1;
			let boolcontrol = (index[0]+control>0 && index[0]+control<8) ? true : false;
			//check up 
			while(boolcontrol && board[index[0]+control][index[1]]!=board[index[0]][index[1]] && board[index[0]+control][index[1]]!=0 && board[index[0]+control][index[1]]!=2){
				board[index[0]+control][index[1]] = board[index[0]][index[1]]
				if (index[0]+control+1>=0 && index[0]+control+1<8){
					control = control + 1
				}
				else{
					boolcontrol = false;
				}
			}
			//check right
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
			//check left
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
			//check down
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
			//allow following cells to be used so turn their value to 2s
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
			//change turn and count pieces in the table
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
				message = (whites>0) ? 'WHTE HAS WON' : 'BLACK HAS WON'						//Message for show winner
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
				alert(message)//alert who won the game
			}
			root.innerHTML = '';
        	render(root, state);//Restart the game
		}
	};
	cell.appendChild(piece)
	return cell
}

const render = (root, state) =>{															//Design of the page
	const header = document.createElement('div');
	header.style.backgroundColor='black';
	header.style.minWidth = '330px';
	header.style.height = '175px';
	header.style.display = 'flex';
	header.style.flexDirection = 'column'
	header.style.justifyContent = 'center';
	header.style.alignItems = 'center';
	header.style.overflow = 'auto';

	const header_tittle = document.createElement('h1');
	const tittle_textNode = document.createTextNode('OTHELLO')
	header_tittle.appendChild(tittle_textNode)
	header_tittle.style.backgroundColor = 'black'
	header_tittle.style.color = 'white'
	header_tittle.style.fontSize = '45px';
	header.appendChild(header_tittle)

	const author = document.createElement('h1');
	const author_textNode = document.createTextNode('Made by: SUULCODER')
	author.appendChild(author_textNode)
	author.style.backgroundColor = 'black'
	author.style.color = 'white'
	author.style.fontSize = '10px';
	author.style.marginBottom = '15px';
	header.appendChild(author)

	const body = document.createElement('div');
	body.style.backgroundColor = 'black'
	body.style.minWidth = '330px';
	body.style.height = '1000px'
	body.style.display = 'flex';
	body.style.justifyContent = 'center';
	body.style.marginTop = '2px';

	const board = document.createElement('div');
	board.style.backgroundColor = 'green'
	board.style.width = '295px';
	board.style.height = '312px';
	board.style.marginTop = '91px';
	board.style.overflow = 'auto'
	
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


const state = {								//State of the game. 
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
