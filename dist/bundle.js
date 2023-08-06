/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./script/components/option-component.js":
/*!***********************************************!*\
  !*** ./script/components/option-component.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCardArray: () => (/* binding */ createCardArray)\n/* harmony export */ });\n\n// Перемешивает карты\nfunction shuffle(array) {\n    let currentIndex = array.length,\n        randomIndex\n    while (currentIndex !== 0) {\n        randomIndex = Math.floor(Math.random() * currentIndex)\n        currentIndex--\n        ;[array[currentIndex], array[randomIndex]] = [\n            array[randomIndex],\n            array[currentIndex],\n        ]\n    }\n\n    return array\n}\n\n// СОздаем массив из карт\nconst createCardArray = (level) => {\n    let cardArray = []\n    for (let index = 1; index < 37; index++) {\n        cardArray.push(`card-item${index}`)\n    }\n    shuffle(cardArray)\n\n    switch (level) {\n        case '1':\n            cardArray = cardArray.slice(0, 3)\n            break\n        case '2':\n            cardArray = cardArray.slice(0, 6)\n            break\n        case '3':\n            cardArray = cardArray.slice(0, 9)\n            break\n        default:\n            break\n    }\n// удваиваю количество карт\n    cardArray = cardArray.concat(cardArray)\n\n    shuffle(cardArray)\n\n    return cardArray\n}\n\n\n//# sourceURL=webpack://dev-tools/./script/components/option-component.js?");

/***/ }),

/***/ "./script/components/render-game-component.js":
/*!****************************************************!*\
  !*** ./script/components/render-game-component.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderGame: () => (/* binding */ renderGame)\n/* harmony export */ });\n/* harmony import */ var _option_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./option-component.js */ \"./script/components/option-component.js\");\n\nfunction renderGame(level) {\n    const appEl = document.getElementById('app')\n    let firstCard = null\n    let secondCard = null\n    let clickable = true\n    // Массив перемешанных карт\n    let cardArray = (0,_option_component_js__WEBPACK_IMPORTED_MODULE_0__.createCardArray)(level)\n\n    const openedCardHtml = cardArray\n        .map((item, index) => {\n            return `<div class='card-item ${item}' data-index=${index}></div>`\n        })\n        .join('')\n\n    const appHtml = `\n    <header class=\"header center\">\n    <div class=\"header__timer-box\">\n    <div class=\"header__name-box\">\n    <p class=\"header__timer-name\">min </p>\n    <p class=\"header__timer-name\">sek</p>\n    </div>\n          <p class=\"header__timer\" id=\"seconds\">00.00</p>\n    </div>\n          \n          \n          <button class=\"header-game-button\" id=\"startNewGameButton\">Начать заново</button>\n          \n          </header>\n<section class=\"game-field\">\n    ${openedCardHtml}\n</section>\n    `\n\n    appEl.innerHTML = appHtml\n\n    // таймер\n    let seconds = 0\n    const timerEl = appEl.querySelector('#seconds')\n    const timerInterval = setInterval(() => {\n        seconds++\n        const minutes = Math.floor(seconds / 60)\n        const remainingSeconds = seconds % 60\n        timerEl.textContent = `${minutes\n            .toString()\n            .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`\n    }, 1000)\n\n    setTimeout(() => {\n        const closedCardHtml = cardArray\n            .map((item, index) => {\n                return `<div class='card-item' data-index=${index}></div>`\n            })\n            .join('')\n        appEl.querySelector('.game-field').innerHTML = closedCardHtml\n\n        const cards = appEl.querySelectorAll('.card-item')\n        cards.forEach((card) => {\n            card.addEventListener('click', () => {\n                if (!clickable) return\n                const index = card.dataset.index\n                card.classList.add(cardArray[index])\n                if (!firstCard) {\n                    firstCard = card\n                } else {\n                    secondCard = card\n                    clickable = false\n                    setTimeout(() => {\n                        if (firstCard.className === secondCard.className) {\n                            alert('Вы победили!')\n                        } else {\n                            alert('Вы проиграли!')\n                            firstCard.classList.remove(firstCard.classList[1])\n                            secondCard.classList.remove(secondCard.classList[1])\n                        }\n                        firstCard = null\n                        secondCard = null\n                        clickable = true\n                    }, 100)\n                }\n            })\n        })\n    }, 5000)\n}\n\n\n//# sourceURL=webpack://dev-tools/./script/components/render-game-component.js?");

/***/ }),

/***/ "./script/main.js":
/*!************************!*\
  !*** ./script/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   level: () => (/* binding */ level),\n/* harmony export */   renderPageChangeLevel: () => (/* binding */ renderPageChangeLevel)\n/* harmony export */ });\n/* harmony import */ var _components_render_game_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/render-game-component.js */ \"./script/components/render-game-component.js\");\n\n\n\nwindow.globalState = {\n    level: '',\n}\nvar level\n// рендер страницы с выбором уровня сложности\nconst renderPageChangeLevel = () => {\n    const appEl = document.getElementById('app')\n    const appHtml = `<div class=\"main\" id=\"main-box\">\n    <h2 class=\"main__title\">Выбери сложность</h2>\n    <div class=\"main__level-box\">\n        <input\n            type=\"radio\"\n            name=\"games\"\n            data-index=\"1\"\n            id=\"level-light\"\n            class=\"level-input\"\n            value=\"1\"\n        />\n        <label for=\"level-light\">1</label>\n\n        <input\n            type=\"radio\"\n            name=\"games\"\n            data-index=\"2\"\n            id=\"level-medium\"\n            class=\"level-input\"\n            value=\"2\"\n        />\n        <label for=\"level-medium\">2</label>\n\n        <input\n            type=\"radio\"\n            name=\"games\"\n            data-index=\"3\"\n            id=\"level-hard\"\n            class=\"level-input\"\n            value=\"3\"\n        />\n        <label for=\"level-hard\">3</label>\n    </div>\n    <button id=\"start-button\" class=\"main__button\">Старт</button>\n</div>`\n    appEl.innerHTML = appHtml\n}\n\nrenderPageChangeLevel()\n\nconst levelEl = document.querySelectorAll('.level-input')\nconst startButtonEl = document.getElementById('start-button')\n\n// Обработчик клика на  все инпуты выбора уровня\nlevelEl.forEach((input) => {\n    input.addEventListener('click', () => {\n        window.globalState.level = input.dataset.index\n        level = input.dataset.index\n        console.log(level)\n    })\n})\n\n// Обработчик клика на кнопку старт\nstartButtonEl.addEventListener('click', () => {\n    if (window.globalState.level) {\n        (0,_components_render_game_component_js__WEBPACK_IMPORTED_MODULE_0__.renderGame)(level)\n    } else {\n        alert('Пожалуйста, выберите уровень сложности')\n    }\n})\n\n\n//# sourceURL=webpack://dev-tools/./script/main.js?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./script/main.js");
/******/ 	
/******/ })()
;