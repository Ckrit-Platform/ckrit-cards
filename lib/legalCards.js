import Deck from "./styluxCardEngine.js";
//Constructing The Game Canvas
const canvas = document.getElementById('cardGame');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//Game Variables
let cardIndex = undefined;
let dealer;
let challenger;
let gameOver = false;
let AssetsReady = false;
//Setup Functions To Initialize Game Componets
const deck = new Deck();
deck.shuffle();
const gameLoaded = new Promise((gameReady) => {
    deck.updateImages();
    if (deck.loadHandler) {
        gameReady = true;
        AssetsReady = true;
    }
}).then(setup());
function setup() {
    deck.shuffle();
    deck.updateDeckLayout();
    cardIndex = deck.numberOfCards - 1;
    if (AssetsReady) {
        animate();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < deck.numberOfCards; i++) {
        deck.draw(i);
    }
    requestAnimationFrame(animate);
}
//Check If The HTML (DOM) Has Loaded
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', gameLoaded);
} else {
    gameLoaded;
}