"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple", "cyan", "white", "black",
];

const selectedCards = [];
let score = 0;
let clicks = 0;
let numPairsToWin = 0;
let best = 0;



//const colors = shuffle(COLORS);
//createCards(colors);

//add event listener to button
document.getElementById("newGame").addEventListener("click", newGame);


function newGame(){
  //remove old cards, if any, resest scores etc
  let board = document.getElementById("game");
  while(board.firstChild){
    board.removeChild(board.firstChild);
  }
  score = 0;
  clicks = 0;
  updateCounters();

  //add new cards -- size from the display
  let selectBox = document.getElementById("size");
  let numPairs = parseInt(selectBox.options[selectBox.selectedIndex].value);
  numPairsToWin = numPairs;
  console.log(numPairsToWin);
  const colors = shuffle(createDeck(numPairs));
  createCards(colors);
}

/** create a new deck of cards of selected size */
function createDeck(numPairs){
  let deck = [];
  for(let i = 0; i < numPairs; i++){
    deck.push(COLORS[i]);
    deck.push(COLORS[i]);
  }
  return deck;
}
/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");
  for (let color of colors) {
    let new_card = document.createElement("div");
    new_card.classList.add(color);
    new_card.classList.add("card");
    new_card.classList.add("back");  
    //add event listener
    new_card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(new_card);
    // missing code here ...
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  card.classList.remove("back");
  //remove event listener so you can't click the same card twice
  card.removeEventListener("click", handleCardClick);
}

/** Flip a card face-down. 
 * 
 * return card image to card back, replace event listener
*/

function unFlipCard(card) {
  card.classList.add("back");
  card.addEventListener("click", handleCardClick);
  // ... you need to write this ...
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  //increment clicks counter
  clicks ++;
  updateCounters();
  let card = evt.target;
  //alert("You have clicked on " + card);
  flipCard(card);
  

  //add this card to selected cards
  selectedCards.push(card);

  //check if we have a match if there are two cards in selectedCards array
  if(selectedCards.length === 2){

    //make it so you can't click anymore cards!!!
    let unclickedCards = document.getElementsByClassName("back");
    for(let card of unclickedCards){
      console.log("removing event listener from" + card.className)
      card.removeEventListener("click", handleCardClick);
    }
    //check for match
    setTimeout(checkForMatch, FOUND_MATCH_WAIT_MSECS);

    
  }

}

/*  Check if the two cards in selectedCards array are the same color  */
function checkForMatch(){
  if(selectedCards[0].className === selectedCards[1].className){
    handleMatch();
  }
  else{
    handleNotMatch();
  }
  //set selected cards back to 0
  selectedCards.length = 0;
  //replace event listeners to unmatched cards
  let unmatchedCards = document.getElementsByClassName("back");
  for(let card of unmatchedCards){
    card.addEventListener("click", handleCardClick);
  }


}

function handleMatch(){
  //alert("This is a match!");
  score++;
  updateCounters();
  checkForWin();
  //keep cards face up, and add 1 to score

}

function handleNotMatch(){
  //alert("Not a match!");
    //flip cards back over, replace event listeners

  for(let card of selectedCards){
    unFlipCard(card)
  }
}

function checkForWin(){
  console.log("Score: " + score);
  console.log("Num of pairs to win: " +numPairsToWin);
  if(score === numPairsToWin){
    console.log("You win!")
    setTimeout(alert("You win!"), FOUND_MATCH_WAIT_MSECS);
    updateBest();
  }
}

function updateCounters(){
  let lblClicks = document.getElementById("clicksDisplay");
  lblClicks.innerHTML = clicks;
}

function updateBest(){
  if(clicks < best || best === 0){
    best = clicks;
  }
  let lblBest = document.getElementById("bestDisplay");
  lblBest.innerHTML = best;
}