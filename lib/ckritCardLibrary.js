//Global Variables
//Construct The Game Canvas
const canvas = document.getElementById('cardGame');
const ctx = canvas.getContext('2d');

//Canvas Size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Deck And Loading Progress Variables
let ckritDeck;
const numberOfCards = 52;
let thingsToLoad = [];
let cardsLoaded = 0;

//Game Objects
//Complete Game Scene
const SCENE = [];
//Card Size
let cardImageWidth = 66;
let cardImageHeight = 96;
//Card Images
let cardBackImage = '../assets/cardBack.png';
let cardFrontImage = '../assets/';
//Background Image Setup
const backGround = new Image();
backGround.src = '../assets/ckritbg.png';
SCENE.push(backGround);
thingsToLoad.push(backGround);
//This Card Class Does Not Use A TileSheet For Images
class Card {
    //Card Arguments X, Y, Width, Height Of Each Card
    constructor(cardRank, cardSuit, cardSide, cardFrontSource, xPos, yPos, cardWidth, cardHeight) {
        this.cardPix = new Image();
        this.x = xPos;
        this.y = yPos;
        this.width = cardWidth;
        this.height = cardHeight;
        //Additional Card Information  
        this.suit = cardSuit;
        this.rank = cardRank;
       // this.color = cardColor;
        this.frontSide = cardSide;
        //this.cardIndex = cardIndex;
        this.cardFrontImage = cardFrontSource;
    }
    draw() {
        drawCard(this.cardPix, this.x, this.y, this.width, this.height);
    }
    update() {
        //Conditional Statement For The Card Side Back = 0 Or Front = 1
        if (!this.frontSide) {
            this.cardPix.src = cardBackImage;
        } else {
            this.cardPix.src = this.cardFrontImage;
        }
    }
}
//Testing Card Draw Function 
class Deck {
    constructor() {
        //Default Variables
        this.deck = [];
        this.suits = ['spade', 'diamond', 'club', 'heart'];
        this.ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.index = 0;
        return  this.suits.flatMap((suit, s) => {
            return this.ranks.map((rank, r) => {
                let cardImageSource = cardFrontImage + this.ranks[r] + '_' + this.suits[s] + '.png';
                return new Card (rank[r], suit[s], true, cardImageSource, 50, 50, cardImageWidth, cardImageHeight);
            });
        });
        /*
        for (let suit = 0; suit < this.suits.length; suit++) {
            this.value = 0;
            for (let rank = 0; rank < this.ranks.length; rank++) {
                this.value++;
                this.cardImageSource = cardFrontImage + this.ranks[rank] + '_' + this.suits[suit] + '.png';
                this.deck.push(new Card(this.ranks[rank], this.suits[suit], true, this.cardImageSource, 50, 50, cardImageWidth, cardImageHeight));
                thingsToLoad.push(Card);
                this.index++;
            }
        } 
        return this.deck;
        */
    }
}
ckritDeck = new Deck();

const shuffle = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const newIndex = Math.floor(Math.random() * (i + 1));
        const oldValue = deck[newIndex];
        deck[newIndex] = deck[i];
        deck[i] = oldValue;
    }
}
shuffle(ckritDeck);
const displayDeck = () => {
    for (let i = 0; i < ckritDeck.length; i++) {
        ckritDeck[i].update();
        ckritDeck[i].draw();
    }
}
console.log(ckritDeck);
drawCard = (image, x, y, width, height) => {
    ctx.drawImage(image, x, y, width, height);
}
animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayDeck();
}
/* function makeCard () {
    
    
    ckritCard = new Card(cardImageSource, centerPosition.x, centerPosition.y, cardImageWidth, cardImageHeight);
} */

/*
for (let i = 0; i < numberOfCards; i++) {
    deck.push(new Card());
    
}*/
animate();
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight
})