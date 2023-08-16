/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./script/components/option-component.ts":
/*!***********************************************!*\
  !*** ./script/components/option-component.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCardArray: () => (/* binding */ createCardArray)
/* harmony export */ });
// Перемешивает карты
function shuffle(array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [
            array[randomIndex],
            array[currentIndex],
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
// Создаем массив из карт
var createCardArray = function (level) {
    var cardArray = [];
    for (var index = 1; index < 37; index++) {
        cardArray.push("card-item".concat(index.toString()));
    }
    shuffle(cardArray);
    switch (level) {
        case '1':
            cardArray = cardArray.slice(0, 3);
            break;
        case '2':
            cardArray = cardArray.slice(0, 6);
            break;
        case '3':
            cardArray = cardArray.slice(0, 9);
            break;
        default:
            break;
    }
    // удваиваю количество карт
    cardArray = cardArray.concat(cardArray);
    shuffle(cardArray);
    return cardArray;
};


/***/ }),

/***/ "./script/components/render-game-component.ts":
/*!****************************************************!*\
  !*** ./script/components/render-game-component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGame: () => (/* binding */ renderGame)
/* harmony export */ });
/* harmony import */ var _option_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./option-component */ "./script/components/option-component.ts");

function renderGame(level) {
    var appEl = document.getElementById('app');
    var firstCard = null;
    var secondCard = null;
    var clickable = true;
    // Массив перемешанных карт
    var cardArray = (0,_option_component__WEBPACK_IMPORTED_MODULE_0__.createCardArray)(level);
    var openedCardHtml = cardArray
        .map(function (item, index) {
        return "<div class='card-item ".concat(item, "' data-index=").concat(index, "></div>");
    })
        .join('');
    var appHtml = "\n    <header class=\"header center\">\n    <div class=\"header__timer-box\">\n    <div class=\"header__name-box\">\n    <p class=\"header__timer-name\">min </p>\n    <p class=\"header__timer-name\">sek</p>\n    </div>\n          <p class=\"header__timer\" id=\"seconds\">00.00</p>\n    </div>\n          <button class=\"header-game-button\" id=\"startNewGameButton\">\u041D\u0430\u0447\u0430\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E</button>\n          </header>\n<section class=\"game-field\">\n    ".concat(openedCardHtml, "\n</section>\n    ");
    appEl.innerHTML = appHtml;
    // Таймер
    var seconds = 0;
    var timerEl = appEl.querySelector('#seconds');
    var timerInterval = setInterval(function () {
        seconds++;
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
        timerEl.textContent = "".concat(minutes
            .toString()
            .padStart(2, '0'), ":").concat(remainingSeconds.toString().padStart(2, '0'));
    }, 1000);
    setTimeout(function () {
        var closedCardHtml = cardArray
            .map(function (item, index) {
            return "<div class='card-item' data-index=".concat(index, "></div>");
        })
            .join('');
        appEl.querySelector('.game-field').innerHTML =
            closedCardHtml;
        var cards = appEl.querySelectorAll('.card-item');
        cards.forEach(function (card) {
            card.addEventListener('click', function () {
                if (!clickable)
                    return;
                var index = card.dataset.index;
                if (index) {
                    card.classList.add(cardArray[parseInt(index)]);
                    if (!firstCard) {
                        firstCard = card;
                    }
                    else {
                        secondCard = card;
                        clickable = false;
                        setTimeout(function () {
                            if (firstCard && secondCard) {
                                if (firstCard.className === secondCard.className) {
                                    alert('Вы победили!');
                                }
                                else {
                                    alert('Вы проиграли!');
                                    firstCard.classList.remove(firstCard.classList[1]);
                                    secondCard.classList.remove(secondCard.classList[1]);
                                }
                                firstCard = null;
                                secondCard = null;
                                clickable = true;
                            }
                        }, 100);
                    }
                }
            });
        });
    }, 5000);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./script/main.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   level: () => (/* binding */ level),
/* harmony export */   renderPageChangeLevel: () => (/* binding */ renderPageChangeLevel)
/* harmony export */ });
/* harmony import */ var _components_render_game_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/render-game-component */ "./script/components/render-game-component.ts");

window.globalState = {
    level: '',
};
var level;
// рендер страницы с выбором уровня сложности
var renderPageChangeLevel = function () {
    // const appEl: HTMLElement = document.getElementById('app')
    var appEl = document.getElementById('app');
    var appHtml = "<div class=\"main\" id=\"main-box\">\n    <h2 class=\"main__title\">\u0412\u044B\u0431\u0435\u0440\u0438 \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C</h2>\n    <div class=\"main__level-box\">\n        <input\n            type=\"radio\"\n            name=\"games\"\n            data-index=\"1\"\n            id=\"level-light\"\n            class=\"level-input\"\n            value=\"1\"\n        />\n        <label for=\"level-light\">1</label>\n\n        <input\n            type=\"radio\"\n            name=\"games\"\n            data-index=\"2\"\n            id=\"level-medium\"\n            class=\"level-input\"\n            value=\"2\"\n        />\n        <label for=\"level-medium\">2</label>\n\n        <input\n            type=\"radio\"\n            name=\"games\"\n            data-index=\"3\"\n            id=\"level-hard\"\n            class=\"level-input\"\n            value=\"3\"\n        />\n        <label for=\"level-hard\">3</label>\n    </div>\n    <button id=\"start-button\" class=\"main__button\">\u0421\u0442\u0430\u0440\u0442</button>\n</div>";
    appEl.innerHTML = appHtml;
};
renderPageChangeLevel();
var levelEl = document.querySelectorAll('.level-input');
var startButtonEl = document.getElementById('start-button');
// Обработчик клика на  все инпуты выбора уровня
levelEl.forEach(function (input) {
    input.addEventListener('click', function () {
        window.globalState.level = input.dataset.index;
        level = input.dataset.index;
        console.log(level);
    });
});
// Обработчик клика на кнопку старт
startButtonEl.addEventListener('click', function () {
    if (window.globalState.level) {
        (0,_components_render_game_component__WEBPACK_IMPORTED_MODULE_0__.renderGame)(level);
    }
    else {
        alert('Пожалуйста, выберите уровень сложности');
    }
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map