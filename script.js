
const emojis = ['🐨', '🐼', '🐸', '🦄', '🐔', '🐽', '🦎', '🐬', '🦞', '🦢','🦜','🦋','🐤','🪲','🎃','🎁','💋','🎖️','🪆','🧲','💡','📖', '💰', '⏰', '🍕', '🍗', '🍼', '🍺', '🍉', '🌺', '🚗', '✈️', '🚀', '🚁', '🌎', '🏠', '🌤️', '🌛', '⭐', '⚡', '🔥', '❤️'];
let numberOfCard = 0;
let firdtCard = null
let secondCard = null
let lockBoaed = false

function startGame() {
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);

    if (isOutOfRange(width, 4, 11)) {
        alert('Ancho tiene que ser de 4 a 11');
        return;
    }
    if (isOutOfRange(height, 3, 6)) {
        alert('Alto tiene que ser de 3 a 6');
        return;
    }

    reset()    
    setupBoard(width, height);
}

function setupBoard(width, height) {
    const board = document.getElementById('board');
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${width}, 100px)`;
    board.style.gridTemplateRows = `repeat(${height}, 100px)`;

    numberOfCard = width * height;
    if (numberOfCard / 2 > emojis.length) {
        alert('Not enough emojis for this board size');
        return;
    }

    const selectedEmojis = shuffleArray(emojis).slice(0, numberOfCard / 2);
    const doubleEmojis = [...selectedEmojis, ...selectedEmojis];

    const gameEmojis = shuffleArray(doubleEmojis);

    gameEmojis.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;

        const emojiElement = document.createElement('span');
        emojiElement.textContent = emoji;
        emojiElement.style.visibility = 'hidden'
        card.appendChild(emojiElement);

        card.addEventListener('click', () => flipCard(card, emojiElement))

        board.appendChild(card);
    });
}


function flipCard(card, emojiElement) {
    if (lockBoaed === true || card === firdtCard || card.classList.contains('matched')) {
        return
    }

    card.classList.add('flipped')
    emojiElement.style.visibility = 'visible'

    if (firdtCard === null) {
        firdtCard = card
    }
    else {
        secondCard = card
        checkForMatch()
    }
}

function reset() {
    [firdtCard, secondCard] = [null, null]
    lockBoaed = false
}

function isOutOfRange(val, minVal, maxVal) {
    return val < minVal || val > maxVal;
}

function checkForMatch() {
    const isMatch = firdtCard.dataset.emoji === secondCard.dataset.emoji

    if (isMatch) {
        dasableCards()
    }
    else {
        unflipCards()
    }
}

function dasableCards() {
    firdtCard.classList.add('matched')
    secondCard.classList.add('matched')

    let adjustedTotal = numberOfCard === 0 ? numberOfCard : numberOfCard - 1

    if (document.querySelectorAll('.card.matched').length === adjustedTotal) {
        setTimeout(() => {
            alert('Eres el mejor. Has ganado')
        }, 500);
        
    }

    reset()
}

function unflipCards() {
    lockBoaed = true
    setTimeout( () => {
        firdtCard.classList.remove('flipped')
        secondCard.classList.remove('flipped')

        firdtCard.firstChild.style.visibility = 'hidden'
        secondCard.firstChild.style.visibility = 'hidden'

        

        reset()
    }, 1000)
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.getElementById('btn-start').addEventListener('click', startGame);
