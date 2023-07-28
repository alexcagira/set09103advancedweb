const ROWS = 8;
const COLUMNS = 8;

let origen = null;
let casillaSeleccionada = false;
let destino = "";
let comidasBlancas = 0;
let comidasNegras = 0;
let turno = "white";
let tiempoBlancas = 600;
let tiempoNegras = 600;

let timerBlancas = null;
let timerNegras = null;
let modo = null;

let tablero = [
                [{pieza:"torre", color:"black", imagen:"torre_negro"}, {pieza:"caballo", color:"black", imagen:"caballo_negro"}, {pieza:"alfil", color:"black", imagen:"alfil_negro"}, {pieza:"reina", color:"black", imagen:"reina_negro"}, {pieza:"rey", color:"black", imagen:"rey_negro"}, {pieza:"alfil", color:"black", imagen:"alfil_negro"}, {pieza:"caballo", color:"black", imagen:"caballo_negro"}, {pieza:"torre", color:"black", imagen:"torre_negro"}],
                [{pieza:"peon", color:"black", imagen:"peon_negro"},{pieza:"peon", color:"black", imagen:"peon_negro"},{pieza:"peon", color:"black", imagen:"peon_negro"},{pieza:"peon", color:"black", imagen:"peon_negro"},{pieza:"peon", color:"black", imagen:"peon_negro"},{pieza:"peon", color:"black", imagen:"peon_negro"},{pieza:"peon", color:"black", imagen:"peon_negro"},{pieza:"peon", color:"black", imagen:"peon_negro"}],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [{pieza:"peon", color:"white", imagen:"peon_blanco"},{pieza:"peon", color:"white", imagen:"peon_blanco"},{pieza:"peon", color:"white", imagen:"peon_blanco"},{pieza:"peon", color:"white", imagen:"peon_blanco"},{pieza:"peon", color:"white", imagen:"peon_blanco"},{pieza:"peon", color:"white", imagen:"peon_blanco"},{pieza:"peon", color:"white", imagen:"peon_blanco"},{pieza:"peon", color:"white", imagen:"peon_blanco"}],
                [{pieza:"torre", color:"white", imagen:"torre_blanco"}, {pieza:"caballo", color:"white", imagen:"caballo_blanco"}, {pieza:"alfil", color:"white", imagen:"alfil_blanco"}, {pieza:"reina", color:"white", imagen:"reina_blanco"}, {pieza:"rey", color:"white", imagen:"rey_blanco"}, {pieza:"alfil", color:"white", imagen:"alfil_blanco"}, {pieza:"caballo", color:"white", imagen:"caballo_blanco"}, {pieza:"torre", color:"white", imagen:"torre_blanco"}]
              ];


document.getElementById("turno").textContent = "TURN: " + turno.toUpperCase();

function decrementarTiempoBlancas(){
    tiempoBlancas--;
    document.getElementById("tiempo_blancas").textContent = "Whites: " + tiempoBlancas + " seconds";

    if (tiempoBlancas == 0){
        alert("Winner: Blacks");
        restartGame();
    }

}

function decrementarTiempoNegras(){
    tiempoNegras--;
    document.getElementById("tiempo_negras").textContent = "Blacks: "+ tiempoNegras + " seconds";

    if (tiempoNegras == 0){
        alert("Winner: Whites");
        restartGame();
    }

   
}


function partidaContrareloj(){
    restartGame();
    modo = "contrareloj";
    timerBlancas = setInterval(decrementarTiempoBlancas, 1000);
    document.getElementById("tiempo_negras").textContent =  "Blacks: "+ tiempoNegras + " seconds";
    document.getElementById("tiempo_blancas").textContent =  "Whites: "+ tiempoBlancas + " seconds";

}

function restartGame(){

    origen = null;
    casillaSeleccionada = false;
    destino = "";
    comidasBlancas = 0;
    comidasNegras = 0;

    tiempoBlancas = 600;
    tiempoNegras = 600;

    turno = "white";

    tablero = [
        [{pieza:"torre", color:"black", imagen:"torre_negro"}, {pieza:"caballo", color:"black", imagen:"caballo_negro"}, {pieza:"alfil", color:"black", imagen:"alfil_negro"}, {pieza:"reina", color:"black", imagen:"reina_negro"}, {pieza:"rey", color:"black", imagen:"rey_negro"}, {pieza:"alfil", color:"black", imagen:"alfil_negro"}, {pieza:"caballo", color:"black", imagen:"caballo_negro"}, {pieza:"torre", color:"black", imagen:"torre_negro"}],
                [{pieza:"peon", color:"black", imagen:"peon_negro"},{pieza:"peon", color:"black", imagen:"peon_negro"},{pieza:"peon", color:"black", imagen:"peon_negro"},{pieza:"peon", color:"black", imagen:"peon_negro"},{pieza:"peon", color:"black", imagen:"peon_negro"},{pieza:"peon", color:"black", imagen:"peon_negro"},{pieza:"peon", color:"black", imagen:"peon_negro"},{pieza:"peon", color:"black", imagen:"peon_negro"}],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [{pieza:"peon", color:"white", imagen:"peon_blanco"},{pieza:"peon", color:"white", imagen:"peon_blanco"},{pieza:"peon", color:"white", imagen:"peon_blanco"},{pieza:"peon", color:"white", imagen:"peon_blanco"},{pieza:"peon", color:"white", imagen:"peon_blanco"},{pieza:"peon", color:"white", imagen:"peon_blanco"},{pieza:"peon", color:"white", imagen:"peon_blanco"},{pieza:"peon", color:"white", imagen:"peon_blanco"}],
                [{pieza:"torre", color:"white", imagen:"torre_blanco"}, {pieza:"caballo", color:"white", imagen:"caballo_blanco"}, {pieza:"alfil", color:"white", imagen:"alfil_blanco"}, {pieza:"reina", color:"white", imagen:"reina_blanco"}, {pieza:"rey", color:"white", imagen:"rey_blanco"}, {pieza:"alfil", color:"white", imagen:"alfil_blanco"}, {pieza:"caballo", color:"white", imagen:"caballo_blanco"}, {pieza:"torre", color:"white", imagen:"torre_blanco"}]
              ];

      document.getElementById("turno").textContent = "TURN: " + turno.toUpperCase();

      //No es partida contrareloj
      document.getElementById("tiempo_negras").textContent = "No es partida contrareloj";
      document.getElementById("tiempo_blancas").textContent = "No es partida contrareloj";
      
      createBoard();

      modo = "normal";
      clearInterval(timerNegras);
      clearInterval(timerBlancas);
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
            
            if (tablero[i][j] !== undefined &&tablero[i][j] !== null ){
                newCell.style.backgroundImage = "url(\"/static/" + tablero[i][j].imagen + ".png\")";
                newCell.style.backgroundSize = "100% auto"
            }

            newCell.addEventListener("click", resaltarCasilla);
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



function resaltarCasilla(event){
    let fila = parseInt(event.target.id.split(";")[1]);
    let columna = parseInt(event.target.id.split(";")[2]);
    
    if (casillaSeleccionada == true && !hayPiezaMismoColor(fila, columna, turno)){
        console.log("movimiento");

        if (hacerMovimiento(fila, columna)){
            let casillaOrigen = document.getElementById(origen).classList.remove("casilla_resaltada");
            createBoard();
            casillaSeleccionada = false;

            if (turno == "white"){
                turno = "black";
                //temporizador black
                if (modo == "contrareloj"){
                    clearInterval(timerBlancas);
                    //timerBlancas = setInterval(decrementarTiempoBlancas, 1000);
                    timerNegras = setInterval(decrementarTiempoNegras, 1000);
                }
            }else{
                turno = "white";
                //temporizador white
                if (modo == "contrareloj"){
                    clearInterval(timerNegras);
                    timerBlancas = setInterval(decrementarTiempoBlancas, 1000);
                    //timerNegras = setInterval(decrementarTiempoNegras, 1000);
                }
            }

            document.getElementById("turno").textContent = "TURN: " + turno.toUpperCase();

        }
    }else{
        
        if (hayPiezaMismoColor(fila, columna, turno)){
            console.log("HAY PIEZA");
            if (origen === event.target.id){

                if (event.target.classList.length == 2){
                    event.target.classList.remove("casilla_resaltada");
                    casillaSeleccionada = false;
        
                }else{
                    event.target.classList.add("casilla_resaltada");
                    casillaSeleccionada = true;
                }
        
            }else{
                let casillaOrigen = document.getElementById(origen);
                //console.log(casillaOrigen);
                if (casillaOrigen !== null){
                    casillaOrigen.classList.remove("casilla_resaltada");
                    casillaSeleccionada = false;
                }
        
                event.target.classList.add("casilla_resaltada");
                casillaSeleccionada = true;
            }
        
            origen = event.target.id;
            console.log("ficha seleccionada");
        }
        
    }    
}

function hayPieza(fila, columna){
    
    //console.log(fila);
    //console.log(columna);
    
    if (tablero[fila][columna] !== null){
        return true;
    }else{
        return false;
    }
}

function hayPiezaMismoColor(fila, columna, color){
    
    //console.log(fila);
    //console.log(columna);
    
    if (tablero[fila][columna] !== null && tablero[fila][columna].color == color){
        return true;
    }else{
        return false;
    }
}


function hacerMovimiento(filaDestino, columnaDestino){
    let resultado = false;
    let filaOrigen = parseInt(origen.split(";")[1]);
    let columnaOrigen = parseInt(origen.split(";")[2]);

    //Sacamos la pieza del origen
    let pieza = tablero[filaOrigen][columnaOrigen];

    if (pieza.pieza === "peon"){
        //reglas para el peon
        
        if (pieza.color === "white"){
            //Blanco
            if (filaDestino == filaOrigen - 1){
                resultado =  true;
            }else if (filaDestino == filaOrigen - 1 && hayPiezaMismoColor(filaDestino, columnaDestino, "black") && (columnaDestino == columnaOrigen + 1 ||  columnaDestino == columnaOrigen - 1)){
                resultado = true;
            }
        }else{
            //Negro
            if (filaDestino == filaOrigen + 1){
                resultado =  true;
            }else if (filaDestino == filaOrigen + 1 && hayPiezaMismoColor(filaDestino, columnaDestino, "white") && (columnaDestino == columnaOrigen + 1 ||  columnaDestino == columnaOrigen - 1)){
                resultado = true;
            }
        }

    }else if (pieza.pieza === "caballo"){
        //reglas para el caballo
        console.log("Columna Origen:" + columnaOrigen);
        console.log("Columna Destino:" + columnaDestino);

        if (filaDestino == filaOrigen + 2 || filaDestino == filaOrigen - 2){
            console.log("Movimiento correcto");
            resultado = true;
        }
    }else if (pieza.pieza === "alfil"){
        //reglas para el alfil
        if (filaDestino > filaOrigen && columnaDestino > columnaOrigen){//Diagonal abajo derecha
            resultado = comprobarDiagonalAbajoDerecha(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }else if (filaDestino > filaOrigen && columnaDestino < columnaOrigen){//Diagonal abajo izquierda
            resultado = comprobarDiagonalAbajoIzquierda(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }else if (filaDestino < filaOrigen && columnaDestino > columnaOrigen){//Diagonal arriba derecha
           resultado = comprobarDiagonalArribaDerecha(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }else if (filaDestino < filaOrigen && columnaDestino < columnaOrigen){//Diagonal arriba izquierda
            resultado = comprobarDiagonalArribaIzquierda(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }
        
    }else if (pieza.pieza === "torre"){
        //Reglas para la torre 
       
        if (filaOrigen == filaDestino && columnaDestino > columnaOrigen){ //fila derecha
            resultado = comprobarFilaDerecha(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }else if (filaOrigen == filaDestino && columnaDestino < columnaOrigen){//fila izquierda
            resultado = comprobarFilaIzquierda(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }else if(filaOrigen < filaDestino && columnaOrigen == columnaDestino){//columna abajo
            resultado = comprobarColumnaAbajo(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }else if (filaOrigen > filaDestino && columnaOrigen == columnaDestino){//columna arriba
            resultado = comprobarColumnaArriba(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }


    }else if (pieza.pieza === "reina"){
        //Reglas para la reina
        //Movimientos Horizontales
        
        if (filaOrigen == filaDestino && columnaDestino > columnaOrigen){//fila derecha
            resultado = comprobarFilaDerecha(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }else if (filaOrigen == filaDestino && columnaDestino < columnaOrigen){//fila izquierda
            resultado = comprobarFilaIzquierda(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }else if(filaOrigen < filaDestino && columnaOrigen == columnaDestino){//columna abajo
            resultado = comprobarColumnaAbajo(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }else if (filaOrigen > filaDestino && columnaOrigen == columnaDestino){//columna arriba
            resultado = comprobarColumnaArriba(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }
        //Movimientos diaginales
        else if (filaDestino > filaOrigen && columnaDestino > columnaOrigen){ //Diagonal abajo derecha
            resultado = comprobarDiagonalAbajoDerecha(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }else if (filaDestino > filaOrigen && columnaDestino < columnaOrigen){//Diagonal abajo izquierda
            resultado = comprobarDiagonalAbajoIzquierda(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }else if (filaDestino < filaOrigen && columnaDestino > columnaOrigen){//Diagonal arriba derecha
           resultado = comprobarDiagonalArribaDerecha(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }else if (filaDestino < filaOrigen && columnaDestino < columnaOrigen){//Diagonal arriba izquierda
            resultado = comprobarDiagonalArribaIzquierda(filaOrigen, columnaOrigen, filaDestino, columnaDestino, pieza.color);
        }

    }else if (pieza.pieza === "rey"){
        if (filaDestino == filaOrigen + 1 && (columnaDestino == columnaOrigen) || (columnaDestino == columnaOrigen + 1) || (columnaDestino == columnaOrigen - 1)){
            resultado = true;
        }else if (filaDestino == filaOrigen + - 1 && (columnaDestino == columnaOrigen) || (columnaDestino == columnaOrigen + 1) || (columnaDestino == columnaOrigen - 1)){
            resultado = true;
        }else if (filaDestino == columnaDestino && ((columnaDestino == columnaOrigen + 1) || (columnaDestino == columnaOrigen - 1))){
            resultado = true;
        }
    }

    if (resultado){
        console.log("Movimiento VALIDO");

        if (tablero[filaDestino][columnaDestino] != null){
            //Pieza comida
            let piezaComida = tablero[filaDestino][columnaDestino];
            console.log("Pieza comida");
            console.log(piezaComida);

            
            
            if (turno == "white"){
                comidasBlancas++;
                document.getElementById("comidas_blancas").textContent = "Pieces eaten by the player of Whites: " + comidasBlancas;
            }else{
                comidasNegras++;
                document.getElementById("comidas_negras").textContent = "Pieces eaten by the player of Blacks: " + comidasNegras;
            }
            
        }

        tablero[filaDestino][columnaDestino] = pieza; 
        tablero[filaOrigen][columnaOrigen] = null; 
        
        if (comprobarGanador(turno)){
            alert("Winner: " +  turno);
        }

    }else{
        console.log("Movimiento INVALIDO");
    }
   

    return resultado;
}

function comprobarDiagonalArribaDerecha(filaOrigen, columnaOrigen, filaDestino, columnaDestino, color){
    let resultado = true;
    let j = columnaOrigen + 1;
    let pasoPorCasilla = false;


    console.log("Se comprueba...");
    for (let i = filaOrigen - 1; i >= filaDestino && resultado==true; i--){
        if (tablero[i][j] != null && tablero[i][j].color == color){
            resultado = false;
        }    

        if (i == filaDestino && j == columnaDestino){
            pasoPorCasilla = true;
        }

        j++;
    }

    return resultado && pasoPorCasilla;
}

function comprobarDiagonalArribaIzquierda(filaOrigen, columnaOrigen, filaDestino, columnaDestino, color){
    let resultado = true;
    let j = columnaOrigen - 1;
    let pasoPorCasilla = false;


    console.log("Se comprueba...");
    for (let i = filaOrigen - 1; i >= filaDestino && resultado==true; i--){
        if (tablero[i][j] != null && tablero[i][j].color == color){
            resultado = false;
        }    

        if (i == filaDestino && j == columnaDestino){
            pasoPorCasilla = true;
        }

        j--;
    }

    return resultado && pasoPorCasilla;
}

function comprobarDiagonalAbajoDerecha(filaOrigen, columnaOrigen, filaDestino, columnaDestino, color){
    let resultado = true;
    let j = columnaOrigen + 1;
    let pasoPorCasilla = false;
   

    console.log("Se comprueba..." + color);
    for (let i = filaOrigen + 1; i <= filaDestino && resultado==true; i++){
        if (tablero[i][j] != null && tablero[i][j].color == color){
            resultado = false;
        }
        
        if (i == filaDestino && j == columnaDestino){
            pasoPorCasilla = true;
        }

        j++;
    }

    return resultado && pasoPorCasilla;
}

function comprobarDiagonalAbajoIzquierda(filaOrigen, columnaOrigen, filaDestino, columnaDestino, color){
    let resultado = true;
    let pasoPorCasilla = false;

    let j = columnaOrigen - 1;

    console.log("Se comprueba..." + color);
    for (let i = filaOrigen + 1; i <= filaDestino && resultado==true; i++){
        if (tablero[i][j] != null && tablero[i][j].color == color){
            resultado = false;
        }    

        if (i == filaDestino && j == columnaDestino){
            pasoPorCasilla = true;
        }

        j--;
    }

    return resultado && pasoPorCasilla;
}

function comprobarFilaDerecha(filaOrigen, columnaOrigen, filaDestino, columnaDestino, color){
    let resultado = true;

    for (let j = columnaOrigen + 1; j <= columnaDestino; j++){
        if (tablero[filaOrigen][j] != null && tablero[filaOrigen][j].color == color){
            resultado = false;
        }
    }

    return resultado;
}

function comprobarFilaIzquierda(filaOrigen, columnaOrigen, filaDestino, columnaDestino, color){
    let resultado = true;

    for (let j = columnaOrigen - 1; j >= columnaDestino; j--){
        if (tablero[filaOrigen][j] != null && tablero[filaOrigen][j].color == color){
            resultado = false;
        }
    }

    return resultado;
}

function comprobarGanador(color){
    let resultado = true;
    let colorOpuesto = null;

    console.log("comprobando ganador");
    if (color == "white"){
        colorOpuesto = "black";
    }else{
        colorOpuesto = "white";
    }

    for (let i = 0; i < ROWS; i++){
        for (let j = 0; j < COLUMNS; j++){
            if (tablero[i][j] != null && tablero[i][j].color == colorOpuesto && tablero[i][j].pieza == "rey"){
                resultado = false;
            }
        }
    }

    return resultado;
}

function comprobarColumnaAbajo(filaOrigen, columnaOrigen, filaDestino, columnaDestino, color){
    let resultado = true;

    for (let i = filaOrigen + 1; i <= filaDestino; i++){
        if (tablero[i][columnaOrigen] != null && tablero[i][columnaOrigen].color == color){
            resultado = false;
        }
    }

    return resultado;
}

function comprobarColumnaArriba(filaOrigen, columnaOrigen, filaDestino, columnaDestino, color){
    let resultado = true;

    for (let i = filaOrigen - 1; i >= filaDestino; i--){
        if (tablero[i][columnaOrigen] != null && tablero[i][columnaOrigen].color == color){
            resultado = false;
        }
    }

    return resultado;
}

createBoard();
