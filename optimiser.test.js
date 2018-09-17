const optimiser = require("./optimiser");
const { fact, shuffle, garp, draw, checkForMulligan, mulligan, sampleCards, show } = optimiser;

test("Test suite running", () => {
    expect(true).toBeTruthy();
});

test("Factorials are calculated correctly",() => {
    expect(fact(0)).toEqual(1);
    expect(fact(1)).toEqual(1);
    expect(fact(2)).toEqual(2);
    expect(fact(3)).toEqual(6);
    expect(fact(4)).toEqual(24);
    expect(fact(5)).toEqual(120);
    expect(fact(6)).toEqual(720);
    expect(fact(7)).toEqual(5040);
    expect(fact(8)).toEqual(40320);
    expect(fact(9)).toEqual(362880);
    expect(fact(10)).toEqual(3628800);
    expect(fact(15)).toEqual(1307674368000);
    expect(fact(20)).toEqual(2432902008176640000);
    expect(fact(50)).toEqual(30414093201713378043612608166064768844377641568960512000000000000);
});

test("Shuffle is relatively uniform for 2 items", ()=> {
    let record = {};
    const n = 10000;
    const range = 0.05;
    const deck = ["a","b"];
    const enfep = n/fact(deck.length); //Expected N For Each Permutation
    for (let i = 0; i < n; i++) {
        let deckClone = deck.slice();
        shuffle(deck);
        let stringy = deckClone.join("");
        if (record[stringy] == undefined){
            record[stringy] = 1;
        } else {
            record[stringy]++;
        }        
    }
    //let outputString = "";
    Object.keys(record).map(key => {
        expect(record[key]).toBeLessThan(enfep*(1+range));
        expect(record[key]).toBeGreaterThan(enfep*(1-range));
        //outputString +=`${key}: ${record[key]}\n`;
    });
    //console.log(outputString);
});

test("Shuffle is relatively uniform for 3 items", ()=> {
    let record = {};
    const n = 600000;
    const range = 0.05;
    const deck = ["a","b", "c"];
    const enfep = n/fact(deck.length); //Expected N For Each Permutation
    for (let i = 0; i < n; i++) {
        let deckClone = deck.slice();
        shuffle(deck);
        let stringy = deckClone.join("");
        if (record[stringy] == undefined){
            record[stringy] = 1;
        } else {
            record[stringy]++;
        }        
    }
    //let outputString = "";
    Object.keys(record).map(key => {
        expect(record[key]).toBeLessThan(enfep*(1+range));
        expect(record[key]).toBeGreaterThan(enfep*(1-range));
        //outputString +=`${key}: ${record[key]}\n`;
    });
    //console.log(outputString);
});

const oneGarp = garp(["a"], 5);               //Length 1.
const twoGarp = garp(["b", "c"], 3);          //Length 2^3 = 8
const threeGarp = garp(["d", "e", "f"], 3);   //Length 3^3 = 27
//const bigGarp = garp(["w", "x", "y", "z"], 10); //Length 4^10 = 1,048,576

test("garp output contains no duplicates", ()=> {
    function checkUniques(array) {
        const set = Array.from(new Set(array));
        expect(set.length).toEqual(array.length);
    }

    
    
    checkUniques(oneGarp);
    checkUniques(twoGarp);
    checkUniques(threeGarp);
    //checkUniques(bigGarp);

});

test("garp outputs the correct number of permutations", () => {
    // # of permutations = (number of options) ^ (number of slots)
    expect(oneGarp.length).toBe(1);
    expect(twoGarp.length).toBe(8);
    expect(threeGarp.length).toBe(27);
    //expect(bigGarp.length).toBe(1048576); 
});

const spell = sampleCards[0];
const land = sampleCards[1];

test("draw behaves correctly.", ()=> {

    let deck = [land, spell, spell, spell, spell, land, spell];
    let hand = [];

    draw(hand, deck);
    draw(hand, deck);

    expect(hand).toEqual([spell, land]);
    expect(deck).toEqual([land, spell, spell, spell, spell]);
    
});

test("mulligan behaves correctly", ()=> {
    let deck = new Array(15).fill(spell);
    let hand = [];
    for (let index = 0; index <5; index++) {
        draw(hand, deck); 
    }
    
    let mulledCards =  mulligan(hand, deck);
    hand = mulledCards.hand;
    deck = mulledCards.deck;


    expect(hand).toEqual(new Array(4).fill(spell));
    expect(deck).toEqual(new Array(11).fill(spell));
});

test("checkForMulligan will never mulligan below 4", ()=> {
    for (let i = 0; i < 100; i++) {
        let deck = new Array(23).fill(spell);
        let hand = new Array(7).fill(spell);
        //No lands in the deck, so it should always mulligan down to minimum. 

        let mulledCards =  checkForMulligan(hand, deck, 7);
        hand = mulledCards.hand;
        deck = mulledCards.deck;

        expect(hand).toHaveLength(4);        
    }
});

test("mulliganed hands will either be length 4, or have between 2 and 6 lands", () => {
    let handsof4 = 0;
    let handsofmore = 0; 
    let handsof7 = 0;
    for (let i = 0; i < 1000; i++) {
        let deck = new Array(20).fill(spell).concat(new Array(10).fill(land));
        shuffle(deck);
        let hand = [];
        for (let j = 0; j < 7; j++) {
            draw(hand, deck); 
        }
        let mulledCards =  checkForMulligan(hand, deck, 7);
        hand = mulledCards.hand;
        deck = mulledCards.deck;

        if (hand.length == 4) {
            handsof4++;
            expect(true).toBeTruthy();
        } else {
            (hand.length == 7) ? handsof7++ : handsofmore++; 
            let mana = hand.reduce((total, card) => (card.type == "land") ? total+1 : total, 0);
            expect(mana).toBeGreaterThanOrEqual(2);
            expect(mana).toBeLessThan(7);
        }
    }
    console.log(`4-hands:${handsof4}, 7-hands:${handsof7}, others:${handsofmore}`);
});

test("checkForMulligan will mull 7-landers", () =>{
    let hand = new Array(7).fill(land);
    let deck = new Array(9).fill(land).concat(new Array(24).fill(spell));

    let mulledCards =  checkForMulligan(hand, deck, 7);
    hand = mulledCards.hand;
    deck = mulledCards.deck;
    
    expect(deck.length).toBeGreaterThan(23);
    expect(hand.length).toBeLessThan(7);
});
