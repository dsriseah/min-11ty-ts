/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["eleventyExtend"] = factory();
	else
		root["eleventyExtend"] = factory();
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./11ty-extend/index-extend.ts":
/*!*************************************!*\
  !*** ./11ty-extend/index-extend.ts ***!
  \*************************************/
/***/ ((module) => {

eval("/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\\\n\n  entry point for eleventy configuration extensions\n\n\\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/\n/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////\n/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\nvar PR = '[ext]'.padEnd(6, ' '); /// MAIN METHODS //////////////////////////////////////////////////////////////\n/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n\nfunction Extend(eleventyConfig) {\n  var fn = 'Extend:';\n  console.log(PR, \"\".concat(fn, \" adding Sri's 11ty extensions\"));\n  return eleventyConfig;\n} /// EXPORTS ///////  ////////////////////////////////////////////////////////////\n/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n\n\nmodule.exports = {\n  Extend: Extend\n};\n\n//# sourceURL=webpack://eleventyExtend/./11ty-extend/index-extend.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./11ty-extend/index-extend.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});