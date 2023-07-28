const ROWS = 8;
const COLUMNS = 8;

let origin = null;
let selectedRank = false;
let destination = "";
let eatenWhites = 0;
let eatenBlacks = 0;
let turno = "white";
let timeWhites = 600;
let timeBlacks = 600;

let timerWhites = null;
let timerBlacks = null;
let mode = null;

let chessboard = [
                [{piece:"torre", color:"black", image:"torre_negro"}, {piece:"caballo", color:"black", image:"caballo_negro"}, {piece:"alfil", color:"black", image:"alfil_negro"}, {piece:"reina", color:"black", image:"reina_negro"}, {piece:"rey", color:"black", image:"rey_negro"}, {piece:"alfil", color:"black", image:"alfil_negro"}, {piece:"caballo", color:"black", image:"caballo_negro"}, {piece:"torre", color:"black", image:"torre_negro"}],
                [{piece:"peon", color:"black", image:"peon_negro"},{piece:"peon", color:"black", image:"peon_negro"},{piece:"peon", color:"black", image:"peon_negro"},{piece:"peon", color:"black", image:"peon_negro"},{piece:"peon", color:"black", image:"peon_negro"},{piece:"peon", color:"black", image:"peon_negro"},{piece:"peon", color:"black", image:"peon_negro"},{piece:"peon", color:"black", image:"peon_negro"}],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [{piece:"peon", color:"white", image:"peon_blanco"},{piece:"peon", color:"white", image:"peon_blanco"},{piece:"peon", color:"white", image:"peon_blanco"},{piece:"peon", color:"white", image:"peon_blanco"},{piece:"peon", color:"white", image:"peon_blanco"},{piece:"peon", color:"white", image:"peon_blanco"},{piece:"peon", color:"white", image:"peon_blanco"},{piece:"peon", color:"white", image:"peon_blanco"}],
                [{piece:"torre", color:"white", image:"torre_blanco"}, {piece:"caballo", color:"white", image:"caballo_blanco"}, {piece:"alfil", color:"white", image:"alfil_blanco"}, {piece:"reina", color:"white", image:"reina_blanco"}, {piece:"rey", color:"white", image:"rey_blanco"}, {piece:"alfil", color:"white", image:"alfil_blanco"}, {piece:"caballo", color:"white", image:"caballo_blanco"}, {piece:"torre", color:"white", image:"torre_blanco"}]
              ];


document.getElementById("turno").textContent = "TURN: " + turno.toUpperCase();

function decreaseTimeWhites(){
    timeWhites--;
    document.getElementById("tiempo_blancas").textContent = "Whites: " + timeWhites + " seconds";

    if (timeWhites == 0){
        alert("Winner: Blacks");
        restartGame();
    }

}

function decreaseTimeBlacks(){
    timeBlacks--;
    document.getElementById("tiempo_negras").textContent = "Blacks: "+ timeBlacks + " seconds";

    if (timeBlacks == 0){
        alert("Winner: Whites");
        restartGame();
    }

   
}


function partidaContrareloj(){
    restartGame();
    mode = "contrareloj";
    timerWhites = setInterval(decreaseTimeWhites, 1000);
    document.getElementById("tiempo_negras").textContent =  "Blacks: "+ timeBlacks + " seconds";
    document.getElementById("tiempo_blancas").textContent =  "Whites: "+ timeWhites + " seconds";

}

function restartGame(){

    origin = null;
    selectedRank = false;
    destination = "";
    eatenWhites = 0;
    eatenBlacks = 0;

    timeWhites = 600;
    timeBlacks = 600;

    turno = "white";

    chessboard = [
        [{piece:"torre", color:"black", image:"torre_negro"}, {piece:"caballo", color:"black", image:"caballo_negro"}, {piece:"alfil", color:"black", image:"alfil_negro"}, {piece:"reina", color:"black", image:"reina_negro"}, {piece:"rey", color:"black", image:"rey_negro"}, {piece:"alfil", color:"black", image:"alfil_negro"}, {piece:"caballo", color:"black", image:"caballo_negro"}, {piece:"torre", color:"black", image:"torre_negro"}],
                [{piece:"peon", color:"black", image:"peon_negro"},{piece:"peon", color:"black", image:"peon_negro"},{piece:"peon", color:"black", image:"peon_negro"},{piece:"peon", color:"black", image:"peon_negro"},{piece:"peon", color:"black", image:"peon_negro"},{piece:"peon", color:"black", image:"peon_negro"},{piece:"peon", color:"black", image:"peon_negro"},{piece:"peon", color:"black", image:"peon_negro"}],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [{piece:"peon", color:"white", image:"peon_blanco"},{piece:"peon", color:"white", image:"peon_blanco"},{piece:"peon", color:"white", image:"peon_blanco"},{piece:"peon", color:"white", image:"peon_blanco"},{piece:"peon", color:"white", image:"peon_blanco"},{piece:"peon", color:"white", image:"peon_blanco"},{piece:"peon", color:"white", image:"peon_blanco"},{piece:"peon", color:"white", image:"peon_blanco"}],
                [{piece:"torre", color:"white", image:"torre_blanco"}, {piece:"caballo", color:"white", image:"caballo_blanco"}, {piece:"alfil", color:"white", image:"alfil_blanco"}, {piece:"reina", color:"white", image:"reina_blanco"}, {piece:"rey", color:"white", image:"rey_blanco"}, {piece:"alfil", color:"white", image:"alfil_blanco"}, {piece:"caballo", color:"white", image:"caballo_blanco"}, {piece:"torre", color:"white", image:"torre_blanco"}]
              ];

      document.getElementById("turno").textContent = "TURN: " + turno.toUpperCase();

      //No es partida contrareloj
      document.getElementById("tiempo_negras").textContent = "Not an against the clock game";
      document.getElementById("tiempo_blancas").textContent = "Not an against the clock game";
      
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
            newCell.id = "casilla;" + i + ";" + j;

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
    
    if (selectedRank == true && !pieceSameColor(row, column, turno)){
        console.log("movimiento");

        if (makeMove(row, column)){
            let originRank = document.getElementById(origin).classList.remove("casilla_resaltada");
            createBoard();
            selectedRank = false;

            if (turno == "white"){
                turno = "black";
                //Timer for the blacks.
                if (mode == "contrareloj"){
                    clearInterval(timerWhites);
                    timerBlacks = setInterval(decreaseTimeBlacks, 1000);
                }
            }else{
                turno = "white";
                //Timer for the whites.
                if (mode == "contrareloj"){
                    clearInterval(timerBlacks);
                    timerWhites = setInterval(decreaseTimeWhites, 1000);
                }
            }

            document.getElementById("turno").textContent = "TURN: " + turno.toUpperCase();

        }
    }else{
        
        if (pieceSameColor(row, column, turno)){
            console.log("HAY PIEZA");
            if (origin === event.target.id){

                if (event.target.classList.length == 2){
                    event.target.classList.remove("casilla_resaltada");
                    selectedRank = false;
        
                }else{
                    event.target.classList.add("casilla_resaltada");
                    selectedRank = true;
                }
        
            }else{
                let originRank = document.getElementById(origin);

                if (originRank !== null){
                    originRank.classList.remove("casilla_resaltada");
                    selectedRank = false;
                }
        
                event.target.classList.add("casilla_resaltada");
                selectedRank = true;
            }
        
            origin = event.target.id;
            console.log("ficha seleccionada");
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

    if (piece.piece === "peon"){
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

    }else if (piece.piece === "caballo"){
        //Rules for the knight
        console.log("Columna Origen:" + columnOrigin);
        console.log("Columna Destino:" + columnDestination);

        if (rowDestination == rowOrigin + 2 || rowDestination == rowOrigin - 2){
            console.log("Movimiento correcto");
            result = true;
        }
    }else if (piece.piece === "alfil"){
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
        
    }else if (piece.piece === "torre"){
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


    }else if (piece.piece === "reina"){
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

    }else if (piece.piece === "rey"){
        if (rowDestination == rowOrigin + 1 && (columnDestination == columnOrigin) || (columnDestination == columnOrigin + 1) || (columnDestination == columnOrigin - 1)){
            result = true;
        }else if (rowDestination == rowOrigin + - 1 && (columnDestination == columnOrigin) || (columnDestination == columnOrigin + 1) || (columnDestination == columnOrigin - 1)){
            result = true;
        }else if (rowDestination == columnDestination && ((columnDestination == columnOrigin + 1) || (columnDestination == columnOrigin - 1))){
            result = true;
        }
    }

    if (result){
        console.log("Movimiento VALIDO");

        if (chessboard[rowDestination][columnDestination] != null){
            //Piece eaten
            let pieceEaten = chessboard[rowDestination][columnDestination];
            console.log("Piece eaten");
            console.log(pieceEaten);

            
            
            if (turno == "white"){
                eatenWhites++;
                document.getElementById("comidas_blancas").textContent = "Pieces eaten by the player of Whites: " + eatenWhites;
            }else{
                eatenBlacks++;
                document.getElementById("comidas_negras").textContent = "Pieces eaten by the player of Blacks: " + eatenBlacks;
            }
            
        }

        chessboard[rowDestination][columnDestination] = piece; 
        chessboard[rowOrigin][columnOrigin] = null; 
        
        if (checkWinner(turno)){
            alert("Winner: " +  turno);
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
            if (chessboard[i][j] != null && chessboard[i][j].color == oppositeColor && chessboard[i][j].piece == "rey"){
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
