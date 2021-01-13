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

let cardsFacingUp = []
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //count how many times the same card has been clicked
  let card = event.target
  if(!cardsFacingUp.includes(card.classList.value.toString())){
  card.style.backgroundColor = `${card.classList.value}`
}
  console.log("________             you just clicked", card.classList.value);
  let colorCount = 0;
  if(cardsFacingUp){
  //Counts how many times the current color appears in cardsFacingUp array
  for(let color of cardsFacingUp){
  if(color === card.classList.value){
    console.log(color, "||",card.classList.value )
    colorCount++
  }
  }
}
  console.log("color is",card.classList.value.toString())
  console.log("Already Selected Once?", cardsFacingUp.includes(card.classList.value.toString()) )
  //I need logic to see if theres already the current color again in cards Facing up array; Reset the array maybe? Remove array with splice?
  //See if there are two DIFFERENT occurences of the current color
  let idxOfColor = cardsFacingUp.indexOf(card.classList.value.toString())
  console.log("index of color", idxOfColor)
  if(colorCount === 0 && (cardsFacingUp.indexOf(card.classList.value.toString(), idxOfColor + 1 )   === -1)){
  //push card color to array
  console.log("color count ", colorCount)
  cardsFacingUp.push(card.classList.value)
  setTimeout(function(){
  card.style.backgroundColor = "white"
    }, 1000)
  }else if(colorCount === 1 && !(idxOfColor !== cardsFacingUp.indexOf(card.classList.value.toString(), idxOfColor + 1 ))){
    console.log(colorCount)
  }
  else if( cardsFacingUp.includes(card.classList.value.toString()) ){
     //Add color to "cardsFacingUp" array
     cardsFacingUp.push(card.classList.value)

     }
}

// when the DOM loads
createDivsForColors(shuffledColors);
