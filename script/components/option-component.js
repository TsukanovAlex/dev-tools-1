
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

// СОздаем массив из карт
export const createCardArray = (level) => {
    let cardArray = []
    for (let index = 1; index < 37; index++) {
        cardArray.push(`card-item${index}`)
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
