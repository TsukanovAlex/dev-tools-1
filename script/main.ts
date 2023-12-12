import { renderGame } from './components/render-game-component'
import '../static/styles.css'

interface GlobalState {
    level: string | undefined
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
    const appEl = document.getElementById('app');
    if (appEl !== null) {
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

    const levelEl = document.querySelectorAll('.level-input')
    

    // Обработчик клика на  все инпуты выбора уровня
    const inputEventListener = () => {
        levelEl.forEach((input) => {
            input.addEventListener('click', () => {
                window.globalState.level = (input as HTMLElement).dataset.index
                level = (input as HTMLElement).dataset.index
                console.log(level)
            })
        })
    }

    const StartButtonClickListener = () => {
        const startButtonEl = document.getElementById(
            'start-button',
        ) as HTMLButtonElement

        if (startButtonEl) {
            // Обработчик клика на кнопку старт
            startButtonEl.addEventListener('click', () => {
                if (window.globalState.level) {
                    renderGame(window.globalState.level)
                } else {
                    alert('Пожалуйста, выберите уровень сложности')
                }
            })
        }
    }
    StartButtonClickListener()
    inputEventListener()
}

renderPageChangeLevel()
