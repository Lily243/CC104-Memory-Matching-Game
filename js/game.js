const cardValues = [
    "🍎", "🍎",
    "🍌", "🍌",
    "🍇", "🍇",
    "🍒", "🍒",
    "⭐", "⭐",
    "🐱", "🐱"
];

function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

const cardGrid = document.getElementById("cardGrid");
const cards = document.querySelectorAll(".card");

function displayCards() {
    const shuffledCards = shuffleCards([...cardValues]);

    cards.forEach((card, index) => {
        card.textContent = "?";
        card.dataset.value = shuffledCards[index];
        card.classList.remove("flipped", "matched");
    });
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;

function flipCard() {
    if (lockBoard) return;

    if (this.classList.contains("matched")) return;

    if (this === firstCard) return;

    this.textContent = this.dataset.value;
    this.classList.add("flipped");

    if (firstCard === null) {
        firstCard = this;
        return;
    }

    secondCard = this;

    moves++;
    document.getElementById("moves").textContent = moves;

    checkMatch();
}

function checkMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matches++;

        document.getElementById("matches").textContent = matches + "/6";

    if (matches === 6) {
        setTimeout(() => {
            alert("Congratulations! You matched all 6 pairs!");
        }, 300);
    }

    resetBoard();
    } else {
        lockBoard = true;

        setTimeout(() => {
            firstCard.textContent = "?";
            secondCard.textContent = "?";

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

displayCards();

function restartGame() {
    moves = 0;
    matches = 0;

    document.getElementById("moves").textContent = moves;
    document.getElementById("matches").textContent = matches + "/6";

    resetBoard();
    displayCards();
}