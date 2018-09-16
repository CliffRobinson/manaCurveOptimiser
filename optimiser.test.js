const optimiser = require("./optimiser");
const { fact, shuffle } = optimiser;

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
    const range = 0.01;
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
    Object.keys(record).map(key => {
        expect(record[key]).toBeLessThan(enfep*(1+range));
        expect(record[key]).toBeGreaterThan(enfep*(1-range));
        console.log(`${key}: ${record[key]}`);
    });

});

test("Shuffle is relatively uniform for 3 items", ()=> {
    let record = {};
    const n = 800000;
    const range = 0.01;
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
    Object.keys(record).map(key => {
        expect(record[key]).toBeLessThan(enfep*(1+range));
        expect(record[key]).toBeGreaterThan(enfep*(1-range));
        console.log(`${key}: ${record[key]}`);
    });

});