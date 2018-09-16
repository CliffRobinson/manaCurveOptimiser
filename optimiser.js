const random = require("lodash.random");

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

function print(string){
    console.log(string);
}

// Code taken from https://www.ibm.com/developerworks/community/blogs/hazem/entry/javascript_getting_all_possible_permutations?lang=en

const getRPermuts = function(array, size, initialStuff, output) {
    if (initialStuff.length >= size) {
        output.push(initialStuff);
    } else {
        var i;
		
        for (i = 0; i < array.length; ++i) {	
            getRPermuts(array, size, initialStuff.concat(array[i]), output);
        }
    }
};

const garp = function(array, size) { //Get All Repetitive Permutations.
    let output = [];
    getRPermuts(array, size, [], output);
    return output;
};

// End of copied code. 

// let oneType = ["a"];
// let oneGarp = garp(["a"], 5); 

// console.log(oneTypeOutput);
// const oneTypeSet = Array.from(new Set(oneTypeOutput));
// console.log(oneTypeSet);
// console.log(`Array length is ${oneTypeOutput.length}, set length is ${oneTypeSet.length}`);
// console.log("");


// let twoTypes = ["a", "b"];
// let twoTypesOutput = garp(twoTypes, 3); 

// garp(twoTypes, 3); 
// console.log(twoTypesOutput);
// console.log("");

// let threeTypes = ["a", "b", "c"];
// let threeTypesOutput = garp(threeTypes, 3); 
// console.log(threeTypesOutput);
// print(`Length is ${threeTypesOutput.length}`);



module.exports = {
    fact,
    shuffle,
    garp
};

