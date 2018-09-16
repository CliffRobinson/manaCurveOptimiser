const random = require("lodash.random");

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

//End of copied code. 

const sampleCards = [
    {type:"spell", cmc:3, mana:"u"},
    {type:"land", mana:"w"}
];

function playAGame(initialDeck, handSize, cardsPerTurn, landsPerTurn, onThePlay, totalTurns) {
    let deck = initialDeck.slice();
    let hand = [];
    let board = [];
    //let manaAvailable = [];
    let totalManaSpent = 0;
    let manaSpent = [];

    shuffle(deck);

    for (let i = 0; i < handsize; i++){
        draw(hand, deck);
    }

    checkForMulligan(hand, deck);

    for (let i = 1; i <= totalTurns; i++){
        manaSpent[i] = playATurn(deck, hand, board);
    }

    return {
        manaSpent
    };
}

function draw(hand, deck){
    hand.push(deck.pop());
}

function playATurn(deck, hand, board) {
    let manaSpent = 0;
    //need to find the combo of spells that spends the most mana;


    return manaSpent;
}

function checkForMulligan(hand, deck) {

}

module.exports = {
    fact,
    shuffle,
    garp
};

