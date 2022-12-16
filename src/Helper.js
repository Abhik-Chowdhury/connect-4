export const isWinner = (game_Board,currentMove,currentPlayer) => {
    const board = [...game_Board];
    board[currentMove] = currentPlayer
    const winLines = [
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15],
        [0,4,8,12],
        [1,5,9,13],
        [2,6,10,14],
        [3,7,11,15],
        [0,5,10,15],
        [3,6,8,12]
    ];

    for(let i = 0; i < winLines.length ; i++){
        const [condition1,condition2,condition3,condition4] = winLines[i];
        if(board[condition1] > 0 &&
            board[condition1] === board[condition2]&&
            board[condition2] === board[condition3]&&
            board[condition3] === board[condition4]){
                return true;
            }
    }
    return false;
}


export const isDraw = (game_Board,currentMove,currentPlayer) => {
    let board = [...game_Board];
    board[currentMove] = currentPlayer;
    
    let count = board.reduce((prev,current) => prev + (current===0),0);
    console.log(`count ${count}`);

    return count === 0;
}



 const gameCompute = (game_Board) => {
    // Make a array of valid moves 

    let validMoves = [];
    for(let moves = 0; moves < game_Board.length; moves++){
        if(game_Board[moves] === 0){

            validMoves.push(moves);
        }
    }

    // Select an random moves for the time being

    let randomMoves = Math.floor(Math.random() * validMoves.length);
    return validMoves[randomMoves];
}
// for the right position

const getPosition = (game_Board,moveCheks) => {
    for(let check = 0; check < moveCheks.length; check++) {
        for(let i = 0 ; i < moveCheks[check].max; i += moveCheks[check].step){
            let series = 
            game_Board[i + moveCheks[check].indexs[0]].toString()+
            game_Board[i + moveCheks[check].indexs[1]].toString()+ 
            game_Board[i + moveCheks[check].indexs[2]].toString()+
            game_Board[i + moveCheks[check].indexs[3]].toString();

            switch(series){
                case "1110":
                case "2220":
                    console.log("AI"+ i + moveCheks[check].indexs[3]);
                    return i + moveCheks[check].indexs[3];
                case "1101":
                case "2202":
                    return i + moveCheks[check].indexs[2];
                case "1011":
                case "2022":
                    return i + moveCheks[check].indexs[1];
                case "0111":
                case "0222":
                    return i + moveCheks[check].indexs[0];
                default:

            }
        }
    }

    return -1;
};

// Basic logical move suggestion

export const gameAIMoves = (game_Board) => {
    let moveCheks = [
        {
            // virtical
            indexs:[0,4,8,12],
            max:4,
            step:1
        },
        {
            // horizontal
            indexs:[0,1,2,3],
            max:16,
            step:4
        },
        {
            // diagonal 1
            indexs:[0,5,10,15],
            max:16,
            step:16
        },
        {
            // diagonal 2
            indexs:[3,6,9,12],
            max:16,
            step:16
        }
    ];
    let position = getPosition(game_Board,moveCheks);
    if(position > -1) return position;
    return gameCompute(game_Board);
}