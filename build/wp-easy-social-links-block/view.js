/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/wp-easy-social-links-block/socialsListRender.js"
/*!*************************************************************!*\
  !*** ./src/wp-easy-social-links-block/socialsListRender.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const SocialsListRenderer = ({
  socialData
}) => {
  // Safety check for ensuring the data structures are ready before running mapped iterations
  if (!socialData || !Array.isArray(socialData.social)) {
    return null;
  }
  if (!socialData.showHideSocials) {
    // Render nothing on frontend if the block is set to hidden, in editor we'll show a placeholder
    return null;
  }

  // Map flex directions based on label position
  const flexDirections = {
    left: 'row-reverse',
    right: 'row',
    top: 'column-reverse',
    bottom: 'column'
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "wp-easy-social-links-box",
    children: [socialData.social.map((row, index) => {
      if (!row.label && !row.logo) return null;

      // border control check on individual row item first, fallback to global
      const itemHasBorder = row.hasBorder !== undefined ? row.hasBorder : socialData.hasBorder;

      // Defined item-specific inline styles
      const itemStyle = {
        flexDirection: flexDirections[socialData.labelPosition] || 'row',
        gap: socialData.textIconGap,
        color: socialData.fontColor,
        fontSize: socialData.fontSize,
        padding: itemHasBorder ? '8px 14px' : '0px',
        background: itemHasBorder ? '#fff' : 'transparent',
        boxShadow: itemHasBorder ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
        border: itemHasBorder ? `${socialData.borderWidth} solid ${socialData.borderColor}` : 'none'
      };
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("a", {
        href: row.url || '#',
        target: "_blank",
        rel: "noopener noreferrer",
        className: "wp-easy-social-links-item",
        style: itemStyle,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          className: "wp-easy-social-links-icon-wrapper icon-wrapper",
          children: row.logo ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
            src: row.logo,
            alt: "",
            className: "wp-easy-social-links-img"
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: "wp-easy-social-links-fallback-icon",
            children: "\uD83D\uDD17"
          })
        }), socialData.showText && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          className: "wp-easy-social-links-text-node",
          children: row.label || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Unnamed Link', 'wp-easy-social-links')
        })]
      }, index);
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("style", {
      children: `
                    .wp-easy-social-links-box {
                        display: flex;
                        flex-wrap: wrap;
                        gap: ${socialData.linkGap};
                        margin-top: 20px;
                        width: 100%;
                    }
                    .wp-easy-socials-links-item {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: ${flexDirections[socialData.labelPosition] || 'row'};
                        gap: ${socialData.textIconGap};
                        text-decoration: none;
                        font-weight: 500;
                        max-width: 220px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        
                        color: ${socialData.fontColor};
                        font-size: ${socialData.fontSize};
                        padding: ${socialData.hasBorder ? '8px 14px' : '0px'};
                        background: ${socialData.hasBorder ? '#fff' : 'transparent'};
                        box-shadow: ${socialData.hasBorder ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'};
                        border-radius: 20px;
                        border: ${socialData.hasBorder ? `${socialData.borderWidth} solid ${socialData.borderColor}` : 'none'};
                    }

                    .wp-easy-social-links-icon-wrapper {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        background-color: ${socialData.iconBgColor};
                        border-radius: 4px; 
                        padding: 4px;
                        flex-shrink: 0;
                    }

                    .wp-easy-social-links-img {
                        width: ${socialData.iconSize};
                        height: ${socialData.iconSize};
                        object-fit: contain;
                    }
                    .wp-easy-social-links-fallback-icon {
                        width: ${socialData.iconSize};
                        height: ${socialData.iconSize};
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #f0f0f0;
                        border-radius: 50%;
                        font-size: calc(${socialData.iconSize} * 0.6);
                    }
                    .wp-easy-social-links-text-node {
                        line-height: 1;
                    }
                `
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocialsListRenderer);

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ }

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************************!*\
  !*** ./src/wp-easy-social-links-block/view.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socialsListRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socialsListRender */ "./src/wp-easy-social-links-block/socialsListRender.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */



/* eslint-disable no-console */
// console.log( 'Hello World! (from create-block-marcels-socials-plugin block)' );
/* eslint-enable no-console */

const viewEasySocials = () => {
  // Locate all block instances on the page that haven't been rendered yet and render them
  document.querySelectorAll('.wp-easy-social-links-item-container:not([data-rendered="true"])').forEach(container => {
    try {
      const payload = JSON.parse(container.dataset.config || '{}');
      const hasSocials = payload.social?.some(row => row.label || row.logo);

      // Skip block rendering if it's set to be hidden or has no social links
      if (!payload.showHideSocials || !hasSocials) {
        container.remove();
        return;
      }
      // Render the React component into the container
      (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(container).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_socialsListRender__WEBPACK_IMPORTED_MODULE_1__["default"], {
        socialData: payload
      }));
      container.dataset.rendered = 'true';
    } catch (err) {
      console.error('WP Easy Social Links Render Error:', err);
    }
  });
};
// Run the rendering function on initial page load and whenever new content is loaded (e.g., via AJAX)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', viewEasySocials);
} else {
  viewEasySocials();
}
})();

/******/ })()
;
//# sourceMappingURL=view.js.map