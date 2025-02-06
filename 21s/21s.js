

var twentyOneFaceCardValue = {
    "Jack": 10,
    "Queen": 10,
    "King": 10,
    "Ace": 11
};

var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

var deck = [];
var players = ["Sam", "Dealer"];

for (var i = 0; i < suits.length; i++) {
    for (var j = 1; j < Object.keys(twentyOneFaceCardValue).length + 10; j++) {
        if (j < 10) deck.push((j + 1).toString() + " of " + suits[i]);
        else deck.push(Object.keys(twentyOneFaceCardValue)[j - 10] + " of " + suits[i]);
    }
}

function shuffle(deck) {
    for (var i = deck.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
}

function pickUpFromDeck(deck, hands, playerIndex) {
    if (Object.keys(deck).length > 0) Object.values(hands)[playerIndex].push(deck.splice(0, 1));
    else console.log("There are no cards left in the deck!");
}

function match(deck, players) {
    // Shuffle the deck
    var remainingDeck = shuffle(deck);

    // Set up the players' opening hands
    var hands = {};
    for (var i = 0; i < players.length; i++) {
        hands[players[i]] = [];

        pickUpFromDeck(deck, hands, i);
        pickUpFromDeck(deck, hands, i);
    }

    console.log(Object.keys(deck).length);
    console.log(hands);
}

match(deck, players);
//console.log(deck.length);