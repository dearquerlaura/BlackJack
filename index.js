

// 2C = Two of Clubs (tréboles)
// 2D = Two of Diamonds (diamantes)
// 2H = Two of Hearts (corazones)
// 2S = Two of Spades (espadas)


// Variables _______________________________________


let deck = [];
let playerCards = [];
let houseCards = [];

const suits = ["C", "D", "H", "S"];
const letters = ["A", "J", "Q", "K"];

let playerSum = 0,
    houseSum = 0;
let isAlive = false,
    message = " ";

let playerContainer = document.getElementById("player-container");
let houseContainer = document.getElementById("house-container");
let gameText = document.getElementById("game-text");
let playerSumEl = document.getElementById("player-sum-El");
let houseSumEl = document.getElementById("house-sum-El");



// Create a deck ____________________________________________

function createDeck() {

    for (i = 2; i <= 10; i++) {
        for (let suit of suits) {
            deck.push(i + suit);
        }
    }

    for (let letter of letters) {
        for (let suit of suits) {
            deck.push(letter + suit);
        }
    }

}
createDeck()



// Get a random Card from deck ____________________________________________

function getRamdomCard() {

    let randomCard = Math.floor(Math.random() * deck.length);
    let card = deck.splice(randomCard, 1)

    return card[0]
}


// Extract the value of the cards ____________________________________________

function cardValue(card) {

    let value = card.substring(0, card.length - 1);

    if (value == "J" || value == "Q" || value == "K") {
        return value = 10
    } else if (value == "A") {
        return value = 11
    } else {
        return value = value * 1;
    }

}


// When we press the "New Game" button ____________________________________________

function newGame() {

    //clear data
    deck = [];
    createDeck()
    houseContainer.innerText = " ";
    houseSumEl.innerText = 0
    document.getElementById("draw-button").disabled = false;
    document.getElementById("stop-button").disabled = false;

    //game starts
    isAlive = true;

    let firstCard = getRamdomCard();
    let secondCard = getRamdomCard();

    // Sum real value:
    playerSum = cardValue(firstCard) + cardValue(secondCard);

    playerCards = [firstCard, secondCard];

    renderGame()

}


// when the game is running... ________________________________________________

function renderGame() {

    // // 1. render out player Cards
    playerContainer.innerText = " ";

    for (i = 0; i < playerCards.length; i++) {
        const cardImg = document.createElement('img');
        cardImg.src = `assets/imgs/cards/${playerCards[i]}.png`;
        cardImg.classList.add("card");
        playerContainer.append(cardImg);
    }


    // // 2. Show the value of sum player cards
    playerSumEl.innerText = playerSum


    // // 3. Depending on the sum value...

    if (playerSum <= 20) {
        isAlive = true;
        message = "Do you want to draw a card? 🃏";
    } else if (playerSum === 21) {
        isAlive = true;
        houseTurn(playerSum);
    } else {
        isAlive = false;
        houseTurn(playerSum);
    }

    gameText.innerText = message;
}


// Draw a card _______________________________________ 

function drawCard() {

    newCard = getRamdomCard();
    playerSum += cardValue(newCard);
    playerCards.push(newCard);

    renderGame();

}


// Stop Game - _______________________________________ 

function stopGame() {

    document.getElementById("draw-button").disabled = true;
    houseTurn(playerSum)

}



// House Game - if stop game or player looses _______________________________________ 

function houseTurn(playerSum) {


    document.getElementById("draw-button").disabled = true;
    document.getElementById("stop-button").disabled = true;

    //coger una carta del deck, almacenarla en houseCards, y enseñarla en consola
    let card = getRamdomCard();
    houseCards = [card];

    //sacar el valor de la carta y enseñarlo en pantalla
    houseSum = cardValue(card);
    houseSumEl.innerText = houseSum


    if (playerSum <= 21) {

        do {
            let newCard = getRamdomCard();
            houseSum += cardValue(newCard);
            houseCards.push(newCard);
            houseSumEl.innerText = houseSum

        } while (houseSum < playerSum);


        if (houseSum < 21) {
            message = "You're out of the game. House won!";
        } else if (playerSum == 21 && houseSum == 21) {
            message = "House got Blackjack too! What are the odds! Anayway... sorry, house always won.";
        } else if (houseSum == 21) {
            message = "You're out of the game! House got Blackjack!";
        } else if (houseSum > 21 && playerSum == 21) {
            message = "Woohoo! You've got Blackjack!🥂";
        } else {
            message = "House draw too many cards... You won!🥂";
        }


    } else { //If playerSum > 21, just draw 1 card
        message = "You're out of the game. House won!";
    }


    for (i = 0; i < houseCards.length; i++) {
        const cardImg = document.createElement('img');
        cardImg.src = `assets/imgs/cards/${houseCards[i]}.png`;
        cardImg.classList.add("card");
        houseContainer.append(cardImg);
    }


    gameText.innerText = message;

}




// function askValue() { } Para preguntar si el A vale 1 u 11 (llamaríamos a esta función en su return de cardValue)____________________________________________

// opción para apostar?? botones de apostar en cada ronda. Si gana se lo queda, si hay blackjacj dobla, si gana la casa lo pierde. Almacenar esos datos en un array _____________________