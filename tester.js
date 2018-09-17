const {mulligan, draw, sampleCards, checkForMulligan, show} = require("./optimiser");

const spell = sampleCards[0];
const land = sampleCards[1];

let deck = new Array(5).fill(spell);

console.log(`Deck is: ${deck.toString()}`);

let hand = [];

console.log(`Hand is: ${hand.toString()}`);
console.log("Draw twice:");
draw(hand, deck);
draw(hand, deck);

console.log(`Hand is: ${hand.toString()}`);
console.log(`Deck is: ${deck.toString()}`);

let mulledCards =  mulligan(hand, deck);
hand = mulledCards.hand;
deck = mulledCards.deck;
console.log("Mulligan: ");
console.log(`Hand is: ${hand.toString()}`);
console.log(`Deck is: ${deck.toString()}`);

deck = new Array(16).fill(spell).concat(new Array(15).fill(land));

hand = new Array(5).fill(spell).concat(new Array(2).fill(land));

console.log(`Hand is: ${show(hand)}`);
console.log("Mulliganing");
mulledCards = checkForMulligan(hand, deck);
hand = mulledCards.hand;
deck = mulledCards.deck;
console.log(`Hand is: ${show(hand)}`);

//console.log(`Hand is: ${show(hand)}`);

// hand = new Array(5).fill(spell).concat(new Array(3).fill(land));
// console.log(`Hand is: ${show(hand)}`);

// let totalMana = hand.reduce((total, card) => (card.type == "land") ? total+1 : total, 0);

// console.log(`Total mana is`, totalMana);