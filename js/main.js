const hangmanImage = document.querySelector(".hangman-box img")
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const wordDisplay = document.querySelector(".word-display")
const gameModal = document.querySelector(".game-modal")
const playAgainButton = document.querySelector(".play-again")




let currentWord, correctLetters, wrongGuessCount
const maxGuesses = 6

const resetGame = () => {
    correctLetters = []
    wrongGuessCount = 0
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("")
    gameModal.classList.remove("show")
    hangmanImage.src = `../img/hangman-${wrongGuessCount}.svg`
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)

}


const getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word
    console.log(word, hint)
    document.querySelector(".hint-text b").innerText = hint
    resetGame()


}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You've found the word: ` : `The correct word was: `
        gameModal.querySelector("img").src = `../img/${isVictory ? 'victory' : 'lost'}.gif`
        gameModal.querySelector("h2").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
        gameModal.classList.add("show")
    }, 300)
}


const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)) {
            [...currentWord].forEach((letter, index) => {
                if(letter === clickedLetter){
                    correctLetters.push(letter)
                    wordDisplay.querySelectorAll("li")[index].innerText = letter
                    wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
                }
            })
    } else {
        wrongGuessCount++;
        hangmanImage.src = `../img/hangman-${wrongGuessCount}.svg`
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`

    if(wrongGuessCount === maxGuesses) return gameOver(false)
    if(correctLetters.length === currentWord.length) return gameOver (true)
}

for (let i = 97; i <= 122; i++) {
    
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame (e.target, String.fromCharCode(i)))
}



getRandomWord();

playAgainButton.addEventListener("click", getRandomWord);