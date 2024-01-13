import { createCardArray, renderFinal } from './option-component'
import { renderPageChangeLevel } from '../main'

let firstCard: HTMLElement | null = null
let secondCard: HTMLElement | null = null
let clickable = true
let finalTime = 0
let seconds = 0
let startButtonEnabled = true

export let timerInterval: NodeJS.Timeout | null = null
let timeoutId: NodeJS.Timeout | null = null

export function resetGame() {
    const appEl = document.getElementById('app') as HTMLElement
    const gamePage = document.getElementById('game-table') as HTMLElement

    // Очищаю таймеры
    if (timerInterval !== null) {
        clearInterval(timerInterval)
        timerInterval = null!
    }

    // Сбрасывваю таймаут
    if (timeoutId !== null) {
        clearTimeout(timeoutId)
        timeoutId = null!
    }

    // Обнуляю переменные
    firstCard = null
    secondCard = null
    clickable = true
    finalTime = 0
    seconds = 0

    // Обнуляю игровой стол
    const gameFieldElement = appEl.querySelector('.game-field') as HTMLElement
    if (gameFieldElement) {
        gameFieldElement.innerHTML = ''
    }

    // блокирую ировое поле
    gamePage.style.display = 'block'

    // удаляю фон финала
    appEl.classList.remove('game-over-bg')

    console.log('Game reset.')
    renderPageChangeLevel()
}
export function renderGame(level: string) {
    const appEl = document.getElementById('app') as HTMLElement

    // Массив перемешанных карт
    const cardArray = createCardArray(level)

    const openedCardHtml = cardArray
        .map((item, index) => {
            return `<div class='card-item ${item}' data-index=${index}></div>`
        })
        .join('')

    const appHtml = `
        <div id='game-table'>
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
        </div>
    `
    appEl.innerHTML = appHtml

    // Таймер
    const timerEl = appEl.querySelector('#seconds') as HTMLElement

    // Обработчик клика на кнопку "Начать заново"
    const startNewGameButton = appEl.querySelector(
        '#startNewGameButton',
    ) as HTMLElement
    startNewGameButton.addEventListener('click', () => {
        if (startButtonEnabled) {
            startButtonEnabled = false
            resetGame()
            setTimeout(() => {
                startButtonEnabled = true
            }, 5000)
        }
    })

    setTimeout(() => {
        const closedCardHtml = cardArray
            .map((item, index) => {
                return `<div class='card-item' data-index=${index}></div>`
            })
            .join('')

        const gameFieldElement = appEl.querySelector(
            '.game-field',
        ) as HTMLElement

        if (gameFieldElement) {
            gameFieldElement.innerHTML = closedCardHtml
        }

        timerInterval = setInterval(() => {
            seconds++
            const minutes = Math.floor(seconds / 60)
            const remainingSeconds = seconds % 60
            timerEl.textContent = `${minutes
                .toString()
                .padStart(2, '0')}:${remainingSeconds
                .toString()
                .padStart(2, '0')}`
        }, 1000)

        const cards = appEl.querySelectorAll('.card-item')
        cards.forEach((card) => {
            card.addEventListener('click', () => {
                if (!clickable || card.classList.contains('inactive')) return
                const index = (card as HTMLElement).dataset.index
                if (index) {
                    card.classList.add(cardArray[parseInt(index)])
                    if (!firstCard) {
                        firstCard = card as HTMLElement
                    } else {
                        secondCard = card as HTMLElement
                        clickable = false
                        setTimeout(() => {
                            if (firstCard && secondCard) {
                                if (
                                    firstCard.className === secondCard.className
                                ) {
                                    firstCard.classList.add('inactive')
                                    secondCard.classList.add('inactive')
                                    const inactiveCards =
                                        appEl.querySelectorAll(
                                            '.card-item.inactive',
                                        )
                                    if (
                                        inactiveCards.length ===
                                        cardArray.length
                                    ) {
                                        clearInterval(timerInterval!)
                                        finalTime = seconds
                                        renderFinal(finalTime, 'win')
                                    }
                                } else {
                                    firstCard.classList.remove(
                                        firstCard.classList[1],
                                    )
                                    secondCard.classList.remove(
                                        secondCard.classList[1],
                                    )
                                    finalTime = seconds
                                    renderFinal(finalTime, 'lose')
                                }
                                firstCard = null
                                secondCard = null
                                clickable = true
                            }
                        }, 100)
                    }
                }
            })
        })
    }, 5000)
}
