/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/styles.css":
/*!***************************!*\
  !*** ./static/styles.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./script/components/option-component.ts":
/*!***********************************************!*\
  !*** ./script/components/option-component.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCardArray: () => (/* binding */ createCardArray),
/* harmony export */   renderFinal: () => (/* binding */ renderFinal),
/* harmony export */   shuffle: () => (/* binding */ shuffle)
/* harmony export */ });
/* harmony import */ var _render_game_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render-game-component */ "./script/components/render-game-component.ts");
// import { renderPageChangeLevel } from '../main'

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
// Завершение игры
function renderFinal(finalTime, gameStatus) {
    var appEl = document.getElementById('app');
    var minutes = Math.floor(finalTime / 60);
    var remainingSeconds = finalTime % 60;
    var timeString = "".concat(minutes
        .toString()
        .padStart(2, '0'), ":").concat(remainingSeconds.toString().padStart(2, '0'));
    var statusString = gameStatus === 'win' ? 'Вы  выиграли!' : 'Вы проиграли!';
    var statusIcon = gameStatus === 'win'
        ? '<img class="win-smille">'
        : '<img class="loose-smille">';
    var finalPageHtml = "\n            <div class=\"final-result\">\n                <div class=\"final-result__status\">".concat(statusIcon, "</div>\n                <div class=\"final-result__status-text\">").concat(statusString, "</div>\n                <div class=\"final-result__time-text\">\u0417\u0430\u0442\u0440\u0430\u0447\u0435\u043D\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F:</div>\n                <div class=\"final-result__time\">").concat(timeString, "</div>\n                <button class=\"header-game-button\" id=\"startNewGameButtonEnd\">\u041D\u0430\u0447\u0430\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E</button>\n            </div>\n        ");
    appEl.innerHTML = appEl.innerHTML + finalPageHtml;
    var gamePage = document.getElementById('game-table');
    gamePage.style.display = 'none';
    var appElem = document.getElementById('app');
    appElem.classList.add('game-over-bg');
    var startNewGameButtonEnd = document.getElementById('startNewGameButtonEnd');
    startNewGameButtonEnd.addEventListener('click', function () {
        (0,_render_game_component__WEBPACK_IMPORTED_MODULE_0__.resetGame)();
    });
}


/***/ }),

/***/ "./script/components/render-game-component.ts":
/*!****************************************************!*\
  !*** ./script/components/render-game-component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGame: () => (/* binding */ renderGame),
/* harmony export */   resetGame: () => (/* binding */ resetGame),
/* harmony export */   timerInterval: () => (/* binding */ timerInterval)
/* harmony export */ });
/* harmony import */ var _option_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./option-component */ "./script/components/option-component.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../main */ "./script/main.ts");


var firstCard = null;
var secondCard = null;
var clickable = true;
var finalTime = 0;
var seconds = 0;
var startButtonEnabled = true;
var timerInterval = null;
var timeoutId = null;
function resetGame() {
    var appEl = document.getElementById('app');
    var gamePage = document.getElementById('game-table');
    // Очищаю таймеры
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    // Сбрасывваю таймаут
    if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    // Обнуляю переменные
    firstCard = null;
    secondCard = null;
    clickable = true;
    finalTime = 0;
    seconds = 0;
    // Обнуляю игровой стол
    var gameFieldElement = appEl.querySelector('.game-field');
    if (gameFieldElement) {
        gameFieldElement.innerHTML = '';
    }
    // блокирую ировое поле
    gamePage.style.display = 'block';
    // удаляю фон финала
    appEl.classList.remove('game-over-bg');
    console.log('Game reset.');
    (0,_main__WEBPACK_IMPORTED_MODULE_1__.renderPageChangeLevel)();
}
function renderGame(level) {
    var appEl = document.getElementById('app');
    // Массив перемешанных карт
    var cardArray = (0,_option_component__WEBPACK_IMPORTED_MODULE_0__.createCardArray)(level);
    var openedCardHtml = cardArray
        .map(function (item, index) {
        return "<div class='card-item ".concat(item, "' data-index=").concat(index, "></div>");
    })
        .join('');
    var appHtml = "\n        <div id='game-table'>\n            <header class=\"header center\">\n                <div class=\"header__timer-box\">\n                    <div class=\"header__name-box\">\n                        <p class=\"header__timer-name\">min </p>\n                        <p class=\"header__timer-name\">sek</p>\n                    </div>\n                    <p class=\"header__timer\" id=\"seconds\">00.00</p>\n                </div>\n                <button class=\"header-game-button\" id=\"startNewGameButton\">\u041D\u0430\u0447\u0430\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E</button>\n            </header>\n            <section class=\"game-field\">\n                ".concat(openedCardHtml, "\n            </section>\n        </div>\n    ");
    appEl.innerHTML = appHtml;
    // Таймер
    var timerEl = appEl.querySelector('#seconds');
    // Обработчик клика на кнопку "Начать заново"
    var startNewGameButton = appEl.querySelector('#startNewGameButton');
    startNewGameButton.addEventListener('click', function () {
        if (startButtonEnabled) {
            startButtonEnabled = false;
            startNewGameButton.classList.add('button-disabled');
            resetGame();
            setTimeout(function () {
                startButtonEnabled = true;
                startNewGameButton.classList.remove('button-disabled');
            }, 5000);
        }
    });
    setTimeout(function () {
        var closedCardHtml = cardArray
            .map(function (item, index) {
            return "<div class='card-item' data-index=".concat(index, "></div>");
        })
            .join('');
        var gameFieldElement = appEl.querySelector('.game-field');
        if (gameFieldElement) {
            gameFieldElement.innerHTML = closedCardHtml;
        }
        timerInterval = setInterval(function () {
            seconds++;
            var minutes = Math.floor(seconds / 60);
            var remainingSeconds = seconds % 60;
            timerEl.textContent = "".concat(minutes
                .toString()
                .padStart(2, '0'), ":").concat(remainingSeconds
                .toString()
                .padStart(2, '0'));
        }, 1000);
        var cards = appEl.querySelectorAll('.card-item');
        cards.forEach(function (card) {
            card.addEventListener('click', function () {
                if (!clickable || card.classList.contains('inactive'))
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
                                    firstCard.classList.add('inactive');
                                    secondCard.classList.add('inactive');
                                    var inactiveCards = appEl.querySelectorAll('.card-item.inactive');
                                    if (inactiveCards.length ===
                                        cardArray.length) {
                                        clearInterval(timerInterval);
                                        finalTime = seconds;
                                        (0,_option_component__WEBPACK_IMPORTED_MODULE_0__.renderFinal)(finalTime, 'win');
                                    }
                                }
                                else {
                                    firstCard.classList.remove(firstCard.classList[1]);
                                    secondCard.classList.remove(secondCard.classList[1]);
                                    finalTime = seconds;
                                    (0,_option_component__WEBPACK_IMPORTED_MODULE_0__.renderFinal)(finalTime, 'lose');
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


/***/ }),

/***/ "./script/main.ts":
/*!************************!*\
  !*** ./script/main.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   level: () => (/* binding */ level),
/* harmony export */   renderPageChangeLevel: () => (/* binding */ renderPageChangeLevel)
/* harmony export */ });
/* harmony import */ var _components_render_game_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/render-game-component */ "./script/components/render-game-component.ts");
/* harmony import */ var _static_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/styles.css */ "./static/styles.css");


window.globalState = {
    level: '',
};
var level;
// рендер страницы с выбором уровня сложности
var renderPageChangeLevel = function () {
    var appEl = document.getElementById('app');
    if (appEl !== null) {
        var appHtml = "<div class=\"main\" id=\"main-box\">\n    <h2 class=\"main__title\">\u0412\u044B\u0431\u0435\u0440\u0438 \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C</h2>\n    <div class=\"main__level-box\">\n        <input\n            type=\"radio\"\n            name=\"games\"\n            data-index=\"1\"\n            id=\"level-light\"\n            class=\"level-input\"\n            value=\"1\"\n        />\n        <label for=\"level-light\">1</label>\n\n        <input\n            type=\"radio\"\n            name=\"games\"\n            data-index=\"2\"\n            id=\"level-medium\"\n            class=\"level-input\"\n            value=\"2\"\n        />\n        <label for=\"level-medium\">2</label>\n\n        <input\n            type=\"radio\"\n            name=\"games\"\n            data-index=\"3\"\n            id=\"level-hard\"\n            class=\"level-input\"\n            value=\"3\"\n        />\n        <label for=\"level-hard\">3</label>\n    </div>\n    <button id=\"start-button\" class=\"main__button\">\u0421\u0442\u0430\u0440\u0442</button>\n</div>";
        appEl.innerHTML = appHtml;
        var appElem = document.getElementById('app');
        appElem.classList.remove('game-over-bg');
    }
    var levelEl = document.querySelectorAll('.level-input');
    // Обработчик клика на  все инпуты выбора уровня
    var inputEventListener = function () {
        levelEl.forEach(function (input) {
            input.addEventListener('click', function () {
                window.globalState.level = input.dataset.index;
                level = window.globalState.level || '';
                console.log(level);
            });
        });
    };
    var StartButtonClickListener = function () {
        var startButtonEl = document.getElementById('start-button');
        if (startButtonEl) {
            // Обработчик клика на кнопку старт
            startButtonEl.addEventListener('click', function () {
                if (window.globalState.level) {
                    (0,_components_render_game_component__WEBPACK_IMPORTED_MODULE_0__.renderGame)(window.globalState.level);
                }
                else {
                    alert('Пожалуйста, выберите уровень сложности');
                }
            });
        }
    };
    StartButtonClickListener();
    inputEventListener();
};
renderPageChangeLevel();


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./script/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map