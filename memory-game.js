"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);
const selectedCards = [];

createCards(colors);


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
    new_card.classList.add("back");
    //new_card.className = "back";
    //add event listener
    new_card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(new_card);
    // missing code here ...
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  card.classList.remove("back");
  // ... you need to write this ...
}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.classList.add("back");
  // ... you need to write this ...
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  let card = evt.target;
  //alert("You have clicked on " + card);
  flipCard(card);
  //remove event listener so you can't click the same card twice
  card.removeEventListener("click", handleCardClick);

  //add this card to selected cards
  selectedCards.push(card);

  //check if we have a match if there are two cards in selectedCards array
  if(selectedCards.length === 2){
    checkForMatch();
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
}

function handleMatch(){
  alert("This is a match!");
  //keep cards face up, and add 1 to score

}

function handleNotMatch(){
  alert("Not a match!");

  //flip cards back over, replace event listeners, and empty the selectedCards array

}
