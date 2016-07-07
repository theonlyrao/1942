/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	function Plane(options) {
	  var opts = options || {};
	  // this.type = options.type || "player"
	  // this.x = options.x || 350
	  // this.y = options.y || 410
	  // this.width = options.width || 8;
	  // this.height = options.height || 25;
	  var context = options.context;
	  var x = 350;
	  var y = 410;
	  var width = 8;
	  var height = 25;
	  var wingspan = 52;
	  var tailspan = 16;
	  var xMid = x + width / 2;
	  context.fillStyle = "red";
	  // fuselage
	  context.fillRect(x, y, width, height);
	  // wings
	  context.moveTo(xMid - wingspan / 2, y + 13);
	  context.lineTo(xMid, y + 5);
	  context.lineTo(xMid + wingspan / 2, y + 13);
	  context.fill();
	  // nose
	  context.moveTo(x, y);
	  context.lineTo(xMid, y - 5);
	  context.lineTo(x + width, y);
	  context.fill();
	  // fuselage-tail connector
	  context.moveTo(x, y + height);
	  context.lineTo(xMid, y + height + 5);
	  context.lineTo(x + width, y + height);
	  context.fill();
	  // tail
	  context.moveTo(xMid - tailspan / 2, y + 32);
	  context.lineTo(xMid, y + 25);
	  context.lineTo(xMid + tailspan / 2, y + 32);
	  context.fill();
	};

	module.exports = Plane;

/***/ }
/******/ ]);