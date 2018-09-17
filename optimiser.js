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

const ceilingsMax = [24, null, null, null, null, null, null, null];
let ceilingscurrent = [0, null, null, null, null, null, null, null];

let ceilings = {
    maxes: ceilingsMax,
    current: ceilingscurrent
};

// Code taken from https://www.ibm.com/developerworks/community/blogs/hazem/entry/javascript_getting_all_possible_permutations?lang=en

const getRPermuts = function(array, size, initialStuff, output, multiple = 1, ceilings) {
    if (initialStuff.length >= size) {
        output.push(initialStuff);
    } else {
        for (let i = 0; i < array.length; ++i) {
            let spaceLeft = size - initialStuff.length;        
            let amountToAdd = Math.min(spaceLeft, multiple);

            let stuffToAdd = new Array(amountToAdd).fill(array[i]);

            if (ceilings && ceilings.maxes[i] !== null) {
                if (((ceilings.current[i]) + amountToAdd) <= ceilings.maxes[i]){
                    const newCeilings = {
                        maxes: ceilings.maxes,
                        current: ceilingscurrent
                    };
                    newCeilings.current[i] += amountToAdd;
                    getRPermuts(array, size, initialStuff.concat(stuffToAdd), output, multiple, newCeilings);
                } //Else do nothing
            } else {
                getRPermuts(array, size, initialStuff.concat(stuffToAdd), output, multiple, ceilings);
            }
            
        }
    }
};

const garp = function(array, size, multiple = 1, ceilings) { //Get All Repetitive Permutations.
    let output = [];
    getRPermuts(array, size, [], output, multiple, ceilings);
    return output;
};

function garpwInput(array, size, inputArray){
    if (size < inputArray.length) {
        console.log(`Can't make array size ${size} when input has ${inputArray.length} entries`);
        return;
    }
    let input = inputArray.slice();
    let output = [];
    getRPermuts(array, size, input, output);
    return output;
}


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
    show,
    garpwInput
};

