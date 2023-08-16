import { renderGame } from './components/render-game-component'
import '../static/styles.css'

interface GlobalState {
    level: string
}
declare global {
    interface Window {
        globalState: GlobalState
    }
}
window.globalState = {
    level: '',
}
export var level
// рендер страницы с выбором уровня сложности
export const renderPageChangeLevel = () => {
    const appEl: HTMLElement = document.getElementById('app') as HTMLElement
    const appHtml = `<div class="main" id="main-box">
    <h2 class="main__title">Выбери сложность</h2>
    <div class="main__level-box">
        <input
            type="radio"
            name="games"
            data-index="1"
            id="level-light"
            class="level-input"
            value="1"
        />
        <label for="level-light">1</label>

        <input
            type="radio"
            name="games"
            data-index="2"
            id="level-medium"
            class="level-input"
            value="2"
        />
        <label for="level-medium">2</label>

        <input
            type="radio"
            name="games"
            data-index="3"
            id="level-hard"
            class="level-input"
            value="3"
        />
        <label for="level-hard">3</label>
    </div>
    <button id="start-button" class="main__button">Старт</button>
</div>`
    appEl.innerHTML = appHtml
}

renderPageChangeLevel()

const levelEl = document.querySelectorAll('.level-input')
const startButtonEl = document.getElementById(
    'start-button',
) as HTMLButtonElement

// Обработчик клика на  все инпуты выбора уровня
levelEl.forEach((input) => {
    input.addEventListener('click', () => {
        window.globalState.level = (input as any).dataset.index
        level = (input as any).dataset.index
        console.log(level)
    })
})

// Обработчик клика на кнопку старт
startButtonEl.addEventListener('click', () => {
    if (window.globalState.level) {
        renderGame(level)
    } else {
        alert('Пожалуйста, выберите уровень сложности')
    }
})
