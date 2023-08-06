import { createCardArray } from './option-component.js'
export function renderGame(level) {
    const appEl = document.getElementById('app')
    let firstCard = null
    let secondCard = null
    let clickable = true
    // Массив перемешанных карт
    let cardArray = createCardArray(level)

    const openedCardHtml = cardArray
        .map((item, index) => {
            return `<div class='card-item ${item}' data-index=${index}></div>`
        })
        .join('')

    const appHtml = `
    <header class="header center">
    <div class="header__timer-box">
    <div class="header__name-box">
    <p class="header__timer-name">min </p>
    <p class="header__timer-name">sek</p>
    </div>
          <p class="header__timer" id="seconds">00.00</p>
    </div>
          
          
          <button class="header-game-button" id="startNewGameButton">Начать заново</button>
          
          </header>
<section class="game-field">
    ${openedCardHtml}
</section>
    `

    appEl.innerHTML = appHtml

    // таймер
    let seconds = 0
    const timerEl = appEl.querySelector('#seconds')
    const timerInterval = setInterval(() => {
        seconds++
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        timerEl.textContent = `${minutes
            .toString()
            .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }, 1000)

    setTimeout(() => {
        const closedCardHtml = cardArray
            .map((item, index) => {
                return `<div class='card-item' data-index=${index}></div>`
            })
            .join('')
        appEl.querySelector('.game-field').innerHTML = closedCardHtml

        const cards = appEl.querySelectorAll('.card-item')
        cards.forEach((card) => {
            card.addEventListener('click', () => {
                if (!clickable) return
                const index = card.dataset.index
                card.classList.add(cardArray[index])
                if (!firstCard) {
                    firstCard = card
                } else {
                    secondCard = card
                    clickable = false
                    setTimeout(() => {
                        if (firstCard.className === secondCard.className) {
                            alert('Вы победили!')
                        } else {
                            alert('Вы проиграли!')
                            firstCard.classList.remove(firstCard.classList[1])
                            secondCard.classList.remove(secondCard.classList[1])
                        }
                        firstCard = null
                        secondCard = null
                        clickable = true
                    }, 100)
                }
            })
        })
    }, 5000)
}
