const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

//initial variables

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game

function initGame(){
    currentPlayer = 'X';            //current play ko X set kra
    gameGrid = ["","","","","","","","",""];   //gameGRid ko empty(khaali) mark kr diya 
    //UI per bhi empty krna padenge boxes ko
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        //one more thing is missing,initialize boxes with css properties again
        box.classList = `box box-${index+1}`;

    })
    newGameBtn.classList.remove("active");     // new game wali button ko hide kraa
    gameInfo.innerText = `Current Player - ${currentPlayer}`;  //current player ko UI par Show krenge
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    //UI me game info me player ka name update krdenge
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position) => {

        //all 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && 
           (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            //check the winner and put it in answer to update it on UI
            if( gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            //pointer event ko disable kr denge taaki game me aage koi click nhi kr sake
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // now we know that who is the winner in X/O
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    });

    //it means we found winner
    //UI me Update krenge winner ko
    if( answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // if all boxes are filled and no one wins then
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });
    
    //check the fillCount
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
    
}



function handleClick(index){
    if(gameGrid[index] === ""){                 //check krenge k gamegrid ka is particukar index ka box khaali hai ya nhi
        boxes[index].innerText = currentPlayer;   //UI p X/O put krega on the basis of player
        gameGrid[index] = currentPlayer;        //jo gameGrid hamne check game k boxes ka status check krne k liye banai hai usme X/O put krega on the basis of player
        boxes[index].style.pointerEvents = "none";    //cursor pointer ki value change krenge
        // ab dusre player ki baari to player swap(change) krenge
        swapTurn();
        //check krenge k koi jeet to nhi gya hai
        checkGameOver();

    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click" , initGame);


