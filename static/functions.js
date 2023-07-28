const ROWS = 8;
const COLUMNS = 8;

let origin = null;
let selectedRank = false;
let destination = "";
let eatenWhites = 0;
let eatenBlacks = 0;
let turn = "white";
let timeWhites = 600;
let timeBlacks = 600;

let timerWhites = null;
let timerBlacks = null;
let mode = null;

let chessboard = [
                [{piece:"rock", color:"black", image:"rock_black"}, {piece:"knight", color:"black", image:"knight_black"}, {piece:"bishop", color:"black", image:"bishop_black"}, {piece:"queen", color:"black", image:"queen_black"}, {piece:"king", color:"black", image:"king_black"}, {piece:"bishop", color:"black", image:"bishop_black"}, {piece:"knight", color:"black", image:"knight_black"}, {piece:"rock", color:"black", image:"rock_black"}],
                [{piece:"pawn", color:"black", image:"pawn_black"},{piece:"pawn", color:"black", image:"pawn_black"},{piece:"pawn", color:"black", image:"pawn_black"},{piece:"pawn", color:"black", image:"pawn_black"},{piece:"pawn", color:"black", image:"pawn_black"},{piece:"pawn", color:"black", image:"pawn_black"},{piece:"pawn", color:"black", image:"pawn_black"},{piece:"pawn", color:"black", image:"pawn_black"}],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [{piece:"pawn", color:"white", image:"pawn_white"},{piece:"pawn", color:"white", image:"pawn_white"},{piece:"pawn", color:"white", image:"pawn_white"},{piece:"pawn", color:"white", image:"pawn_white"},{piece:"pawn", color:"white", image:"pawn_white"},{piece:"pawn", color:"white", image:"pawn_white"},{piece:"pawn", color:"white", image:"pawn_white"},{piece:"pawn", color:"white", image:"pawn_white"}],
                [{piece:"rock", color:"white", image:"rock_white"}, {piece:"knight", color:"white", image:"knight_white"}, {piece:"bishop", color:"white", image:"bishop_white"}, {piece:"queen", color:"white", image:"queen_white"}, {piece:"king", color:"white", image:"king_white"}, {piece:"bishop", color:"white", image:"bishop_white"}, {piece:"knight", color:"white", image:"knight_white"}, {piece:"rock", color:"white", image:"rock_white"}]
              ];


document.getElementById("turn").textContent = "TURN: " + turn.toUpperCase();

function decreaseTimeWhites(){
    timeWhites--;
    document.getElementById("time_whites").textContent = "Whites: " + timeWhites + " seconds";

    if (timeWhites == 0){
        alert("Winner: Blacks");
        restartGame();
    }

}

function decreaseTimeBlacks(){
    timeBlacks--;
    document.getElementById("time_blacks").textContent = "Blacks: "+ timeBlacks + " seconds";

    if (timeBlacks == 0){
        alert("Winner: Whites");
        restartGame();
    }

   
}


function gameAgainstTheClock(){
    restartGame();
    mode = "againstTheClock";
    timerWhites = setInterval(decreaseTimeWhites, 1000);
    document.getElementById("time_blacks").textContent =  "Blacks: "+ timeBlacks + " seconds";
    document.getElementById("time_whites").textContent =  "Whites: "+ timeWhites + " seconds";

}

function restartGame(){

    origin = null;
    selectedRank = false;
    destination = "";
    eatenWhites = 0;
    eatenBlacks = 0;

    timeWhites = 600;
    timeBlacks = 600;

    turn = "white";

    chessboard = [
        [{piece:"rock", color:"black", image:"rock_black"}, {piece:"knight", color:"black", image:"knight_black"}, {piece:"bishop", color:"black", image:"bishop_black"}, {piece:"queen", color:"black", image:"queen_black"}, {piece:"king", color:"black", image:"king_black"}, {piece:"bishop", color:"black", image:"bishop_black"}, {piece:"knight", color:"black", image:"knight_black"}, {piece:"rock", color:"black", image:"rock_black"}],
                [{piece:"pawn", color:"black", image:"pawn_black"},{piece:"pawn", color:"black", image:"pawn_black"},{piece:"pawn", color:"black", image:"pawn_black"},{piece:"pawn", color:"black", image:"pawn_black"},{piece:"pawn", color:"black", image:"pawn_black"},{piece:"pawn", color:"black", image:"pawn_black"},{piece:"pawn", color:"black", image:"pawn_black"},{piece:"pawn", color:"black", image:"pawn_black"}],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [{piece:"pawn", color:"white", image:"pawn_white"},{piece:"pawn", color:"white", image:"pawn_white"},{piece:"pawn", color:"white", image:"pawn_white"},{piece:"pawn", color:"white", image:"pawn_white"},{piece:"pawn", color:"white", image:"pawn_white"},{piece:"pawn", color:"white", image:"pawn_white"},{piece:"pawn", color:"white", image:"pawn_white"},{piece:"pawn", color:"white", image:"pawn_white"}],
                [{piece:"rock", color:"white", image:"rock_white"}, {piece:"knight", color:"white", image:"knight_white"}, {piece:"bishop", color:"white", image:"bishop_white"}, {piece:"queen", color:"white", image:"queen_white"}, {piece:"king", color:"white", image:"king_white"}, {piece:"bishop", color:"white", image:"bishop_white"}, {piece:"knight", color:"white", image:"knight_white"}, {piece:"rock", color:"white", image:"rock_white"}]
              ];

      document.getElementById("turn").textContent = "TURN: " + turn.toUpperCase();

      //Not a game against the clock.
      document.getElementById("time_blacks").textContent = "Not an against the clock game";
      document.getElementById("time_whites").textContent = "Not an against the clock game";
      
      createBoard();

      mode = "normal";
      clearInterval(timerBlacks);
      clearInterval(timerWhites);
}




//Create Board
function createBoard(){
    
    let board = document.getElementById("board");
    board.innerHTML = "";
    let color = "white";

    for (let i = 0; i < ROWS; i++){
        let newRow = document.createElement("tr");

        if (i % 2 == 0){
            color = "white";
        }else{
            color = "black";
        }
    
        for (let j = 0; j < COLUMNS; j++){
            let newCell = document.createElement("td");
            
            newCell.className = color;
            
            if (chessboard[i][j] !== undefined &&chessboard[i][j] !== null ){
                newCell.style.backgroundImage = "url(\"/static/" + chessboard[i][j].image + ".png\")";
                newCell.style.backgroundSize = "100% auto"
            }

            newCell.addEventListener("click", highlightRank);
            newCell.id = "rank;" + i + ";" + j;

            if (color === "black" ){
                color = "white";
            }else{
                color = "black";
            }


            newRow.appendChild(newCell);
        }

        board.appendChild(newRow);
    }
}



function highlightRank(event){
    let row = parseInt(event.target.id.split(";")[1]);
    let column = parseInt(event.target.id.split(";")[2]);
    
    if (selectedRank == true && !pieceSameColor(row, column, turn)){
        console.log("move");

        if (makeMove(row, column)){
            let originRank = document.getElementById(origin).classList.remove("highlighted_rank");
            createBoard();
            selectedRank = false;

            if (turn == "white"){
                turn = "black";
                //Timer for the blacks.
                if (mode == "againstTheClock"){
                    clearInterval(timerWhites);
                    timerBlacks = setInterval(decreaseTimeBlacks, 1000);
                }
            }else{
                turn = "white";
                //Timer for the whites.
                if (mode == "againstTheClock"){
                    clearInterval(timerBlacks);
                    timerWhites = setInterval(decreaseTimeWhites, 1000);
                }
            }

            document.getElementById("turn").textContent = "TURN: " + turn.toUpperCase();

        }
    }else{
        
        if (pieceSameColor(row, column, turn)){
            console.log("THERE IS A PIECE");
            if (origin === event.target.id){

                if (event.target.classList.length == 2){
                    event.target.classList.remove("highlighted_rank");
                    selectedRank = false;
        
                }else{
                    event.target.classList.add("highlighted_rank");
                    selectedRank = true;
                }
        
            }else{
                let originRank = document.getElementById(origin);

                if (originRank !== null){
                    originRank.classList.remove("highlighted_rank");
                    selectedRank = false;
                }
        
                event.target.classList.add("highlighted_rank");
                selectedRank = true;
            }
        
            origin = event.target.id;
            console.log("Piece selected");
        }
        
    }    
}

function pieceFound(row, column){
    
    
    if (chessboard[row][column] !== null){
        return true;
    }else{
        return false;
    }
}

function pieceSameColor(row, column, color){
    
    
    if (chessboard[row][column] !== null && chessboard[row][column].color == color){
        return true;
    }else{
        return false;
    }
}


function makeMove(rowDestination, columnDestination){
    let result = false;
    let rowOrigin = parseInt(origin.split(";")[1]);
    let columnOrigin = parseInt(origin.split(";")[2]);

    //We select the piece at the origin position.
    let piece = chessboard[rowOrigin][columnOrigin];

    if (piece.piece === "pawn"){
        //Rules for the pawn
        
        if (piece.color === "white"){
            //White
            if (rowDestination == rowOrigin - 1){
                result =  true;
            }else if (rowDestination == rowOrigin - 1 && pieceSameColor(rowDestination, columnDestination, "black") && (columnDestination == columnOrigin + 1 ||  columnDestination == columnOrigin - 1)){
                result = true;
            }
        }else{
            //Black
            if (rowDestination == rowOrigin + 1){
                result =  true;
            }else if (rowDestination == rowOrigin + 1 && pieceSameColor(rowDestination, columnDestination, "white") && (columnDestination == columnOrigin + 1 ||  columnDestination == columnOrigin - 1)){
                result = true;
            }
        }

    }else if (piece.piece === "knight"){
        //Rules for the knight
        console.log("Origin column:" + columnOrigin);
        console.log("Destination column:" + columnDestination);

        if (rowDestination == rowOrigin + 2 || rowDestination == rowOrigin - 2){
            console.log("CORRECT move");
            result = true;
        }
    }else if (piece.piece === "bishop"){
        //Rules for the bishop
        if (rowDestination > rowOrigin && columnDestination > columnOrigin){//Diagonal down right
            result = checkDiagonalDownRight(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }else if (rowDestination > rowOrigin && columnDestination < columnOrigin){//Diagonal down left
            result = checkDiagonalDownLeft(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }else if (rowDestination < rowOrigin && columnDestination > columnOrigin){//Diagonal up right
           result = checkDiagonalUpRight(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }else if (rowDestination < rowOrigin && columnDestination < columnOrigin){//Diagonal up left
            result = checkDiagonalUpLeft(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }
        
    }else if (piece.piece === "rock"){
        //Rules for the rock 
       
        if (rowOrigin == rowDestination && columnDestination > columnOrigin){ //Right row
            result = checkRightRow(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }else if (rowOrigin == rowDestination && columnDestination < columnOrigin){//Left row
            result = checkLeftRow(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }else if(rowOrigin < rowDestination && columnOrigin == columnDestination){//Down column
            result = checkDownColumn(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }else if (rowOrigin > rowDestination && columnOrigin == columnDestination){//Upper Column
            result = checkUpColumn(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }


    }else if (piece.piece === "queen"){
        //Rules for the queen
        //MHorizontal Movements
        
        if (rowOrigin == rowDestination && columnDestination > columnOrigin){//row derecha
            result = checkRightRow(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }else if (rowOrigin == rowDestination && columnDestination < columnOrigin){//row izquierda
            result = checkLeftRow(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }else if(rowOrigin < rowDestination && columnOrigin == columnDestination){//column abajo
            result = checkDownColumn(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }else if (rowOrigin > rowDestination && columnOrigin == columnDestination){//column arriba
            result = checkUpColumn(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }
        //Diagonal Movements

        else if (rowDestination > rowOrigin && columnDestination > columnOrigin){ //Diagonal abajo derecha
            result = checkDiagonalDownRight(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }else if (rowDestination > rowOrigin && columnDestination < columnOrigin){//Diagonal abajo izquierda
            result = checkDiagonalDownLeft(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }else if (rowDestination < rowOrigin && columnDestination > columnOrigin){//Diagonal arriba derecha
           result = checkDiagonalUpRight(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }else if (rowDestination < rowOrigin && columnDestination < columnOrigin){//Diagonal arriba izquierda
            result = checkDiagonalUpLeft(rowOrigin, columnOrigin, rowDestination, columnDestination, piece.color);
        }

    }else if (piece.piece === "king"){
        if (rowDestination == rowOrigin + 1 && (columnDestination == columnOrigin) || (columnDestination == columnOrigin + 1) || (columnDestination == columnOrigin - 1)){
            result = true;
        }else if (rowDestination == rowOrigin + - 1 && (columnDestination == columnOrigin) || (columnDestination == columnOrigin + 1) || (columnDestination == columnOrigin - 1)){
            result = true;
        }else if (rowDestination == columnDestination && ((columnDestination == columnOrigin + 1) || (columnDestination == columnOrigin - 1))){
            result = true;
        }
    }

    if (result){
        console.log("VALID move");

        if (chessboard[rowDestination][columnDestination] != null){
            //Piece eaten
            let pieceEaten = chessboard[rowDestination][columnDestination];
            console.log("Piece eaten");
            console.log(pieceEaten);

            
            
            if (turn == "white"){
                eatenWhites++;
                document.getElementById("eaten_whites").textContent = "Pieces eaten by the player of Whites: " + eatenWhites;
            }else{
                eatenBlacks++;
                document.getElementById("eaten_blacks").textContent = "Pieces eaten by the player of Blacks: " + eatenBlacks;
            }
            
        }

        chessboard[rowDestination][columnDestination] = piece; 
        chessboard[rowOrigin][columnOrigin] = null; 
        
        if (checkWinner(turn)){
            alert("Winner: " +  turn);
        }

    }else{
        console.log("INVALID move");
    }
   

    return result;
}

function checkDiagonalUpRight(rowOrigin, columnOrigin, rowDestination, columnDestination, color){
    let result = true;
    let j = columnOrigin + 1;
    let stepByRank = false;


    console.log("Checking...");
    for (let i = rowOrigin - 1; i >= rowDestination && result==true; i--){
        if (chessboard[i][j] != null && chessboard[i][j].color == color){
            result = false;
        }    

        if (i == rowDestination && j == columnDestination){
            stepByRank = true;
        }

        j++;
    }

    return result && stepByRank;
}

function checkDiagonalUpLeft(rowOrigin, columnOrigin, rowDestination, columnDestination, color){
    let result = true;
    let j = columnOrigin - 1;
    let stepByRank = false;


    console.log("Checking...");
    for (let i = rowOrigin - 1; i >= rowDestination && result==true; i--){
        if (chessboard[i][j] != null && chessboard[i][j].color == color){
            result = false;
        }    

        if (i == rowDestination && j == columnDestination){
            stepByRank = true;
        }

        j--;
    }

    return result && stepByRank;
}

function checkDiagonalDownRight(rowOrigin, columnOrigin, rowDestination, columnDestination, color){
    let result = true;
    let j = columnOrigin + 1;
    let stepByRank = false;
   

    console.log("Checking..." + color);
    for (let i = rowOrigin + 1; i <= rowDestination && result==true; i++){
        if (chessboard[i][j] != null && chessboard[i][j].color == color){
            result = false;
        }
        
        if (i == rowDestination && j == columnDestination){
            stepByRank = true;
        }

        j++;
    }

    return result && stepByRank;
}

function checkDiagonalDownLeft(rowOrigin, columnOrigin, rowDestination, columnDestination, color){
    let result = true;
    let stepByRank = false;

    let j = columnOrigin - 1;

    console.log("Checking..." + color);
    for (let i = rowOrigin + 1; i <= rowDestination && result==true; i++){
        if (chessboard[i][j] != null && chessboard[i][j].color == color){
            result = false;
        }    

        if (i == rowDestination && j == columnDestination){
            stepByRank = true;
        }

        j--;
    }

    return result && stepByRank;
}

function checkRightRow(rowOrigin, columnOrigin, rowDestination, columnDestination, color){
    let result = true;

    for (let j = columnOrigin + 1; j <= columnDestination; j++){
        if (chessboard[rowOrigin][j] != null && chessboard[rowOrigin][j].color == color){
            result = false;
        }
    }

    return result;
}

function checkLeftRow(rowOrigin, columnOrigin, rowDestination, columnDestination, color){
    let result = true;

    for (let j = columnOrigin - 1; j >= columnDestination; j--){
        if (chessboard[rowOrigin][j] != null && chessboard[rowOrigin][j].color == color){
            result = false;
        }
    }

    return result;
}

function checkWinner(color){
    let result = true;
    let oppositeColor = null;

    console.log("Checking winner");
    if (color == "white"){
        oppositeColor = "black";
    }else{
        oppositeColor = "white";
    }

    for (let i = 0; i < ROWS; i++){
        for (let j = 0; j < COLUMNS; j++){
            if (chessboard[i][j] != null && chessboard[i][j].color == oppositeColor && chessboard[i][j].piece == "king"){
                result = false;
            }
        }
    }

    return result;
}

function checkDownColumn(rowOrigin, columnOrigin, rowDestination, columnDestination, color){
    let result = true;

    for (let i = rowOrigin + 1; i <= rowDestination; i++){
        if (chessboard[i][columnOrigin] != null && chessboard[i][columnOrigin].color == color){
            result = false;
        }
    }

    return result;
}

function checkUpColumn(rowOrigin, columnOrigin, rowDestination, columnDestination, color){
    let result = true;

    for (let i = rowOrigin - 1; i >= rowDestination; i--){
        if (chessboard[i][columnOrigin] != null && chessboard[i][columnOrigin].color == color){
            result = false;
        }
    }

    return result;
}

createBoard();
