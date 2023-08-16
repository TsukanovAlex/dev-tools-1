import { renderPageChangeLevel } from "../main";
// Перемешивает карты
function shuffle(array) {
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
export const createCardArray = (level) => {
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

export function renderFinal(finalTime, gameStatus) {
    const appEl = document.getElementById('app') as HTMLElement
    const minutes = Math.floor(finalTime / 60)
    const remainingSeconds = finalTime % 60
    const timeString = `${minutes
        .toString()
        .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    const statusString = gameStatus === 'win' ? 'Вы победили!' : 'Вы проиграли!'
    const statusIcon = gameStatus === 'win' ? '🎉' : '😞'
    const appHtml = `
        <div class="final-result">
            <p class="final-result__time">Время: ${timeString}</p>
            <p class="final-result__status">${statusString} ${statusIcon}</p>
            <button class="final-result__button" id="startNewGameButton">Начать заново</button>
        </div>
    `
    appEl.innerHTML = appHtml

    const startNewGameButton = appEl.querySelector(
        '#startNewGameButton',
    ) as HTMLElement
    startNewGameButton.addEventListener('click', () => {
        renderPageChangeLevel()
    })
}