let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector(".reset-btn");
let new_btn = document.querySelector(".new-btn");
let para = document.querySelector("#msg");
let container = document.querySelector(".msg-container");
let body = document.querySelector("body");

let trueo = true;

let Winpattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Button was Clicked")
        if(trueo){
            box.innerText="O";
            trueo=false;
        }
        else{
            box.innerText="X";
            trueo=true;
        }
        box.disabled=true;

        checkwinner();
    });
});

const resetGame= () => {
    trueo=true;
    enable();
    container.classList.add("hide")
}

const enable= () =>{
    for (let box of boxes){
        box.disabled= false;
        box.innerText="";
    }
}


const disable= () => {
    for (let box of boxes){
        box.disabled= true;
    }
}



const showWinner= (winner) => {
    para.innerText = `Congratulations, winner is ${winner}`;
    container.classList.remove("hide")
    showConfetti();
    disable();
    
}

const checkwinner= ()=> {
    for (let pettern of Winpattern){
        
        let pas1 = boxes[pettern[0]].innerText;
        let pas2 = boxes[pettern[1]].innerText;
        let pas3 = boxes[pettern[2]].innerText;

        if (pas1 != "" && pas2 != "" && pas3 != "" ){
            if (pas1=== pas2 && pas2=== pas3){
                
                showWinner(pas2)
                
            }
        }
    }
}

reset_btn.addEventListener("click", resetGame);
new_btn.addEventListener("click", resetGame);



function showConfetti() {
  const container = document.getElementById("confetti-container");

  for (let i = 0; i < 500; i++) {

    let confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      ["red", "yellow", "green", "blue", "pink", "gray", "margoon", "black"]
      [Math.floor(Math.random() * 8)];

    confetti.style.animationDuration =
      Math.random() * 2 + 2 + "s";

    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
  }
}





