/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/wp-easy-social-links-block/edit.js"
/*!************************************************!*\
  !*** ./src/wp-easy-social-links-block/edit.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/wp-easy-social-links-block/editor.scss");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _socialsListRender__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./socialsListRender */ "./src/wp-easy-social-links-block/socialsListRender.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */






function Edit({
  attributes,
  setAttributes
}) {
  // Initialize the block props container hook inside the function body
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)();

  //No need to initialize state here as defaults/global settings are fetched from API on mount

  // Local states mirroring the Mount lifecycle architecture
  const [globalSettings, setGlobalSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(null);

  // --- FETCH THE GLOBAL SETTINGS ON MOUNT ---
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6___default()({
      path: '/wp/v2/settings'
    }).then(response => {
      const data = response.wp_easy_socials_links_data;
      if (data) {
        setGlobalSettings(data);
      }
    }).catch(err => {
      console.error('Error loading block fallback settings:', err);
    });
  }, []);

  // Render standard loading placeholder track while dynamic fetch stays active
  if (!globalSettings) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loading Global Social Options...', 'wp-easy-social-links'),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, {})
      })
    });
  }

  // Check if block local attributes carry explicit populating fields
  const blockSocialHasData = attributes.social && attributes.social.length > 0 && (attributes.social[0].label || attributes.social[0].logo);
  const activeSocialList = blockSocialHasData ? attributes.social : globalSettings.social;

  // Override Global settings since Local attribute takes precedence
  const socialDataPayload = {
    social: activeSocialList,
    showHideSocials: attributes.showHideSocials !== undefined ? attributes.showHideSocials : globalSettings.showHideSocials !== false,
    showText: attributes.showText !== undefined ? attributes.showText : globalSettings.showText !== false,
    hasBorder: attributes.hasBorder !== undefined ? attributes.hasBorder : globalSettings.hasBorder !== false,
    linkGap: attributes.linkGap || globalSettings.linkGap,
    textIconGap: attributes.textIconGap || globalSettings.textIconGap,
    fontColor: attributes.fontColor || globalSettings.fontColor,
    fontSize: attributes.fontSize || globalSettings.fontSize,
    iconSize: attributes.iconSize || globalSettings.iconSize,
    labelPosition: attributes.labelPosition || globalSettings.labelPosition,
    iconBgColor: attributes.iconBgColor || globalSettings.iconBgColor,
    borderColor: attributes.borderColor || globalSettings.borderColor,
    borderWidth: attributes.borderWidth || globalSettings.borderWidth
  };

  // Check if active profile links loop resolves to an unpopulated state map
  const isListEmpty = !socialDataPayload.social || socialDataPayload.social.every(row => !row.label && !row.logo);

  //console.log( 'Edit Mount Render Payload:', socialDataPayload );

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    ...blockProps,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display Options', 'wp-easy-social-links'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Social Icons', 'wp-easy-social-links'),
          checked: socialDataPayload.showHideSocials,
          onChange: val => setAttributes({
            showHideSocials: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Text Labels', 'wp-easy-social-links'),
          checked: socialDataPayload.showText,
          onChange: val => setAttributes({
            showText: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Icon Borders', 'wp-easy-social-links'),
          checked: socialDataPayload.hasBorder,
          onChange: val => setAttributes({
            hasBorder: val
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "marcels-easy-socials-block-editor-canvas",
      children: !socialDataPayload.showHideSocials ?
      /*#__PURE__*/
      // Muted placeholder warning boundary box
      (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80px',
          background: '#f0f0f1',
          borderRadius: '6px',
          border: '1px dashed #ccd0d4',
          padding: '10px'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("p", {
          style: {
            color: '#646970',
            fontStyle: 'italic',
            fontSize: '13px',
            margin: 0
          },
          children: ["\u274C ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Social block display is toggled hidden.', 'wp-easy-social-links')]
        })
      }) : isListEmpty ?
      /*#__PURE__*/
      // Empty Slate Fallback Notification
      (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p", {
        style: {
          color: '#757575',
          fontStyle: 'italic',
          fontSize: '13px',
          padding: '10px 0'
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('You have not added any social links yet. Add them in the block sidebar or global options.', 'wp-easy-social-links')
      }) :
      /*#__PURE__*/
      // Render live, social links grid directly onto page
      (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_socialsListRender__WEBPACK_IMPORTED_MODULE_4__["default"], {
        socialData: socialDataPayload
      })
    })]
  });
}

/***/ },

/***/ "./src/wp-easy-social-links-block/index.js"
/*!*************************************************!*\
  !*** ./src/wp-easy-social-links-block/index.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/wp-easy-social-links-block/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/wp-easy-social-links-block/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/wp-easy-social-links-block/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/wp-easy-social-links-block/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ },

/***/ "./src/wp-easy-social-links-block/save.js"
/*!************************************************!*\
  !*** ./src/wp-easy-social-links-block/save.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */

function save({
  attributes
}) {
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save();

  // Packaged attributes to match the edit.js logic structure
  const socialDataPayload = {
    social: attributes.social || [],
    showHideSocials: attributes.showHideSocials !== undefined ? attributes.showHideSocials : true,
    showText: attributes.showText !== undefined ? attributes.showText : true,
    hasBorder: attributes.hasBorder !== undefined ? attributes.hasBorder : true,
    linkGap: attributes.linkGap || '',
    textIconGap: attributes.textIconGap || '',
    fontColor: attributes.fontColor || '',
    fontSize: attributes.fontSize || '',
    iconSize: attributes.iconSize || '',
    labelPosition: attributes.labelPosition || '',
    iconBgColor: attributes.iconBgColor || '',
    borderColor: attributes.borderColor || '',
    borderWidth: attributes.borderWidth || ''
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ...blockProps,
    className: "wp-easy-social-links-item-container",
    "data-config": JSON.stringify(socialDataPayload)
  });
}

/***/ },

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

/***/ "./src/wp-easy-social-links-block/editor.scss"
/*!****************************************************!*\
  !*** ./src/wp-easy-social-links-block/editor.scss ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/wp-easy-social-links-block/style.scss"
/*!***************************************************!*\
  !*** ./src/wp-easy-social-links-block/style.scss ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

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

/***/ },

/***/ "./src/wp-easy-social-links-block/block.json"
/*!***************************************************!*\
  !*** ./src/wp-easy-social-links-block/block.json ***!
  \***************************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/wp-easy-social-links-block","version":"0.1.0","title":"WP Easy Social Links","category":"dashicons-share","icon":"share-alt","description":"A Simple Social media plugin for adding social media links to your WordPress website.","example":{},"supports":{"html":false},"attributes":{"social":{"type":"array","default":[]},"showHideSocials":{"type":"boolean"},"showText":{"type":"boolean"},"hasBorder":{"type":"boolean"},"linkGap":{"type":"string"},"textIconGap":{"type":"string"},"fontColor":{"type":"string"},"fontSize":{"type":"string"},"iconSize":{"type":"string"},"labelPosition":{"type":"string"},"iconBgColor":{"type":"string"},"borderColor":{"type":"string"},"borderWidth":{"type":"string"}},"textdomain":"marcels-easy-socials","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js","render":"file:./render.php"}');

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"wp-easy-social-links-block/index": 0,
/******/ 			"wp-easy-social-links-block/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkwp_easy_social_links"] = globalThis["webpackChunkwp_easy_social_links"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["wp-easy-social-links-block/style-index"], () => (__webpack_require__("./src/wp-easy-social-links-block/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map