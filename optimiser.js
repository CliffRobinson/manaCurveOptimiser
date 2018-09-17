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

    for (let i = 0; i < handSize; i++){
        draw(hand, deck);
    }

    checkForMulligan(hand, deck, handSize);

    for (let i = 1; i <= totalTurns; i++){
        manaSpent[i] = playATurn(deck, hand, board);
    }

    return manaSpent;
}

function draw(hand, deck){
    hand.push(deck.pop());
}

function playATurn(deck, hand, board) {
    let manaSpent = 0;
    //need to find the combo of spells that spends the most mana;


    return manaSpent;
}

function checkForMulligan(hand, deck, handSize, callback) {
    let ihs = hand.length; //Initial Hand Size
    let mana = 0;
    let spells = new Array(8).fill(0);

    hand.map ((card) => {
        if( card.type == "land") {
            mana++;
        } else if (card.type == "spell") {
            spells[card.cmc]++;
        } else {
            console.log("Bad card type in mulligan check");
        }

    });

    //console.log(`Hand is ${show(hand)}`);
    //console.log(`Mana is ${mana}`);

    if (ihs > 4 && (mana < 2 || mana == ihs)) {
        let mulledCards =  mulligan(hand, deck);
        let newHand = mulledCards.hand;
        let newDeck = mulledCards.deck;
        
        if (callback) {callback(hand, deck);}

        let newMulledCards = checkForMulligan(newHand, newDeck);
        let newNewHand = newMulledCards.hand;
        let newNewDeck = newMulledCards.deck;

        return {
            hand: newNewHand,
            deck: newNewDeck
        };
    } else {
        return {hand, deck};
    } 

}

function mulligan(hand, deck) {
    let ihs = hand.length;
    //console.log(`IHS is ${ihs}`);
    deck = deck.concat(hand);
    //console.log(`Deck in mull is ${deck}`);

    hand = [];
    shuffle(deck);
    //console.log(`hand in mull is ${hand}`);
    for (let i = 1; i < ihs; i++){ //draw one less cards than previously. 
        draw(hand, deck);
        //console.log(`drawing ${hand[hand.length-1]}`);
    }
    return {hand, deck};
}

function show(cards) {
    let output = [];
    cards.map((card, i) => output.push(`${i}:${card.type}`));
    return output.join();
}

module.exports = {
    fact,
    shuffle,
    garp,
    mulligan, 
    draw,
    checkForMulligan, 
    sampleCards,
    show
};

