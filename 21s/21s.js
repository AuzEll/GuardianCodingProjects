

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

function pickUpFromDeck(deck, hands, player) {
    if (Object.keys(deck).length > 0) hands[player].push(deck.splice(0, 1)[0]);
    else console.log("There are no cards left in the deck!");
}

function checkHandScore(hand) {
    var score = 0;

    for (var i = 0; i < hand.length; i++) {
        var cardValue = hand[i].split(" ")[0];

        if (cardValue in twentyOneFaceCardValue) score += twentyOneFaceCardValue[cardValue];
        else score += parseInt(cardValue);
    }
    return score;
}

function match(deck, players) {
    players.push(players.splice(players.indexOf("Dealer"), 1)[0]); // Moves Dealer to end of player list

    // Shuffle the deck
    var remainingDeck = shuffle(deck);

    // Set up the players' opening hands
    var hands = {};
    for (var i = 0; i < players.length; i++) {
        hands[players[i]] = [];

        pickUpFromDeck(deck, hands, Object.keys(hands)[i]); // Each payer picks up two cards
        pickUpFromDeck(deck, hands, Object.keys(hands)[i]);
    }

    console.log(Object.keys(deck).length);
    console.log(hands);

    // Initial check with opening hand
    var winners = [];
    var maxValue = 0;
    for (const [key, value] of Object.entries(hands)) {
        if (checkHandScore(value) > maxValue && checkHandScore(value) <= 21) maxValue = checkHandScore(value);
        if (checkHandScore(value) == 21) winners.push(key);
        if (checkHandScore(value) > 21) delete hands[key];
    }

    // Players start drawing cards
    for (const [key, value] of Object.entries(hands)) {
        if (Object.entries(hands).length < 2 || winners.length > 0) break;

        if (key != "Dealer") {
            while (checkHandScore(value) < 17) pickUpFromDeck(deck, hands, key);
            console.log(key);
            console.log(hands[key]);
        }
        else {
            var competingPlayer = players[Math.floor(Math.random() * players.length)];
            while (competingPlayer == "Dealer" || !(competingPlayer in hands)) competingPlayer = players[Math.floor(Math.random() * players.length)];

            while (checkHandScore(value) <= checkHandScore(hands[competingPlayer])) pickUpFromDeck(deck, hands, key);
            console.log(key);
            console.log(hands[key]);
        }

        if (checkHandScore(value) > maxValue && checkHandScore(value) <= 21) maxValue = checkHandScore(value);
        if (checkHandScore(value) == 21) winners.push(key);
        if (checkHandScore(value) > 21) delete hands[key];
    }

    // Check who won
    if (Object.entries(hands).length == 0) console.log("\nNobody wins");
    else {
        if (winners.length == 0) {
            for (const [key, value] of Object.entries(hands)) {
                if (checkHandScore(value) == maxValue) winners.push(key);
            }
        }

        console.log("\n");
        for (var i = 0; i < winners.length; i++) {
            if (i + 1 < winners.length) console.log(winners[i] + " and ");
            else console.log(winners[i] + " wins with a score of " + maxValue);
        }
    }

}

match(deck, players);