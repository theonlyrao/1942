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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Plane = __webpack_require__(1);
	var Renderer = __webpack_require__(2);

	var canvas = document.getElementById('nineteenfortytwo');
	var context = canvas.getContext('2d');
	var playerPlane = new Plane({ type: "player" });
	var renderer = new Renderer({ context: context, canvas: canvas });

	// function gameLoop() {
	//   var game = this;
	//   // context.clearRect(0,0,canvas.width, canvas.height);
	//   renderer.drawPlanes(playerPlane);
	//   requestAnimationFrame(gameLoop.bind(game))
	//
	// }

	// function gameLoop() {
	requestAnimationFrame(function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  renderer.drawPlanes(playerPlane);
	  requestAnimationFrame(gameLoop);
	});

	window.onkeydown = window.onkeyup = function (e) {

	  var map = [];
	  e = e || event;
	  map[e.keyCode] = e.type == 'keydown';
	  if (map[87] === true) {
	    playerPlane.moveNorth();
	  }
	  if (map[68] === true) {
	    playerPlane.moveEast();
	  }
	  if (map[83] === true) {
	    playerPlane.moveSouth();
	  }
	  if (map[65] === true) {
	    playerPlane.moveWest();
	  }
	};

	gameLoop();
	//
	// playersPlane.draw("purple")

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	function Plane(options) {
	  this.type = options.type || "player";
	  this.x = options.x || 350;
	  this.y = options.y || 410;
	  this.width = options.width || 8;
	  this.height = options.height || 25;
	  this.wingspan = options.wingspan || 52;
	  this.tailspan = options.tailspan || 16;
	  // var xMid = x + (width/2);
	  // // fuselage
	  // context.fillRect(x, y, width, height);
	  // // wings
	  // context.moveTo(xMid - (wingspan/2), y + 13);
	  // context.lineTo(xMid, y + 5);
	  // context.lineTo(xMid + (wingspan/2), y + 13);
	  // context.fill();
	  // // nose
	  // context.moveTo(x, y);
	  // context.lineTo(xMid, y - 5);
	  // context.lineTo(x + width, y);
	  // context.fill();
	  // // fuselage-tail connector
	  // context.moveTo(x, y + height);
	  // context.lineTo(xMid, y + height + 5);
	  // context.lineTo(x + width, y + height);
	  // context.fill();
	  // // tail
	  // context.moveTo(xMid - (tailspan/2), y + 32);
	  // context.lineTo(xMid, y + 25);
	  // context.lineTo(xMid + (tailspan/2), y + 32);
	  // context.fill();
	};

	Plane.prototype.moveNorth = function () {
	  if (this.y - 7 >= 20) {
	    this.y = this.y - 7;
	  };
	};

	Plane.prototype.moveSouth = function () {
	  if (this.y + 7 <= 460) {
	    this.y = this.y + 7;
	  };
	};

	Plane.prototype.moveEast = function () {
	  if (this.x < 731) {
	    this.x = this.x + 7;
	  } else {
	    this.x = -30;
	  }
	};

	Plane.prototype.moveWest = function () {
	  if (this.x > -29) {
	    this.x = this.x - 7;
	  } else {
	    this.x = 730;
	  };
	};

	module.exports = Plane;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	function Renderer(options) {
	  this.canvas = options.canvas;
	  this.context = options.context;
	  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	Renderer.prototype.drawPlanes = function (plane) {
	  // this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
	  this.context.fillStyle = "red";
	  var xMid = plane.x + plane.width / 2;
	  // fuselage
	  this.context.fillRect(plane.x, plane.y, plane.width, plane.height);
	  // wings
	  this.context.moveTo(xMid - plane.wingspan / 2, plane.y + 13);
	  this.context.lineTo(xMid, plane.y + 5);
	  this.context.lineTo(xMid + plane.wingspan / 2, plane.y + 13);
	  this.context.fill();
	  // nose
	  this.context.moveTo(plane.x, plane.y);
	  this.context.lineTo(xMid, plane.y - 5);
	  this.context.lineTo(plane.x + plane.width, plane.y);
	  this.context.fill();
	  // fuselage-tail connector
	  this.context.moveTo(plane.x, plane.y + plane.height);
	  this.context.lineTo(xMid, plane.y + plane.height + 5);
	  this.context.lineTo(plane.x + plane.width, plane.y + plane.height);
	  this.context.fill();
	  // tail
	  this.context.moveTo(xMid - plane.tailspan / 2, plane.y + 32);
	  this.context.lineTo(xMid, plane.y + 25);
	  this.context.lineTo(xMid + plane.tailspan / 2, plane.y + 32);
	  this.context.fill();
	};

	module.exports = Renderer;

/***/ }
/******/ ]);