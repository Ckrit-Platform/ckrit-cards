//Global Variables
const SUITS = ['spade', 'diamond', 'club', 'heart'];
const RANKS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const LOADER = [];
let loaded = 0;
//Canvas Setup And Size
const canvas = document.getElementById('cardGame');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//Card Size
let cardImageWidth = 66;
let cardImageHeight = 96;
//Card Images
let cardBackImage = '../assets/cardBack.png';
let cardFrontImage = '../assets/';
//Card Positioning
let centerX = Math.floor(canvas.width / 2) - cardImageWidth;
let centerY = Math.floor(canvas.height / 2) - cardImageHeight;
export default class Deck {
    constructor(cards = mainDeck()) {
        this.cards = cards;
    }
    get numberOfCards() {
        return this.cards.length;
    }
    centerCard(card) {
        this.centerX = Math.floor(canvas.width / 2) - cardImageWidth;
        this.centerY = Math.floor(canvas.height / 2) - cardImageHeight; 
        this.setCardPosition(card, this.centerX, this.centerY);
    }
    pop() {
        return this.cards.pop();
    }
    push(card) {
        this.cards.push(card);
    }
    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
    draw(card) {
        drawCard(this.cards[card].cardPix, this.cards[card].x, this.cards[card].y, this.cards[card].width, this.cards[card].height);
    }
    cardColor(card) {
        return this.cards[card].suit == 'club' || this.cards[card].suit == 'spade' ? 'black' : 'red';
    }
    setCardPosition(card, xPos, yPos) {
        this.cards[card].x = xPos;
        this.cards[card].y = yPos;
    }
    getCardPosition(card) {
        return [this.cards[card].x, this.cards[card].y];
    }
    setCardSize(card, cardWidth, cardHeight) {
        this.cards[card].width = cardWidth;
        this.cards[card].height = cardHeight;
    }
    flip(card) {
        //Conditional Statement For The Card Side Back = 0 Or Front = 1
        if (!this.cards[card].frontSide) {
            this.cards[card].cardPix.src = cardBackImage;
        } else {
            this.cards[card].cardPix.src = this.cards[card].cardFrontImage;
        }
    }
    updateImages() {
        for (let i = 0; i < this.numberOfCards; i++) {
            this.cards[i].cardPix.addEventListener('load', this.loadHandler);
            LOADER.push(this.cards[i].cardPix);
        }
    }
    update(card) {
        this.cards[card].x ++;
    }
    updateDeckLayout() {
        let cardPosition = 0;
        for (let i = 0; i < this.numberOfCards; i++) {
            this.cards[i].x = centerX;
            this.cards[i].y = centerY;
        }
        for (let i = 0; i < this.numberOfCards; i++) {
            cardPosition+= 0.2;
            this.cards[i].x += cardPosition;
            this.cards[i].y += cardPosition;
        }
    }
    cardValue(card) {
        if (this.cards[card].rank == 'J') return 11;
        if (this.cards[card].rank == 'Q') return 12;
        if (this.cards[card].rank == 'K') return 13;
        else return parseInt(this.cards[card].rank);
    }
    loadHandler() {
        loaded++;
        if (LOADER.length == loaded) {
            console.log('Finished Loading All Assets');
            return true;
        }
    }
}
class Card {
    //Card Arguments X, Y, Width, Height Of Each Card
    constructor(cardRank, cardSuit, cardFrontSource, xPos, yPos, cardWidth, cardHeight) {
        this.cardPix = new Image();
        this.x = xPos;
        this.y = yPos;
        this.width = cardWidth;
        this.height = cardHeight;
        //Additional Card Information  
        this.suit = cardSuit;
        this.rank = cardRank;
        // this.color = cardColor;
        this.cardPix.src = cardFrontSource;
        //this.cardIndex = cardIndex;
        this.cardFrontImage = cardFrontSource;
    }
}
function drawCard(image, x, y, width, height) {
    ctx.drawImage(image, x, y, width, height);
}
function mainDeck() {
    return SUITS.flatMap(suit => {
        return RANKS.map(rank => {
            let cardImageSource = cardFrontImage + rank + '_' + suit + '.png';
            return new Card (rank, suit, cardImageSource, centerX, centerY, cardImageWidth, cardImageHeight);
        });
    });
}
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
