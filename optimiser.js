const random = require('lodash.random');

let hand = []; //Where we keep the cards in hand. 
let handSize = 7;
let landsPerTurn = 1;
let drawsPerTurn = 1;


function fact(n) {
    let i = n;
    let f = 1;
    while (i>1) {
        f = f * i;
        i--;
    }
    return f;
}

function shuffle(deck) {
    const n = deck.length;
    for (let i = 0; i < n ; i++){
        let r = random(i, n-1, false);
        let temp = deck[i];
        deck[i] = deck[r];
        deck[r] = temp;
    }
}

// for (let i = 0; i < 6; i++){
//     console.log(`${i}! is ${fact(i)}`);
// }

// let deck = [1,2,3,4,5,6,7,8,9,10];

// shuffle(deck);

// console.log(deck);

// let record = {};

// for (let i = 0; i < 600000; i++) {
//     let deck = ["a","b", "c"];
//     shuffle(deck);
//     let stringy = deck.join("");
//     if (record[stringy] == undefined){
//         record[stringy] = 1;
//     } else {
//         record[stringy]++;
//     }
    
// }

// Object.keys(record).map( key => {
//     console.log(`${key}: ${record[key]}`);
// })



module.exports = {
    fact,
    shuffle,
};