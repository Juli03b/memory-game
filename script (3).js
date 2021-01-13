const gameContainer = document.getElementById("game");
const cardDivs = document.querySelectorAll("div")
const startButton = document.querySelector("#start-button")
const moreCardsButton = document.querySelector(".buttons")
const wonButton = document.querySelector("#won-button")
const highScoreButton = document.querySelector("#score-button")
const timeDisplay = document.querySelector('h2')
const scoreForm = document.querySelector('#score-form')
const nameInput = document.querySelector('#score-form input[type="text"]')
const nameSubmit = document.querySelector('#score-form input[type="submit"]')
let scoreDisplay = document.querySelector('span')
let wrongCount = 0;
let firstCard;
let score = 0;
let time = 0;
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

function handleCardClick(event) {


  let card = this

  card.style.backgroundColor = card.classList.value.toString()

  if(!firstCard){

    firstTimeCardClick(card)

  }else if(this.classList.value === firstCard.getAttribute("dataColor") && this !== firstCard){

    correctGuess(card)

  }else if(this !== firstCard){

    wrongGuess(card)

  }
  
}

function firstTimeCardClick(card){
    

    console.log("First Time Clicking Card")

    card.setAttribute("dataColor", card.classList.value.toString())
    firstCard = card

    console.log("data color : ", card.getAttribute("dataColor"))


}

function correctGuess(card){
    

    console.log("Correct guess")

    card.style.backgroundColor = card.classList.value.toString()

    card.setAttribute("done", "true")
    card.style.pointerEvents = "none"
    firstCard.setAttribute("done", "done")
    firstCard.style.pointerEvents = "none"

    firstCard = undefined;

    score >= 10 ? winningScene() : score++; 
    scoreDisplay.innerText = score;
    
    if(score === 5){
      winningScene();

      time = 0;
    }
    

    disableClick();

}

function wrongGuess(card){


    console.log("Wrong guess")

    disableClick()

    wrongCount++

    setTimeout(function() {

       card.style.backgroundColor = 'rgb(216, 216, 216)'
       firstCard.style.backgroundColor = 'rgb(216, 216, 216)'
       firstCard = undefined;

    }, 1000)


}

function disableClick(){
//disables clicking on all divs for a seccond 
//doesn't stop disabling clicking on cards that were guessed correctly
  

  cardDivs.forEach(cardDiv => {

    cardDiv.style.pointerEvents = "none"

  }); 

  setTimeout(function() {

    cardDivs.forEach(cardDiv => {
    if(cardDiv.getAttribute("done") === null){
      cardDiv.style.pointerEvents = ""
    } 
    }); 

  }, 1000)


}

function winningScene(){

  wonButton.style.visibility = "visible"
  highScoreButton.style.visibility = "visible"
  nameInput.style.visibility = 'visible'
  nameSubmit.style.visibility = 'visible'

  wonButton.addEventListener('click', function(){
    wonButton.style.visibility = "hidden"
    restartGame()
  })

  scoreForm.addEventListener("submit", saveScore())

  stopWatch()

}

function countCardDivs(){


  const allCards = gameContainer.querySelectorAll("div")
  let count = 0;

  allCards.forEach(card => {

    console.log(allCards)

    count++;

  });

  return count;
}

function addMoreCards(){


  //a button to 10 more cards.
  moreCardsButton.style.visibility = "visible"

  moreCardsButton.addEventListener("click", function(){

  let cardCount = countCardDivs();

  if(cardCount < 40){

      createDivsForColors(shuffledColors);

      console.log("yes")

      moreCardsButton.innerText = `Click to add 10 more cards | Card count: ${cardCount}`

  }else{

      moreCardsButton.innerText = 'thats enough cards for you'
  }

  })
}

function restartGame(){


  let shuffledColors = shuffle(COLORS);
  let allCards = gameContainer.querySelectorAll("div")

  if(allCards[0]){

    
  //if game already started/ended
    startButton.firstChild.innerText = "Click to restart"
    
    wrongCount = 0;
    score = 0;
    scoreDisplay.innerText = score;

    nameInput.style.visibility = 'hidden'
    nameSubmit.style.visibility = 'hidden'
    highScoreButton.style.visibility = 'hidden'


    allCards.forEach(card => {
      card.remove()
    });

    createDivsForColors(shuffledColors);

    stopWatch();

  }else{
  
  createDivsForColors(shuffledColors);

  stopWatch()

  startButton.firstChild.innerText = "Click to restart"

  }

}

function saveScore(){


  let today = new Date();
  let date = `${(today.getMonth()+1)}-${today.getDate()}-${today.getFullYear()}`
  let scoreInfo = 

  {

  "name" : "",
  "date" : `Date: ${date}.`,
  "time" : `Time: ${time}.`,
  "wrong": `You guessed wrong ${wrongCount} times.`

  }

  scoreInfo.name = nameInput.value
  localStorage.setItem( scoreInfo.name , JSON.stringify(scoreInfo))


}

function stopWatch(){


  if(!time){

    time = 0;
    console.log("Timer Started")
    
    let timer = setInterval(() => {

    time++
    timeDisplay.innerText = `Time : ${time} seconds`;

    }, 1000);

  }else{

    clearInterval(1)

    timeDisplay.innerText = `Time : ${time} seconds`;

    time = 0;

    console.log("Timer Stopped")
  }


}

function loadScores(){

let scoreInfo = JSON.parse(localStorage.getItem(nameInput.value))
let scoresListDiv = document.createElement("div")
let scoresList = document.createElement("ul")

scoresListDiv.classList = "scores-list-div"
scoresListDiv.append(scoresList)

if(scoreInfo){

  for(let info in scoreInfo){

    let newLi = document.createElement("li")

    newLi.innerText = scoreInfo[info]
    scoresList.append(newLi)
  }
  document.body.append(scoresListDiv)

  let closeDivLi = document.createElement("li")

  closeDivLi.innerText = "Click to close"
  scoresListDiv.append(closeDivLi)

  scoresListDiv.addEventListener("click", function(){
    scoresListDiv.remove()

    })
  }

}

startButton.addEventListener('click', () => {
  restartGame()

  this.style.pointerEvents = "none"

  setTimeout(function() {

      this.style.pointerEvents = ""

  } , 1000)

  });
  
nameSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  saveScore();
});

highScoreButton.addEventListener('click', (e) => {
  e.preventDefault()
  loadScores()
})