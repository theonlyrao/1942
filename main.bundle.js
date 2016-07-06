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

	'use strict';

	var canvas = document.getElementById('nineteenfortytwo');
	var context = canvas.getContext('2d');

	var plane = function plane(x, y) {
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

	function planeRenderer(x, y) {
	  this.x = x;
	  this.y = y;
	}

	var playersPlane = new planeRenderer(350, 410);

	planeRenderer.prototype.draw = function (color) {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  context.fillStyle = color;
	  plane(this.x, this.y);
	  context.beginPath();
	  return this;
	};

	planeRenderer.prototype.moveNorth = function () {
	  this.y = this.y - 7;
	  this.draw();
	};

	planeRenderer.prototype.moveEast = function () {
	  this.x = this.x + 7;
	  this.draw();
	};

	planeRenderer.prototype.moveSouth = function () {
	  this.y = this.y + 7;
	  this.draw();
	};

	planeRenderer.prototype.moveWest = function () {
	  this.x = this.x - 7;
	  this.draw();
	};

	var map = [];
	onkeydown = onkeyup = function (e) {
	  e = e || event;
	  map[e.keyCode] = e.type == 'keydown';
	};

	// $(document).keypress(function(event) {
	//   if (playersPlane.x > 731) {
	//     playersPlane.x = -30
	//   } else if (playersPlane.x < -31) {
	//     playersPlane.x = 730
	//   }
	//   if (map[87] === true && playersPlane.y > 20) {
	//     playersPlane.moveNorth();
	//   }
	//   if (map[68] === true) {
	//     playersPlane.moveEast();
	//   }
	//   if (map[83] === true && playersPlane.y < 460) {
	//     playersPlane.moveSouth();
	//   }
	//   if(map[65] === true) {
	//     playersPlane.moveWest();
	//   }
	// });

	canvas.onkeydown = function (e) {
	  if (playersPlane.x > 731) {
	    playersPlane.x = -30;
	  } else if (playersPlane.x < -31) {
	    playersPlane.x = 730;
	  }
	  if (map[87] === true && playersPlane.y > 20) {
	    playersPlane.moveNorth();
	  }
	  if (map[68] === true) {
	    playersPlane.moveEast();
	  }
	  if (map[83] === true && playersPlane.y < 460) {
	    playersPlane.moveSouth();
	  }
	  if (map[65] === true) {
	    playersPlane.moveWest();
	  }
	};

	playersPlane.draw("purple");

/***/ }
/******/ ]);