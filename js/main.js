/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_components.js":
/*!*******************************!*\
  !*** ./src/js/_components.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_loaded__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/loaded */ "./src/js/components/loaded.js");
/* harmony import */ var _components_loaded__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_loaded__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/select */ "./src/js/components/select.js");
/* harmony import */ var _components_select__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_select__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_spollers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/spollers */ "./src/js/components/spollers.js");
/* harmony import */ var _components_spollers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_spollers__WEBPACK_IMPORTED_MODULE_2__);




/***/ }),

/***/ "./src/js/components/loaded.js":
/*!*************************************!*\
  !*** ./src/js/components/loaded.js ***!
  \*************************************/
/***/ (() => {

"use strict";


const animItems = document.querySelectorAll('.animate');
if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;
      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
        animItem.classList.add('loaded');
      } else {
        if (!animItem.classList.contains('_anim-no-hide')) {
          animItem.classList.remove('loaded');
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  }
  setTimeout(() => {
    animOnScroll();
  }, 300);
}

/***/ }),

/***/ "./src/js/components/select.js":
/*!*************************************!*\
  !*** ./src/js/components/select.js ***!
  \*************************************/
/***/ (() => {

//Select
let selects = document.querySelectorAll('select');
selects.forEach(select => {
  select.addEventListener('keydown', event => {
    if (event.key === ' ') {
      event.preventDefault();
    }
  });
});
if (selects.length > 0) {
  selects_init();
}
function selects_init() {
  for (let index = 0; index < selects.length; index++) {
    const select = selects[index];
    select_init(select);
  }
  //select_callback();
  document.addEventListener('click', function (e) {
    selects_close(e);
  });
  document.addEventListener('keydown', function (e) {
    if (e.which == 27) {
      selects_close(e);
    }
  });
}
function selects_close(e) {
  const selects = document.querySelectorAll('.select');
  if (!e.target.closest('.select')) {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      const select_body_options = select.querySelector('.select__options');
      select.classList.remove('_active');
      _slideUp(select_body_options, 100);
    }
  }
}
function select_init(select) {
  const select_parent = select.parentElement;
  console.log(select_parent);
  const select_modifikator = select.getAttribute('class');
  const select_selected_option = select.querySelector('option:checked');
  console.log(select_selected_option);
  select.setAttribute('data-default', select_selected_option.value);
  // select.style.display = 'none';

  select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');
  let new_select = select.parentElement.querySelector('.select');
  console.log(new_select);
  new_select.appendChild(select);
  select_item(select);
}
function select_item(select) {
  const select_parent = select.parentElement;
  const select_items = select_parent.querySelector('.select__item');
  const select_options = select.querySelectorAll('option');
  const select_selected_option = select.querySelector('option:checked');
  const select_selected_text = select_selected_option.text;
  const selectOptionData = select_selected_option.dataset.asset ? `${select_selected_option.dataset.asset}` : '';
  console.log(selectOptionData);
  const select_type = select.getAttribute('data-type');
  if (select_items) {
    select_items.remove();
  }

  // let select_type_content = '';
  // if (select_type == 'input') {
  // 	select_type_content = '<div class="select__value"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
  // } else {
  // 	// select_type_content = '<div class="select__value"><span>' + select_selected_text + '</span></div>';
  //   // select_type_content = `<div class="select__value"><img class="select__icon" src="${selectOptionData}" alt=""><span>${select_selected_text}</span></div>`
  // }
  if (selectOptionData) {
    console.log('ss');
    select_type_content = `<div class="select__value"><span><img class="select__icon" src="${selectOptionData}" alt="">${select_selected_text}</span></div>`;
  } else select_type_content = '<div class="select__value"><span>' + select_selected_text + '</span></div>';
  select_parent.insertAdjacentHTML('beforeend', '<div class="select__item">' + '<div class="select__title">' + select_type_content + '</div>' + '<div class="select__options">' + select_get_options(select_options) + '</div>' + '</div></div>');
  select_actions(select, select_parent);
}
function select_actions(original, select) {
  const select_item = select.querySelector('.select__item');
  const select_body_options = select.querySelector('.select__options');
  const select_options = select.querySelectorAll('.select__option');
  const select_type = original.getAttribute('data-type');
  const select_input = select.querySelector('.select__input');
  select_item.addEventListener('click', function () {
    let selects = document.querySelectorAll('.select');
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      const select_body_options = select.querySelector('.select__options');
      if (select != select_item.closest('.select')) {
        select.classList.remove('_active');
        _slideUp(select_body_options, 100);
      }
    }
    _slideToggle(select_body_options, 100);
    select.classList.toggle('_active');
  });
  for (let index = 0; index < select_options.length; index++) {
    const select_option = select_options[index];
    const select_option_value = select_option.getAttribute('data-value');
    const select_option_text = select_option.innerHTML;
    if (select_type == 'input') {
      select_input.addEventListener('keyup', select_search);
    } else {
      if (select_option.getAttribute('data-value') == original.value) {
        select_option.style.display = 'none';
      }
    }
    select_option.addEventListener('click', function () {
      for (let index = 0; index < select_options.length; index++) {
        const el = select_options[index];
        el.style.display = 'flex';
      }
      if (select_type == 'input') {
        select_input.value = select_option_text;
        original.value = select_option_value;
      } else {
        select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
        original.value = select_option_value;
        select_option.style.display = 'none';
      }
    });
  }
}
function select_get_options(select_options) {
  if (select_options) {
    let select_options_content = '';
    for (let index = 0; index < select_options.length; index++) {
      const select_option = select_options[index];
      const select_option_value = select_option.value;
      if (select_option_value != '') {
        const select_option_text = select_option.text;
        const selectOptionData = select_option.dataset.asset ? `${select_option.dataset.asset}` : '';
        if (selectOptionData) {
          select_options_content = select_options_content + `<div data-value="${select_option_value}" class="select__option"><div class="select__icon"><img src="${selectOptionData}" alt=""></div>${select_option_text}</div>`;
        } else {
          select_options_content = select_options_content + `<div data-value="${select_option_value}" class="select__option">${select_option_text}</div>`;
        }
      }
    }
    return select_options_content;
  }
}
function select_search(e) {
  let select_block = e.target.closest('.select ').querySelector('.select__options');
  let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
  let select_search_text = e.target.value.toUpperCase();
  for (let i = 0; i < select_options.length; i++) {
    let select_option = select_options[i];
    let select_txt_value = select_option.textContent || select_option.innerText;
    if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
      select_option.style.display = "";
    } else {
      select_option.style.display = "none";
    }
  }
}
function selects_update_all() {
  let selects = document.querySelectorAll('select');
  if (selects) {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      select_item(select);
    }
  }
}
let _slideUp = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    target.classList.remove('_slide');
  }, duration);
};
let _slideDown = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;
  if (display === 'none') display = 'block';
  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    target.classList.remove('_slide');
  }, duration);
};
let _slideToggle = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    if (window.getComputedStyle(target).display === 'none') {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  }
};

/***/ }),

/***/ "./src/js/components/spollers.js":
/*!***************************************!*\
  !*** ./src/js/components/spollers.js ***!
  \***************************************/
/***/ (() => {

window.addEventListener('resize', spollers());
function spollers() {
  const spollersArray = document.querySelectorAll('[data-spollers]');
  if (spollersArray.length > 0) {
    // Получение обычных слойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    });
    // Инициализация обычных слойлеров
    if (spollersRegular.length) {
      initSpollers(spollersRegular);
    }

    // Инициализация
    function initSpollers(spollersArray) {
      let matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      spollersArray.forEach(spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add('_spoller-init');
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);
        } else {
          spollersBlock.classList.remove('_spoller-init');
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      });
    }
    // Работа с контентом
    function initSpollerBody(spollersBlock) {
      let hideSpollerBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter(item => item.closest('[data-spollers]') === spollersBlock);
        spollerTitles.forEach(spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute('tabindex');
            if (!spollerTitle.classList.contains('_spoller-active')) {
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            spollerTitle.setAttribute('tabindex', '-1');
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }
    function setSpollerAction(e) {
      const el = e.target;
      if (el.closest('[data-spoller]')) {
        const spollerTitle = el.closest('[data-spoller]');
        const spollersBlock = spollerTitle.closest('[data-spollers]');
        const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
        const spollerBody = spollerTitle.nextElementSibling;
        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
        if (!spollersBlock.querySelectorAll('._slide').length) {
          if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
            hideSpollersBody(spollersBlock);
          }
          spollerTitle.classList.toggle('_spoller-active');
          const styleSpollerBody = window.getComputedStyle(spollerBody);
          if (styleSpollerBody.position === 'absolute') {
            spollerBody.classList.toggle('active');
          } else {
            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
          }
        }
        e.preventDefault();
      }
    }
    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
      if (spollerActiveTitle && !spollersBlock.querySelectorAll('._slide').length) {
        spollerActiveTitle.classList.remove('_spoller-active');
        const spollerBody = spollerActiveTitle.nextElementSibling;
        const styleSpollerBody = window.getComputedStyle(spollerBody);
        if (styleSpollerBody.position === 'absolute') {
          spollerBody.classList.remove('active');
        } else {
          _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
        }
      }
    }
    // Закрытие при клике вне спойлера
    const spollersClose = document.querySelectorAll('[data-spoller-close]');
    // if (spollersClose.length) {
    //   document.addEventListener("click", function (e) {
    //     const el = e.target;
    //     if (!el.closest('[data-spollers]')) {
    //       spollersClose.forEach(spollerClose => {
    //         const spollersBlock = spollerClose.closest('[data-spollers]');
    //         if (spollersBlock.classList.contains('_spoller-init')) {
    //           const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
    //           spollerClose.classList.remove('_spoller-active');

    //           const styleSpollerBody = window.getComputedStyle(spollerBody)
    //           if (styleSpollerBody.position === 'absolute') {
    //             spollerBody.classList.remove('active')
    //           } else {
    //             _slideUp(spollerClose.nextElementSibling, spollerSpeed);
    //           }

    //         }
    //       });
    //     }
    //   });
    // }
  }
}
let _slideUp = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    target.classList.remove('_slide');
  }, duration);
};
let _slideDown = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;
  if (display === 'none') display = 'block';
  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    target.classList.remove('_slide');
  }, duration);
};
let _slideToggle = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    if (window.getComputedStyle(target).display === 'none') {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  }
};

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components */ "./src/js/_components.js");

const btnShowPassword = document.querySelectorAll('.input__icon-btn');
btnShowPassword.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    this.classList.toggle('show');
    if (this.classList.contains('show')) {
      this.parentElement.querySelector('.input__control').type = "text";
      this.parentElement.querySelector('.input__control').focus();
    } else {
      this.parentElement.querySelector('.input__control').type = "password";
    }
  });
});
const switchBtns = document.querySelectorAll('.switch-btn');
if (switchBtns) {
  switchBtns.forEach(switchBtn => {
    switchBtn.addEventListener('click', function () {
      this.classList.toggle('switch-on');
    });
  });
}
const forms = document.querySelectorAll('.form');
if (forms) {
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
    });
  });
}
const inputs = document.querySelectorAll('.authentification__input');
inputs.forEach((input, index) => {
  input.addEventListener('keydown', e => {
    if (e.key >= 0 && e.key <= 9) {
      inputs[index].value = '';
      if (index < inputs.length - 1) {
        setTimeout(() => inputs[index + 1].focus(), 10);
      }
    } else if (e.key === 'Backspace') {
      if (index > 0) {
        setTimeout(() => inputs[index - 1].focus(), 10);
      }
    } else {
      e.preventDefault();
    }
  });
  input.addEventListener('input', e => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = value;
  });
});
const progressElements = document.querySelectorAll('.progressbar');
progressElements.forEach(elem => {
  const value = +elem.querySelector('.percent').innerText;
  if (value >= 50) {
    elem.classList.add('over_50');
  } else {
    elem.classList.remove('over_50');
  }
  const deg = 360 * value / 100 + 180;
  elem.querySelector('.piece.right').style.transform = `rotate(${deg}deg)`;
});
})();

/******/ })()
;