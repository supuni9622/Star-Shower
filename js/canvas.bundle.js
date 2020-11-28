/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
}); //================== Create blue print for star ===================

function Star(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = {
    x: _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(-4, 4),
    y: 3
  };
  this.friction = 0.8;
  this.gravity = 1.2;
} // Create draw and update functions -- this function determine what the circle/star looks like on the screen


Star.prototype.draw = function () {
  c.save();
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = this.color;
  c.shadowColor = '#e3e1ef';
  c.shadowBlur = 20;
  c.fill();
  c.closePath();
  c.restore();
};

Star.prototype.update = function () {
  this.draw();

  if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
    this.velocity.y = -this.velocity.y * this.friction;
    this.shatter();
  } else {
    this.velocity.y += this.gravity;
  }

  if (this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius <= 0) {
    this.velocity.x = -this.velocity.x * this.friction;
    this.shatter();
  }

  this.x += this.velocity.x;
  this.y += this.velocity.y;
};

Star.prototype.shatter = function () {
  this.radius -= 3;

  for (var i = 0; i < 8; i++) {
    ministars.push(new MiniStar(this.x, this.y, 2));
  }

  console.log(ministars);
}; // Create MiniStar function


function MiniStar(x, y, radius, color) {
  Star.call(this, x, y, radius, color);
  this.velocity = {
    x: _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(-5, 5),
    y: _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(-15, 15)
  };
  this.friction = 0.8;
  this.gravity = 0.4;
  this.ttl = 200;
  this.opacity = 1;
} // Draw and update funcions for MiniStar


MiniStar.prototype.draw = function () {
  c.save();
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = "rgba(227,234,239, ".concat(this.opacity, ")");
  c.shadowColor = '#e3e1ef';
  c.shadowBlur = 20;
  c.fill();
  c.closePath();
  c.restore();
};

MiniStar.prototype.update = function () {
  this.draw();

  if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
    this.velocity.y = -this.velocity.y * this.friction;
  } else {
    this.velocity.y += this.gravity;
  }

  this.x += this.velocity.x;
  this.y += this.velocity.y; // Time to leave --> ttl

  this.ttl -= 1;
  this.opacity -= 1 / this.ttl;
}; // Create mountain range function for create mountain dynamically


function createMountainRange(mountainAmount, height, color) {
  for (var i = 0; i < mountainAmount; i++) {
    var mountainWidth = canvas.width / mountainAmount;
    c.beginPath(); // Create mountain using rectrangles

    c.moveTo(i * mountainWidth, canvas.height);
    c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);
    c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
    c.lineTo(i * mountainWidth - 325, canvas.height);
    c.fillStyle = color;
    c.fill();
    c.closePath();
  }
} // Implementation 
// Create Background object


var backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
backgroundGradient.addColorStop(0, '#171e26');
backgroundGradient.addColorStop(1, '#3f586b'); // Create background stars

var backgroundStars; // creating multiple stars using Star blue print

var stars;
var ministars; // Create timer to spawing multiple stars

var ticker = 0;
var randomSpawnRate = 75;
var groundHeight = 100;

function init() {
  stars = [];
  ministars = [];
  backgroundStars = [];

  for (var i = 0; i < 1; i++) {
    stars.push(new Star(canvas.width / 2, 30, 30, '#e3eaef'));
  }

  for (var _i = 0; _i < 150; _i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var radius = Math.random() * 3;
    backgroundStars.push(new Star(x, y, radius, 'white'));
  }
} // Animation Loop


function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = backgroundGradient;
  c.fillRect(0, 0, canvas.width, canvas.height);
  backgroundStars.forEach(function (backgroundStar) {
    backgroundStar.draw();
  }); //Call mountain range function
  // First call arguments in the behind 

  createMountainRange(1, canvas.height - 50, '#384551');
  createMountainRange(2, canvas.height - 100, '#283843');
  createMountainRange(3, canvas.height - 300, '#26333e');
  c.fillStyle = '#182028';
  c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
  stars.forEach(function (star, index) {
    star.update();

    if (star.radius == 0) {
      stars.splice(index, 1);
    }
  });
  ministars.forEach(function (ministar, index) {
    ministar.update();

    if (ministar.ttl == 0) {
      ministars.splice(index, 1);
    }
  });
  ticker++;

  if (ticker % randomSpawnRate == 0) {
    var radius = 18;
    var x = Math.max(Math.random() * canvas.width - radius);
    stars.push(new Star(x, -100, radius, 'white'));
    randomSpawnRate = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(75, 200);
  }
}

init();
animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

// These are the utility functions allow us to do canvas pieces
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map