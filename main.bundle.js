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
	var CollisionDetector = __webpack_require__(3);

	var canvas = document.getElementById('nineteenfortytwo');
	var context = canvas.getContext('2d');
	var playerPlane = new Plane({ type: "player" });
	var smallComputerPlane = new Plane({ type: "computer" });
	var renderer = new Renderer({ context: context, canvas: canvas });
	var detector = new CollisionDetector();
	var planes = [playerPlane, smallComputerPlane];

	requestAnimationFrame(function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  renderer.drawPlanes(planes);
	  smallComputerPlane.move();
	  /* console.log("computer: " + smallComputerPlane.border[0])
	   * console.log("player: " + playerPlane.border[0])*/
	  var result = detector.check(playerPlane, smallComputerPlane);
	  if (result === true) {
	    console.log("we have a collision");
	  }
	  requestAnimationFrame(gameLoop);
	});

	var map = [];
	onkeydown = onkeyup = function (e) {
	  e = e || event;
	  map[e.keyCode] = e.type == 'keydown';
	};

	document.addEventListener("keypress", function (event) {
	  if (map[87] === true) {
	    for (var i = 0; i < 7; i++) {
	      playerPlane.moveNorth();
	    };
	  };
	  if (map[68] === true) {
	    for (var i = 0; i < 7; i++) {
	      playerPlane.moveEast();
	    };
	  };
	  if (map[83] === true) {
	    for (var i = 0; i < 7; i++) {
	      playerPlane.moveSouth();
	    };
	  };
	  if (map[65] === true) {
	    for (var i = 0; i < 7; i++) {
	      playerPlane.moveWest();
	    };
	  };
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	function Plane(options) {
	   if (options.type === "player") {
	      this.type = options.type;
	      this.x = options.x || 350;
	      this.y = options.y || 410;
	      this.width = options.width || 8;
	      this.height = options.height || 25;
	      this.wingspan = options.wingspan || 52;
	      this.tailspan = options.tailspan || 16;
	      //this.border = border(this);
	      this.border = [];
	   } else if (options.type === "computer") {
	      this.type = options.type;
	      this.x = options.x || Math.floor(Math.random() * 600) + 50;
	      this.y = options.y || -30;
	      this.width = options.width || 8;
	      this.height = options.height || 25;
	      this.wingspan = options.wingspan || 52;
	      this.tailspan = options.tailspan || 16;
	      this.heading = Math.floor(Math.random() * 2);
	      //this.border = border(this);
	      this.border = [];
	   }
	};

	//var border = function(plane){
	Plane.prototype.makeBorder = function () {
	   var plane = this;
	   var points = [];
	   var x = plane.x;
	   var y = plane.y;
	   var width = plane.width;
	   var height = plane.height;

	   for (var a = x; a < x + width; a++) {
	      points.push([a, y]);
	   }
	   // fill it with pairs from top right to bottom right
	   for (var b = y + 1; b < y + height; b++) {
	      points.push([x + width - 1, b]);
	   }

	   // fill it with pairs from bottom right to bottom left
	   for (var c = x + width - 2; c > x; c--) {
	      points.push([c, y + height - 1]);
	   }

	   // fill it with pairs from bottom left back to top left
	   for (var d = y + height - 1; d > y; d--) {
	      points.push([x, d]);
	   }

	   return points;
	};

	Plane.prototype.move = function () {
	   this.y = this.y + 1;
	   if (this.heading === 0) {
	      this.moveWest();
	   } else {
	      this.moveEast();
	   }
	};

	Plane.prototype.moveNorth = function () {
	   if (this.y >= 20) {
	      this.y = this.y - 1;
	   };
	};

	Plane.prototype.moveSouth = function () {
	   if (this.y <= 460) {
	      this.y = this.y + 1;
	   };
	};

	Plane.prototype.moveEast = function () {
	   if (this.x < 730) {
	      this.x = this.x + 1;
	   } else {
	      this.x = -30;
	   }
	};

	Plane.prototype.moveWest = function () {
	   if (this.x > -29) {
	      this.x = this.x - 1;
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
	};

	function drawFuselage(context, plane) {
	  context.fillRect(plane.x, plane.y, plane.width, plane.height);
	  plane.border = plane.makeBorder();
	}

	function drawPlayerWings(xMid, context, plane) {
	  context.beginPath();
	  context.moveTo(xMid - plane.wingspan / 2, plane.y + 13);
	  context.lineTo(xMid, plane.y + 5);
	  context.lineTo(xMid + plane.wingspan / 2, plane.y + 13);
	  context.fill();
	}

	function drawComputerWings(xMid, context, plane) {
	  context.moveTo(xMid - plane.wingspan / 2, plane.y + 13);
	  context.lineTo(xMid, plane.y + 21);
	  context.lineTo(xMid + plane.wingspan / 2, plane.y + 13);
	  context.fill();
	}

	function drawNorthTriangle(xMid, context, plane) {
	  context.moveTo(plane.x, plane.y);
	  context.lineTo(xMid, plane.y - 5);
	  context.lineTo(plane.x + plane.width, plane.y);
	  context.fill();
	}

	function drawSouthTriangle(xMid, context, plane) {
	  context.moveTo(plane.x, plane.y + plane.height);
	  context.lineTo(xMid, plane.y + plane.height + 5);
	  context.lineTo(plane.x + plane.width, plane.y + plane.height);
	  context.fill();
	}

	function drawPlayerTail(xMid, context, plane) {
	  context.moveTo(xMid - plane.tailspan / 2, plane.y + 32);
	  context.lineTo(xMid, plane.y + 25);
	  context.lineTo(xMid + plane.tailspan / 2, plane.y + 32);
	  context.fill();
	}

	function drawComputerTail(xMid, context, plane) {
	  context.moveTo(xMid - plane.tailspan / 2, plane.y - 7);
	  context.lineTo(xMid, plane.y);
	  context.lineTo(xMid + plane.tailspan / 2, plane.y - 7);
	  context.fill();
	}

	Renderer.prototype.drawPlanes = function (planes) {
	  var context = this.context;
	  planes.forEach(function (plane) {
	    context.fillStyle = "red";
	    var xMid = plane.x + plane.width / 2;
	    context.beginPath();
	    drawFuselage(context, plane);
	    drawNorthTriangle(xMid, context, plane);
	    drawSouthTriangle(xMid, context, plane);

	    if (plane.type === "player") {
	      drawPlayerWings(xMid, context, plane);
	      drawPlayerTail(xMid, context, plane);
	    } else if (plane.type === "computer") {
	      drawComputerWings(xMid, context, plane);
	      drawComputerTail(xMid, context, plane);
	    }
	  });
	};

	module.exports = Renderer;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	function CollisionDetector() {};

	CollisionDetector.prototype.check = function (object1, object2) {
	   var all = object2.border;
	   object1.border.forEach(function (element1) {
	      all.push(element1);
	   });

	   function arrHasDupes(A) {
	      var i, j, n;
	      n = A.length;

	      for (i = 0; i < n; i++) {
	         for (j = i + 1; j < n; j++) {
	            if (String(A[i]) === String(A[j])) return true;
	         }
	      }
	      return false;
	   }

	   return arrHasDupes(all);
	};

	module.exports = CollisionDetector;

/***/ }
/******/ ]);