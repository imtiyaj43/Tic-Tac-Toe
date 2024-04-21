let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true; // to know which player turn it is.
let count = 0; //to track how many moves are done (for draw)

const winPattern = [
  [0, 1, 2], [3, 4, 5],
  [6, 7, 8], [0, 3, 6],
  [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
  ];

const resetGame = () => {
  turnO = true;
  count=0;
  enableBoxes();
  msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true; // if double clicked it will not change
    count++;


    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = "Game is Draw Start New Game";
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations,Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let v0 = boxes[pattern[0]].innerText;
    let v1 = boxes[pattern[1]].innerText;
    let v2 = boxes[pattern[2]].innerText;

    if (v0 != "" && v1 != "" && v2 != "") {
      if (v0 === v1 && v1 === v2) {
        showWinner(v0);
        return true;
      }
    }
  }
}


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);