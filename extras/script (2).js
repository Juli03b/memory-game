const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let cardsArr = []
let firstCard;
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  let cardIndex = cardsArr.indexOf((event.target.classList.value))
  let color = event.target.classList.value;
  console.log("Color Id: " )
  if(cardIndex === -1){
    firstClick();
  }else if(cardsArr.includes(color)){ //second+ time same card is clicked
        //show color for a second and allow cards to show after not
      event.target.style.backgroundColor = `${color}`
      let idx = cardsArr[cardsArr.indexOf(color) ]
      
      setTimeout(function(){
        event.target.style.backgroundColor = `white`
        for(let divs of gameContainer.children){
          divs.style.pointerEvents = "";
        }
      }, 1000)
      //!(cardsArr[cardsArr.indexOf(event.target.classList.value) + 1].includes("0") 

  if(event.target.getAttribute("data-id") !== "1" ) { // when card with same color  as card clicked before is clicked
    cardsArr.push(color)
    event.target.setAttribute("data-id", "1")
    console.log("WORKING!")
    event.target.style.backgroundColor = `${color}`
    
      let cards = document.querySelectorAll(`.${color}`)
      cards[0].style.backgroundColor = `${color}`
      cards[1].style.backgroundColor = `${color}`
    
  }
  setTimeout(function(){
    if(colorCount(event) > 1)
    cardsArr.splice(cardIndex, 2 )
    event.target.style.backgroundColor = `white`

  }, 1000)
  
  }
}
  console.log("Array right now:", cardsArr)



function firstClick(event){
  console.log(this)
  if(cardIndex === -1){ // first time card is clicked
    //add card color to cardsArr
  cardsArr.push(color)
  event.target.setAttribute("data-id", "1")
  firstCard = this

  for(let divs of gameContainer.children){
    divs.style.pointerEvents = "none";
  }

  // show color for a second and allow cards to show
  event.target.style.backgroundColor = `${color}`

  setTimeout(function(){
    event.target.style.backgroundColor = "white"
    for(let divs of gameContainer.children){
      divs.style.pointerEvents = "";
    }
  }, 1000)
}

//Counts how many times the current color appears in cardsFacingUp array
function colorCount (event){
let countColor = 0;
for(let color of cardsArr){
    if(color === event.target.classList.value){
      countColor++
      console.log("Color is ", color , "appearences in array: ", countColor)
      }
  }
  return countColor
}
}
// when the DOM loads
window.addEventListener('DOMContentLoaded', () => {
createDivsForColors(shuffledColors);
});
