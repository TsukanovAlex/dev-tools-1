import { renderPageChangeLevel } from './script/main'
import { JSDOM } from 'jsdom'

test('renderPageChangeLevel sets HTML inside #app correctly', () => {
    // Создаем виртуальный DOM
    const dom = new JSDOM(
        '<!DOCTYPE html><html><body><div id="app"></div></body></html>',
        { runScripts: 'dangerously' },
    )

    // Устанавливаем глобальные объекты, которые используются в вашем коде
    global.document = dom.window.document
    global.window = dom.window

    // Вызываем функцию
    renderPageChangeLevel()

    // Получаем элемент 'app' из виртуального DOM
    const appElement = document.getElementById('app')

    // Проверяем, что HTML установлен корректно
    expect(appElement?.innerHTML).toContain('Выбери сложность')
})
