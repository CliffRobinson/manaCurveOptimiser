const {mulligan, draw, sampleCards, checkForMulligan, show, garp, garpwInput} = require("./optimiser");

const spell = sampleCards[0];
const land = sampleCards[1];

console.log("\n//DRAWING TWICE");

let deck = new Array(5).fill(spell);

console.log(`Deck is: ${deck.toString()}`);

let hand = [];

console.log(`Hand is: ${hand.toString()}`);
console.log("Draw twice:");
draw(hand, deck);
draw(hand, deck);

console.log(`Hand is: ${hand.toString()}`);
console.log(`Deck is: ${deck.toString()}`);

console.log("\n//MULLINGANING");
let mulledCards =  mulligan(hand, deck);
hand = mulledCards.hand;
deck = mulledCards.deck;
console.log("Mulligan: ");
console.log(`Hand is: ${hand.toString()}`);
console.log(`Deck is: ${deck.toString()}`);

console.log("\n//SAMPLE MULLIGAN");
deck = new Array(16).fill(spell).concat(new Array(15).fill(land));
hand = new Array(5).fill(spell).concat(new Array(2).fill(land));

console.log(`Hand is: ${show(hand)}`);
console.log("Mulliganing");
mulledCards = checkForMulligan(hand, deck);
hand = mulledCards.hand;
deck = mulledCards.deck;
console.log(`Hand is: ${show(hand)}`);


console.log("\n//COUNTING MANA");
console.log(`Hand is: ${show(hand)}`);

hand = new Array(5).fill(spell).concat(new Array(3).fill(land));
console.log(`Hand is: ${show(hand)}`);

let totalMana = hand.reduce((total, card) => (card.type == "land") ? total+1 : total, 0);

console.log("Total mana is", totalMana);

// console.log("\n//MEASURING TIME");
let startTime;
let endTime;
// startTime = new Date().getTime();
// console.log(startTime);
// let endTime;
// console.log("Starting");
// setTimeout(()=> {
//     console.log("Finished");
//     endTime = new Date().getTime();

//     console.log(`Time taken was ${endTime - startTime}`);
// }, 3000);
 

console.log("\n//CHECKING REDUCTION WITH MULITPLES");
let selection = ["a", "b", "c", "d", "e"];
// startTime = new Date().getTime();
// let singGarp = garp(selection, 10);
// endTime = new Date().getTime();
// console.log(`Time taken for singGarp was ${endTime - startTime}, length is ${singGarp.length}`);
startTime = new Date().getTime();
let multiGarp = garp(selection, 10, 3);
endTime = new Date().getTime();
console.log(`Time taken for multiGarp was ${endTime - startTime}, length is ${multiGarp.length}`);

console.log("\n//Trying at a quarter size");
//Deck size is 10
//Minimum lands is 4
//Max lands is 6
//Min four drops is 1.

const actualchoices = [
    {type:"land"},
    {type:"spell", cmc:1},
    {type:"spell", cmc:2},
    {type:"spell", cmc:3},
    {type:"spell", cmc:4},
    {type:"spell", cmc:5},
    {type:"spell", cmc:6},
    {type:"spell", cmc:7},
];

const quarterCeilings = {
    maxes:[6, null, null, null, null, null, null, null],
    current:[0]
};

let input = new Array(4).fill(actualchoices[0]).concat(actualchoices[4]);
console.log(`input length is`, input.length);
startTime = new Date().getTime();
let quarterGarp = garpwInput(actualchoices, 10, input, 1, quarterCeilings);
endTime = new Date().getTime();
console.log(`Time taken for quarterGarp was ${endTime - startTime}, length is ${quarterGarp.length}`);

console.log("\n//Trying at a half size");
//Deck size is 20
//Minimum lands is 8
//Max lands is 12
//Min four drops is 2.

const halfCeilings = {
    maxes:[12, null, null, null, null, null, null, null],
    current:[0]
};

input = new Array(8).fill(actualchoices[0]).concat(new Array(2).fill(actualchoices[4]));

startTime = new Date().getTime();
let halfGarp = garpwInput(actualchoices, 20, input, 3, halfCeilings);
endTime = new Date().getTime();
console.log(`Time taken for halfGarp was ${endTime - startTime}, length is ${halfGarp.length}`);

//console.log("\n//Trying at full size");
//Deck size is 40
//Minimum lands is 15
//Max lands is 22
//Min four drops is 4.