/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/wp-easy-social-links-admin/SettingsPage.js"
/*!********************************************************!*\
  !*** ./src/wp-easy-social-links-admin/SettingsPage.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _socialsPanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./socialsPanel */ "./src/wp-easy-social-links-admin/socialsPanel.js");
/* harmony import */ var _globalSettings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./globalSettings */ "./src/wp-easy-social-links-admin/globalSettings.js");
/* harmony import */ var _about__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./about */ "./src/wp-easy-social-links-admin/about.js");
/* harmony import */ var _socialsPreview__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./socialsPreview */ "./src/wp-easy-social-links-admin/socialsPreview.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);






 // Native WordPress SVG UI icons



 // New preview component

const SettingsPage = () => {
  // --- STATE MANAGEMENT ---

  // Initialize clear state structure since we're now initializing with defaults from server on activation
  const [socialData, setSocialData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [isSaving, setIsSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // --- NOTICES SETUP ---
  const notices = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select(_wordpress_notices__WEBPACK_IMPORTED_MODULE_5__.store).getNotices(), []);
  const {
    createSuccessNotice,
    createErrorNotice,
    removeNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_5__.store);

  // --- LOAD DATA ON MOUNT ---
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
      path: '/wp/v2/settings'
    }).then(response => {
      const data = response.wp_easy_social_links_data;
      // populated data arrays from DB activation fallback
      if (data) {
        setSocialData(data);
      }
    }).catch(err => {
      console.error('Error loading settings:', err);
      createErrorNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to load settings data.', 'wp-easy-social-links'));
    });
  }, []);

  // --- SAVE DATA ACTION ---
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/wp/v2/settings',
        method: 'POST',
        data: {
          marcels_easy_socials_data: socialData // Sends the fully bundled state object
        }
      });
      createSuccessNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Settings saved successfully!', 'wp-easy-social-links'), {
        type: 'snackbar'
      });
    } catch (error) {
      // Log the detailed error to the developer console for debugging purposes
      console.error('Internal Save Error:', error);

      // Generic notice string definition
      let generalizedMessage = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('An error occurred while saving your configuration.', 'wp-easy-social-links');

      /**
       * Check if is is a native WP REst validation failure and obfuscate the message to a more user-friendly, non-technical string.
       * This prevents exposing raw error details that may contain sensitive information or be confusing to end users, while still providing actionable feedback.
       */
      if (error.code === 'rest_invalid_param' || error.status === 400) {
        generalizedMessage = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('One or more styling selections contain an invalid format.', 'wp-easy-social-links');
      } else if (error.message) {
        // Fall back to the original error message if it's not a validation error
        generalizedMessage = error.message;
      }

      // Pass only the sanitized, safe message string to your notice library
      createErrorNotice(generalizedMessage);
    } finally {
      setIsSaving(false);
    }
  };

  // Prevent rendering child panels until state payload checks are successful
  if (!socialData) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      className: "welcome-panel",
      style: {
        padding: '20px'
      },
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Loading settings...', 'wp-easy-social-links')
    });
  }
  const tabs = [{
    name: 'socials',
    title: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
      className: "tab-label",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('SOCIAL LINKS', 'wp-easy-social-links')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dashicon, {
        icon: "share",
        style: {
          marginLeft: '10px;'
        }
      })]
    })
  }, {
    name: 'global',
    title: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
      className: "tab-label",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('GLOBAL SETTINGS', 'wp-easy-social-links')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dashicon, {
        icon: "admin-generic",
        style: {
          marginLeft: '10px;'
        }
      })]
    })
  }, {
    name: 'about',
    title: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
      className: "tab-label",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('ABOUT', 'wp-easy-social-links')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dashicon, {
        icon: "search",
        style: {
          marginLeft: '10px;'
        }
      })]
    })
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
    className: "wrap",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.NoticeList, {
      notices: notices,
      onRemove: removeNotice,
      style: {
        marginBottom: '20px'
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("h1", {
      className: "wp-heading-inline",
      style: {
        marginBottom: '20px'
      },
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Marcels Easy Socials Settings', 'wp-easy-social-links')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("hr", {
      className: "wp-header-end"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Panel, {
      className: "wp-easy-socials-panel",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
        className: "marcels-socials-tabs",
        orientation: "horizontal",
        initialTabName: "socials",
        tabs: tabs,
        style: {
          background: "#fff"
        },
        children: tab => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
          style: {
            padding: '0',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            style: {
              flex: 1,
              padding: '24px 10px'
            },
            children: [tab.name === 'socials' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, {
              align: "start",
              gap: 6,
              className: "wp-easy-socials-responsive-flex",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, {
                className: "wp-easy-socials-form-column",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "tab-content",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_socialsPanel__WEBPACK_IMPORTED_MODULE_6__["default"], {
                    socialData: socialData,
                    setSocialData: setSocialData
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, {
                style: {
                  flex: '1',
                  position: 'sticky',
                  top: '20px'
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_socialsPreview__WEBPACK_IMPORTED_MODULE_9__["default"], {
                  socialData: socialData
                })
              })]
            }), tab.name === 'global' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, {
              align: "start",
              gap: 6,
              className: "wp-easy-socials-responsive-flex",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, {
                className: "wp-easy-socials-form-column",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "tab-content",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_globalSettings__WEBPACK_IMPORTED_MODULE_7__["default"], {
                    socialData: socialData,
                    setSocialData: setSocialData
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, {
                style: {
                  flex: '1',
                  position: 'sticky',
                  top: '20px'
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_socialsPreview__WEBPACK_IMPORTED_MODULE_9__["default"], {
                  socialData: socialData
                })
              })]
            }), tab.name === 'about' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "tab-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_about__WEBPACK_IMPORTED_MODULE_8__["default"], {})
            })]
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, {
        justify: "flex-end",
        className: "wp-easy-socials-footer-actions",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          variant: "primary",
          isBusy: isSaving,
          disabled: isSaving,
          onClick: handleSave,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Settings', 'wp-easy-social-links')
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("style", {
      children: `
                    .wrap {
                        margin: 10px !important;
                    }

                    .components-panel {
                        padding: 20px !important;
                    }

                    .tab-label .dashicons {
                        margin-left: 10px;
                    }

                    .components-tab-panel__tabs-item.is-active:after {
                        outline: none !important;
                    }  

                    .components-tab-panel__tabs-item.is-active {
                        background: #f7f7f7;
                    }

                    .components-tab-panel__tabs {
                        border-bottom: '1px solid #e0e0e0 !important';
                    }

                    .wp-easy-socials-panel {
                        margin-top:'20px';
                        background: '#fff';
                        border: '1px solid #e0e0e0';
                        padding: '20px';
                    }

                    .wp-easy-socials-responsive-flex {
                        width: 100%;
                        flex-direction: column;
                    }

                    .wp-easy-socials-form-column {
                        flex: 1;
                    }

                    .wp-easy-socials-preview-column {
                        flex: 1;
                        top: '20px';
                    }

                    .wp-easy-socials-footer-actions {
                        margin-top: '12px';
                    }

                     @media (min-width: 782px) {

                        .wp-easy-socials-responsive-flex {
                            flex-direction: row;
                        }
                        .wp-easy-socials-form-column {
                            flex: 0 0 65%;
                            min-width: 400px;
                        }
                        .wp-easy-socials-preview-column {
                            flex: 1;
                            position: 'sticky';
                            top: '20px';
                        }
                    }
                `
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsPage);

/***/ },

/***/ "./src/wp-easy-social-links-admin/about.js"
/*!*************************************************!*\
  !*** ./src/wp-easy-social-links-admin/about.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const About = () => {
  return /*#__PURE__*/ /* Outer layout flex container wrapper stretched to 100% width */(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Flex, {
    direction: "column",
    align: "stretch",
    gap: 4,
    style: {
      width: '100%',
      maxWidth: '100%'
    },
    style: {
      borderBottom: '1px solid #f0f0f0',
      paddingBottom: '16px',
      marginBottom: '8px'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalText, {
        as: "p",
        style: {
          margin: 0,
          fontStyle: 'italic',
          fontSize: '14px',
          color: '#50575e'
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This is a simple plugin to help you quickly add your company social media icons and links to your WordPress site.', 'wp-easy-social-links')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalText, {
        as: "p",
        style: {
          margin: 0,
          fontStyle: 'italic',
          fontSize: '14px',
          color: '#50575e'
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add widget to your site by dragging it from the Gutenberg Widgets panel and dropping it where you want it to appear on the page.', 'wp-easy-social-links ')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
      style: {
        marginTop: '10px'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Flex, {
        direction: "row",
        align: "start",
        gap: 20,
        justify: "flex-start",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ExternalLink, {
            href: "https://yourcompany.com",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Visit our Help Center', 'wp-easy-social-links')
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ExternalLink, {
            href: "https://profiles.wordpress.org/marcellus89/",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('View developer profile on WordPress.org', 'wp-easy-social-links')
          })
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (About);

/***/ },

/***/ "./src/wp-easy-social-links-admin/globalSettings.js"
/*!**********************************************************!*\
  !*** ./src/wp-easy-social-links-admin/globalSettings.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const GeneralSettings = ({
  socialData,
  setSocialData
}) => {
  // Critical safety boundary check to prevent crashes during async database loading latency
  if (!socialData) {
    return null;
  }
  const updateSettingKey = (propertyKey, val) => {
    setSocialData({
      ...socialData,
      [propertyKey]: val
    });
  };

  //console.log( 'Global Settings Render Payload:', socialData );

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Flex, {
    direction: "column",
    align: "stretch",
    gap: 5,
    style: {
      width: '100%',
      padding: '10px 0'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
      style: {
        borderBottom: '1px solid #f0f0f0',
        paddingBottom: '16px'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalText, {
        as: "p",
        style: {
          margin: 0,
          fontStyle: 'italic',
          fontSize: '14px',
          color: '#50575e'
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Configure your block layout global styles and rendering options here.', 'wp-easy-socials-links')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
      style: {
        borderBottom: '1px solid #f0f0f0',
        paddingTop: '16px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
        className: "components-base-control__label",
        style: {
          display: 'block',
          marginBottom: '16px',
          letterSpacing: '0.5px',
          fontWeight: '500'
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('VISIBILITY', 'wp-easy-socials-links')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Flex, {
        direction: "row",
        align: "stretch",
        gap: 4,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
          style: {
            flexBasis: '50%',
            maxWidth: '50%'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ToggleControl, {
            label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              style: {
                color: '#50575e',
                fontSize: '13px',
                fontWeight: 'normal',
                textTransform: 'Capitalize'
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show Icons', 'wp-easy-socials-links')
            }),
            help: socialData.showHideSocials !== false ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Social platform logos will be visible sitewide.', 'wp-easy-socials-links') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Logos will be hidden sitewide', 'wp-easy-socials-links'),
            checked: !!socialData.showHideSocials,
            onChange: val => updateSettingKey('showHideSocials', val)
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
          style: {
            flexBasis: '50%',
            maxWidth: '50%'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ToggleControl, {
            label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              style: {
                color: '#50575e',
                fontSize: '13px',
                fontWeight: 'normal',
                textTransform: 'Capitalize'
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Display Platform Text Labels', 'wp-easy-socials-links')
            }),
            help: socialData.showText !== false ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text names will render alongside icons.', 'wp-easy-socials-links') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Only icons will be visible.', 'wp-easy-socials-links'),
            checked: !!socialData.showText,
            onChange: val => updateSettingKey('showText', val)
          }), socialData.showText !== false && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.RadioControl, {
            label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              style: {
                color: '#50575e',
                fontSize: '13px',
                fontWeight: 'normal',
                textTransform: 'Capitalize'
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text Position', 'wp-easy-socials-links')
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Choose where the platform name sits relative to the logo.', 'wp-easy-socials-links'),
            selected: socialData.labelPosition,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Left', 'wp-easy-socials-links'),
              value: 'left'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Right', 'wp-easy-socials-links'),
              value: 'right'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top', 'wp-easy-socials-links'),
              value: 'top'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom', 'wp-easy-socials-links'),
              value: 'bottom'
            }],
            onChange: val => updateSettingKey('labelPosition', val)
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
      style: {
        borderBottom: '1px solid #f0f0f0',
        paddingBottom: '16px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
        className: "components-base-control__label",
        style: {
          display: 'block',
          marginBottom: '16px',
          letterSpacing: '0.5px',
          fontWeight: '500'
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('SPACING', 'wp-easy-socials-links')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Flex, {
        direction: "row",
        align: "stretch",
        gap: 4,
        className: "subtle-field-wrapper",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
          style: {
            flexBasis: '50%',
            maxWidth: '50%'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
            label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              style: {
                color: '#50575e',
                fontSize: '13px',
                fontWeight: 'normal',
                textTransform: 'Capitalize'
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icons Gap', 'wp-easy-socials-links')
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter a CSS spacing value (e.g., 16px, 1.5rem, 2em).', 'wp-easy-socials-links   '),
            value: socialData.linkGap,
            placeholder: "16px",
            onChange: val => updateSettingKey('linkGap', val),
            style: {
              maxWidth: '60px'
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
          style: {
            flexBasis: '50%',
            maxWidth: '50%'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
            label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              style: {
                color: '#50575e',
                fontSize: '13px',
                fontWeight: 'normal',
                textTransform: 'Capitalize'
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text & Icon Gap', 'wp-easy-socials-links')
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Gap inside card.', 'wp-easy-socials-links'),
            value: socialData.textIconGap,
            placeholder: "10px",
            onChange: val => updateSettingKey('textIconGap', val),
            style: {
              maxWidth: '60px'
            }
          })
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
      style: {
        borderBottom: '1px solid #f0f0f0',
        paddingBottom: '16px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
        className: "components-base-control__label",
        style: {
          display: 'block',
          marginBottom: '16px',
          letterSpacing: '0.5px',
          fontWeight: '500'
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('CONTENT COLOR', 'wp-easy-socials-links')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Flex, {
        direction: "row",
        align: "stretch",
        gap: 4,
        style: {
          width: '100%'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
          style: {
            flexBasis: '50%',
            maxWidth: '50%'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            className: "components-base-control__label",
            style: {
              display: 'block',
              marginBottom: '12px',
              color: '#50575e',
              fontSize: '13px',
              fontWeight: 'normal'
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link Font Typography Color', 'wp-easy-socials-links')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Dropdown, {
            popoverProps: {
              placement: 'bottom-start'
            },
            renderToggle: ({
              isOpen,
              onToggle
            }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
              variant: "secondary",
              onClick: onToggle,
              "aria-expanded": isOpen,
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                justifyContent: 'flex-start'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                style: {
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: socialData.fontColor,
                  border: '1px solid rgba(0,0,0,0.2)',
                  flexShrink: 0
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                style: {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                children: socialData.fontColor
              })]
            }),
            renderContent: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Flex, {
              direction: "column",
              align: "stretch",
              gap: 3,
              style: {
                padding: '16px',
                background: '#fff',
                width: '245px'
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ColorPicker, {
                color: socialData.fontColor,
                onChange: val => updateSettingKey('fontColor', val),
                enableAlpha: true,
                defaultValue: "#1d2327"
              })
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
          style: {
            flexBasis: '50%',
            maxWidth: '50%'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            className: "components-base-control__label",
            style: {
              display: 'block',
              marginBottom: '12px',
              color: '#50575e',
              fontSize: '13px',
              fontWeight: 'normal'
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon Background Color', 'wp-easy-socials-links')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Dropdown, {
            popoverProps: {
              placement: 'bottom-start'
            },
            renderToggle: ({
              isOpen,
              onToggle
            }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
              variant: "secondary",
              onClick: onToggle,
              "aria-expanded": isOpen,
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                justifyContent: 'flex-start'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                style: {
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: socialData.iconBgColor,
                  border: '1px solid rgba(0,0,0,0.2)',
                  flexShrink: 0
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                style: {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                children: socialData.iconBgColor === 'transparent' || !socialData.iconBgColor ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Color', 'wp-easy-socials-links') : socialData.iconBgColor
              })]
            }),
            renderContent: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Flex, {
              direction: "column",
              align: "stretch",
              gap: 3,
              style: {
                padding: '16px',
                background: '#fff',
                width: '245px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ColorPicker, {
                color: socialData.iconBgColor,
                onChange: val => updateSettingKey('iconBgColor', val),
                enableAlpha: true,
                defaultValue: "transparent"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
                isLink: true,
                isDestructive: true,
                onClick: () => updateSettingKey('iconBgColor', 'transparent'),
                style: {
                  alignSelf: 'flex-start'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear (Transparent)', 'wp-easy-socials-links')
              })]
            })
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
      style: {
        borderBottom: '1px solid #f0f0f0',
        paddingBottom: '16px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
        className: "components-base-control__label",
        style: {
          display: 'block',
          marginBottom: '16px',
          letterSpacing: '0.5px',
          fontWeight: '500'
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('SIZE', 'wp-easy-socials-links')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Flex, {
        direction: "row",
        align: "stretch",
        gap: 4,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
          style: {
            flexBasis: '50%',
            maxWidth: '50%'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
            label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              style: {
                color: '#50575e',
                fontSize: '13px',
                fontWeight: 'normal',
                textTransform: 'Capitalize'
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Size', 'wp-easy-socials-links')
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter a typography size value (e.g., 14px, 1rem).', 'wp-easy-socials-links'),
            value: socialData.fontSize,
            placeholder: "14px",
            onChange: val => updateSettingKey('fontSize', val),
            style: {
              maxWidth: '60px'
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
          style: {
            flexBasis: '50%',
            maxWidth: '50%'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
            label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              style: {
                color: '#50575e',
                fontSize: '13px',
                fontWeight: 'normal',
                textTransform: 'Capitalize'
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon Dimensions', 'wp-easy-socials-links')
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter the icon width and height (e.g., 20px, 24px).', 'wp-easy-socials-links'),
            value: socialData.iconSize,
            placeholder: "20px",
            onChange: val => updateSettingKey('iconSize', val),
            style: {
              maxWidth: '60px'
            }
          })
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
        className: "components-base-control__label",
        style: {
          display: 'block',
          marginBottom: '16px',
          letterSpacing: '0.5px',
          fontWeight: '500'
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('BORDER', 'wp-easy-socials-links')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Flex, {
        direction: "column",
        align: "stretch",
        gap: 4,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ToggleControl, {
          label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
            style: {
              color: '#50575e',
              fontSize: '13px',
              fontWeight: 'normal',
              textTransform: 'Capitalize'
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show Links Border', 'wp-easy-socials-links')
          }),
          help: socialData.hasBorder ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('A clean border boundary line will wrap the badges.', 'wp-easy-socials-links') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Links display without border grids.', 'wp-easy-socials-links'),
          checked: !!socialData.hasBorder,
          onChange: val => updateSettingKey('hasBorder', val)
        }), !!socialData.hasBorder && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Flex, {
          direction: "row",
          align: "stretch",
          gap: 4,
          style: {
            width: '100%'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
            style: {
              flexBasis: '50%',
              maxWidth: '50%'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
              label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                style: {
                  color: '#50575e',
                  fontSize: '13px',
                  fontWeight: 'normal',
                  textTransform: 'Capitalize'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Border Width', 'wp-easy-socials-links')
              }),
              help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Specify thickness (e.g., 1px, 2px).', 'wp-easy-socials-links'),
              value: socialData.borderWidth,
              placeholder: "1px",
              onChange: val => updateSettingKey('borderWidth', val),
              style: {
                maxWidth: '60px'
              }
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
            style: {
              flexBasis: '50%',
              maxWidth: '50%'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
              className: "components-base-control__label",
              style: {
                display: 'block',
                marginBottom: '12px',
                color: '#50575e',
                fontSize: '13px',
                fontWeight: 'normal'
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Border Color', 'wp-easy-socials-links')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Dropdown, {
              popoverProps: {
                placement: 'bottom-start'
              },
              renderToggle: ({
                isOpen,
                onToggle
              }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
                variant: "secondary",
                onClick: onToggle,
                "aria-expanded": isOpen,
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  justifyContent: 'flex-start'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                  style: {
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: socialData.borderColor,
                    border: '1px solid rgba(0,0,0,0.2)',
                    flexShrink: 0
                  }
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                  style: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  children: socialData.borderColor
                })]
              }),
              renderContent: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Flex, {
                direction: "column",
                align: "stretch",
                gap: 3,
                style: {
                  padding: '16px',
                  background: '#fff',
                  width: '245px'
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ColorPicker, {
                  color: socialData.borderColor,
                  onChange: val => updateSettingKey('borderColor', val),
                  enableAlpha: true,
                  defaultValue: "#ccd0d4"
                })
              })
            })]
          })]
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeneralSettings);

/***/ },

/***/ "./src/wp-easy-social-links-admin/socialsPanel.js"
/*!********************************************************!*\
  !*** ./src/wp-easy-social-links-admin/socialsPanel.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/image.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/plus.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/trash.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);




 // Native WordPress SVG UI icons

// DESTRUCTURE PROPS PASSED FROM PARENT

const SocialsPanel = ({
  socialData,
  setSocialData
}) => {
  // Prevent crashes during async data loads
  if (!socialData || !Array.isArray(socialData.social)) {
    return null;
  }

  // --- MARCEL's SOCIALS CUSTOM MEDIA UPLOADER LOGIC ---
  //Native WP Media Uploader Logic to Open the standard WP Media Library frame
  const openMediaLibrary = onSelectAction => {
    // Safe check to verify that the core WordPress media API script is ready
    if (!window.wp || !window.wp.media) {
      console.error('WordPress media framework is not enqueued.');
      return;
    }
    const frame = window.wp.media({
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select or Upload Media', 'wp-easy-social-links'),
      // Updated text domain
      button: {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use this media', 'wp-easy-social-links')
      },
      multiple: false
    });
    frame.on('select', () => {
      const attachment = frame.state().get('selection').first().toJSON();
      // This passes the attachment object down to the updated helper callback
      onSelectAction({
        id: attachment.id,
        url: attachment.url
      });
    });
    frame.open();
  };

  // --- REPEATER ACTIONS ---

  // Add a new blank row structure to the repeater array
  const addRepeaterRow = () => {
    const updatedSocials = [...socialData.social, {
      label: '',
      url: '',
      logo: ''
    }];
    setSocialData({
      ...socialData,
      social: updatedSocials
    });
  };

  // Delete a specific row by its array position index
  const removeRepeaterRow = indexToKill => {
    const updatedSocials = socialData.social.filter((_, index) => index !== indexToKill);
    setSocialData({
      ...socialData,
      social: updatedSocials
    });
  };

  // Dynamically update of field strings inside a single array dictionary item
  const updateField = (index, propertyKey, value) => {
    const updatedSocials = socialData.social.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [propertyKey]: value
        };
      }
      return item;
    });
    setSocialData({
      ...socialData,
      social: updatedSocials
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      },
      children: socialData.social.map((row, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, {
        align: "end",
        gap: 4,
        style: {
          borderBottom: '1px solid #f0f0f0',
          paddingBottom: '16px',
          marginBottom: '8px',
          alignItems: 'center'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, {
          className: "wp-easy-social-links-logo-column",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            style: {
              position: 'relative',
              width: '55px',
              height: '55px'
            },
            children: [row.logo ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("img", {
              className: "wp-easy-social-links-logo",
              src: row.logo,
              onClick: () => openMediaLibrary(media => updateField(index, 'logo', media.url)),
              alt: "Selected logo",
              style: {
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                cursor: 'pointer',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              variant: "secondary",
              onClick: () => openMediaLibrary(media => updateField(index, 'logo', media.url)),
              style: {
                width: '60px',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"]
              })
            }), row.logo && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              isDestructive: true,
              onClick: () => updateField(index, 'logo', ''),
              style: {
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                padding: 0,
                minWidth: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px'
              },
              children: "\u2715"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
            className: "components-base-control__label",
            style: {
              display: 'block',
              marginTop: '8px',
              fontStyle: 'italic',
              color: '#50575e'
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Socio Icon', 'wp-easy-social-links')
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, {
          className: "wp-easy-social-links-field-inputs-column",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, {
            className: "platform-label",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Social Platform Label', 'wp-easy-social-links'),
              value: row.label,
              placeholder: "e.g., GitHub",
              onChange: val => updateField(index, 'label', val)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, {
            className: "platform-url",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Social Platform URL', 'wp-easy-social-links'),
              value: row.url,
              placeholder: "https://...",
              onChange: val => updateField(index, 'url', val)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, {
            className: "platform-delete",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              variant: "secondary",
              isDestructive: true,
              onClick: () => removeRepeaterRow(index),
              style: {
                marginTop: '15px'
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]
              })
            })
          })]
        })]
      }, index))
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, {
      justify: "flex-start",
      style: {
        marginTop: '12px'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "secondary",
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
        onClick: addRepeaterRow,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add New Social Link', 'wp-easy-social-links')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("style", {
      children: `
                    .platform-label {
                        flex-grow: 1;
                    }
                        
                    .platform-url {
                        flex-grow: 1;
                    }

                    .wp-easy-social-links-logo-column {
                        align-items: center;
                        flex-basis:70px;
                        flex-grow: 0;
                    }

                    .wp-easy-social-links-logo {
                        width: 35px;
                        height: 35px;
                    }

                    .wp-easy-social-links-field-inputs-column{
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 12px;
                    }    

                    @media (min-width: 782px) {
                        .platform-label {
                            flex-grow: 1;
                        }

                        .platform-url {
                            flex-grow: 2;
                        }

                        .wp-easy-social-links-logo-column {
                            flex-basis: 120px;
                        }

                        .wp-easy-social-links-logo {
                            width: 55px;
                            height: 55px;
                        }

                        .wp-easy-social-links-field-inputs-column {
                            flex-direction: row;
                            gap: 16px;
                            align-items: center;
                        }  
                    }
                 
                `
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocialsPanel);

/***/ },

/***/ "./src/wp-easy-social-links-admin/socialsPreview.js"
/*!**********************************************************!*\
  !*** ./src/wp-easy-social-links-admin/socialsPreview.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wp_easy_social_links_block_socialsListRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wp-easy-social-links-block/socialsListRender */ "./src/wp-easy-social-links-block/socialsListRender.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const SocialsPreview = ({
  socialData
}) => {
  // Root data structure availability verification checks
  if (!socialData || !Array.isArray(socialData.social)) {
    return null;
  }
  const showHideSocials = socialData.showHideSocials !== false;
  const isListEmpty = socialData.social.every(row => !row.label && !row.logo);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    style: {
      background: '#f9f9f9',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)',
      minHeight: '200px'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
      style: {
        marginTop: 0,
        paddingBottom: '12px',
        borderBottom: '1px solid #e0e0e0',
        fontSize: '14px',
        fontWeight: '600',
        color: '#333'
      },
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('WP EASY SOCIALS LINKS PREVIEW', 'wp-easy-socials-links')
    }), !showHideSocials ?
    /*#__PURE__*/
    // If it's the backend preview dashboard or editor block, show the warning box
    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100px',
        background: '#f0f0f1',
        borderRadius: '6px',
        border: '1px dashed #ccd0d4',
        marginTop: '20px'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
        style: {
          color: '#646970',
          fontStyle: 'italic',
          fontSize: '13px',
          margin: 0
        },
        children: ["\u274C ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('WP Easy Social Links block display is toggled hidden.', 'wp-easy-socials-links')]
      })
    }) : isListEmpty ?
    /*#__PURE__*/
    // Empty Slate Fallback Notification
    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
      style: {
        color: '#757575',
        fontStyle: 'italic',
        fontSize: '13px',
        marginTop: '20px'
      },
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('You have not added any social links yet.', 'wp-easy-socials-links')
    }) :
    /*#__PURE__*/
    // Add child list layout engine directly
    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wp_easy_social_links_block_socialsListRender__WEBPACK_IMPORTED_MODULE_1__["default"], {
      socialData: socialData
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocialsPreview);

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

/***/ "./src/wp-easy-social-links-admin/admin-styles.css"
/*!*********************************************************!*\
  !*** ./src/wp-easy-social-links-admin/admin-styles.css ***!
  \*********************************************************/
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

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/dom-ready"
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["domReady"];

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

/***/ "@wordpress/notices"
/*!*********************************!*\
  !*** external ["wp","notices"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["notices"];

/***/ },

/***/ "@wordpress/primitives"
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["primitives"];

/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/image.mjs"
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/image.mjs ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ image_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/image.tsx


var image_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.5h14c.3 0 .5.2.5.5v8.4l-3-2.9c-.3-.3-.8-.3-1 0L11.9 14 9 12c-.3-.2-.6-.2-.8 0l-3.6 2.6V5c-.1-.3.1-.5.4-.5zm14 15H5c-.3 0-.5-.2-.5-.5v-2.4l4.1-3 3 1.9c.3.2.7.2.9-.1L16 12l3.5 3.4V19c0 .3-.2.5-.5.5z" }) });

//# sourceMappingURL=image.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/plus.mjs"
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/plus.mjs ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ plus_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/plus.tsx


var plus_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z" }) });

//# sourceMappingURL=plus.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/trash.mjs"
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/trash.mjs ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ trash_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/trash.tsx


var trash_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { fillRule: "evenodd", clipRule: "evenodd", d: "M12 5.5A2.25 2.25 0 0 0 9.878 7h4.244A2.251 2.251 0 0 0 12 5.5ZM12 4a3.751 3.751 0 0 0-3.675 3H5v1.5h1.27l.818 8.997a2.75 2.75 0 0 0 2.739 2.501h4.347a2.75 2.75 0 0 0 2.738-2.5L17.73 8.5H19V7h-3.325A3.751 3.751 0 0 0 12 4Zm4.224 4.5H7.776l.806 8.861a1.25 1.25 0 0 0 1.245 1.137h4.347a1.25 1.25 0 0 0 1.245-1.137l.805-8.861Z" }) });

//# sourceMappingURL=trash.mjs.map


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
/*!*************************************************!*\
  !*** ./src/wp-easy-social-links-admin/index.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _SettingsPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SettingsPage */ "./src/wp-easy-social-links-admin/SettingsPage.js");
/* harmony import */ var _admin_styles_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin-styles.css */ "./src/wp-easy-social-links-admin/admin-styles.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);




 // Admin-specific styles

const App = () => {
  // Determine the current page from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = urlParams.get('page');

  // Default route
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_SettingsPage__WEBPACK_IMPORTED_MODULE_3__["default"], {});
};

/**
 * Initialize the React Admin Interface
 */
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(() => {
  const rootElement = document.getElementById('wp-easy-social-links-admin-app'); //should be same as the div id in the PHP render function

  if (rootElement) {
    const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(rootElement);
    root.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(App, {}));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map