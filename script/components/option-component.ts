import { renderPageChangeLevel } from '../main'

// Перемешивает карты
export function shuffle(array: string[]) {
    let currentIndex = array.length,
        randomIndex
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }
    return array
}

// Создаем массив из карт
export const createCardArray = (level:string) => {
    let cardArray: string[] = []
    for (let index = 1; index < 37; index++) {
        cardArray.push(`card-item${index.toString()}`)
    }
    shuffle(cardArray)

    switch (level) {
        case '1':
            cardArray = cardArray.slice(0, 3)
            break
        case '2':
            cardArray = cardArray.slice(0, 6)
            break
        case '3':
            cardArray = cardArray.slice(0, 9)
            break
        default:
            break
    }
    // удваиваю количество карт
    cardArray = cardArray.concat(cardArray)

    shuffle(cardArray)

    return cardArray
}
// Завершение игры

export function renderFinal(finalTime:number, gameStatus:string) {
    const appEl = document.getElementById('app') as HTMLElement
    const minutes = Math.floor(finalTime / 60)
    const remainingSeconds = finalTime % 60
    const timeString = `${minutes
        .toString()
        .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    const statusString =
        gameStatus === 'win' ? 'Вы  выиграли!' : 'Вы проиграли!'
    const statusIcon =
        gameStatus === 'win'
            ? '<img class="win-smille">'
            : '<img class="loose-smille">'
    const finalPageHtml = `
            <div class="final-result">
                <div class="final-result__status">${statusIcon}</div>
                <div class="final-result__status-text">${statusString}</div>
                <div class="final-result__time-text">Затраченное время:</div>
                <div class="final-result__time">${timeString}</div>
                <button class="header-game-button" id="startNewGameButtonEnd">Начать заново</button>
            </div>
        `
    appEl.innerHTML = appEl.innerHTML + finalPageHtml

    const gamePage = document.getElementById('game-table') as HTMLElement
    gamePage.style.display = 'none'
    const appElem = document.getElementById('app') as HTMLElement
    appElem.classList.add('game-over-bg')

    const startNewGameButton = document.getElementById(
        'startNewGameButtonEnd',
    ) as HTMLElement
    startNewGameButton.addEventListener('click', () => {
        renderPageChangeLevel()
    })
}
