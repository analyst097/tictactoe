/**
 * @author Aditya Kumar Sahu <sahuaditya083@gmail.com>
 */
var DOC = document;

var STATE = {
    playerTurn: 1,
    player: [
        {
            turn: true,
            clicks: 0
        },
        {
            turn: false,
            clicks: 0
        }
    ],
    clicks: 0,
    matrix : [ 0,0,0,0,0,0,0,0,0 ]
}



console.log(STATE);

function gameHandler(item){
  
    let turn = getTurn();
    let nextTurn = null;
    
    if(STATE.clicks <=9){
        if(turn == 1){
            DOC.getElementById(item.id).innerHTML = 'X';
            DOC.getElementById(item.id).style.pointerEvents = 'none';
            nextTurn = 2;
        }
        else{
            item.innerHTML = 'O';
            nextTurn = 1;
            DOC.getElementById(item.id).style.pointerEvents = 'none';
        }

        changeTurn(nextTurn);
        clickCounter(turn);
        matrixUpdate(turn,item);

        if(STATE.clicks >= 5){
            let winner = winCheck();
            if( winner!=null ) {
                alert("Player " + winner + " wins");
                DOC.getElementsByClassName('grid-container')[0].style.pointerEvents = 'none';
                DOC.getElementById('reset').style.display = 'block';
                DOC.getElementById('playerTurn').style.display = 'none';
            }
        }
        
        console.log(STATE);
    }
   
  
}

function changeTurn(turn){
    DOC.getElementById('turn').innerHTML = turn;
    STATE.playerTurn = turn;
    STATE.player[0].turn = !(STATE.player[0].turn);
    STATE.player[1].turn = !(STATE.player[0].turn);
}

function getTurn(){
    return STATE.playerTurn;
}

function clickCounter(turn){
    STATE.clicks += 1;
    if(STATE.clicks >= 9){
        console.log(STATE.player);
        alert('9 Clicks reached.');
    }
    turn -= 1;
    STATE.player[turn].clicks += 1;
    
}


function matrixUpdate(playerClicked, itemClicked){
    let itemId = itemClicked.id;
    console.log(itemId);
    if(playerClicked == 1){       
        STATE.matrix[itemId] = 1;
    }else{
        STATE.matrix[itemId] = 2;
    }
}

function winCheck(){
    let copyMatrix = STATE.matrix;
    let row = null;
    let col = null;
    let diag = null;

    row = rowCheck(1,2,copyMatrix);
    if(row != null) { return row; }

    col =  columnCheck(1, 2, copyMatrix);
    if(col != null) { return col; }

    diag = diagonalCheck(1,2,copyMatrix);
    if(diag != null) { return diag; }

}


function rowCheck(val1, val2, matrix){

    let winner = null;
    if( (matrix[0] == val1 && matrix[1] == val1 && matrix[2] == val1) ||
        (matrix[3] == val1 && matrix[4] == val1 && matrix[5] == val1) ||
        (matrix[6] == val1 && matrix[7] == val1 && matrix[8] == val1) ) { return val1; }

    else if( (matrix[0] == val2 && matrix[1] == val2 && matrix[2] == val2) ||
             (matrix[3] == val2 && matrix[4] == val2 && matrix[5] == val2) ||
             (matrix[6] == val2 && matrix[7] == val2 && matrix[8] == val2)) { return val2; }

    else{ return null; }
}

function columnCheck(val1, val2, matrix){

    if( (matrix[0] == val1 && matrix[3] == val1 && matrix[6] == val1) ||
        (matrix[1] == val1 && matrix[4] == val1 && matrix[7] == val1) ||
        (matrix[2] == val1 && matrix[5] == val1 && matrix[8] == val1) ) { return val1; }
        
    else if( (matrix[0] == val2 && matrix[3] == val2 && matrix[6] == val2) ||
             (matrix[1] == val2 && matrix[4] == val2 && matrix[7] == val2) ||
             (matrix[2] == val2 && matrix[5] == val2 && matrix[8] == val2)) { return val2; }

    else{ return null; }
}

function diagonalCheck(val1, val2, matrix){
  
    if( ( matrix[0] == val1 && matrix[4] == val1 && matrix[8] == val1 ) ||
        ( matrix[2] == val1 && matrix[4] == val1 && matrix[6] == val1 ) ) { return val1; }

    else if( ( matrix[0] == val2 && matrix[4] == val2 && matrix[8] == val2 ) ||
             ( matrix[2] == val2 && matrix[4] == val2 && matrix[6] == val2 ) ) { return val2; }
    else { return null; }  
} 

function startGame(){
    DOC.getElementsByClassName('grid-container')[0].style.pointerEvents = 'all';
    DOC.getElementById('playerTurn').style.display = 'block';
    DOC.getElementById('start').style.display = 'none';
}

function resetGame(){
    location.reload();
}

