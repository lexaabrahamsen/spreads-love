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
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// jshint esversion: 6\nconst express = __webpack_require__(/*! express */ \"express\");\nconst app = express();\n\n//----------------------------------\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n// const User = require('./models/user');\nconst Schema = mongoose.Schema;\n\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\nconst createHash = crypto.createHash;\n\nmongoose.connect('mongodb://localhost/spreads');\n\nconst UserSchema = new Schema({\n  // ???????????????????\n});\n// const User = mongoose.model('User', UserSchema);\n\nconst seed = () => {\n  User.find({}).remove().then(() => {\n    const users = [{\n        email: 'alice@example.com',\n        displayName: 'Alice',\n        password: '123123',\n    }, {\n        email: 'bob@example.com',\n        displayName: 'Bob',\n        password: '321321',\n    }];\n\n  //   }.then(() => {\n  //     console.log('Created!');\n  //   }, err => {\n  //     console.log('Not created :(', err)\n  // })\n\n    User.create(users, (err, users_) => {\n      // console.log('ERROR:' + err);\n      console.log('MONGODB SEED: ${users_.length} Users created.');\n    });\n  });\n};\n\n//----------------------------------\n\n\napp.get('/', function(req, res) {\n  User.find({}, (err, users) => {\n    res.json(users);\n  });\n});\n\n\n//----------------------------------\n\n\nconst passport = __webpack_require__(/*! passport */ \"passport\");\nconst LocalStrategy = __webpack_require__(/*! passport-local */ \"passport-local\").Strategy;\n\npassport.use(new LocalStrategy({\n  userNameField: 'email',\n  session: false\n  },\n  function(email, password, done) {\n    User.findOne({ username: username }, function (err, user) {\n      if (err) { return done(err); }\n      if (!user) {\n        return done(null, false, { message: 'Incorrect username.' });\n      }\n      if (!user.validPassword(password)) {\n        return done(null, false, { message: 'Incorrect password.' });\n      }\n      return done(null, user);\n    });\n  }\n));\n\napp.post(\n  '/auth/login',\n  passport.authenticate('local'),\n  function(req, res) {\n    res.send('Youre authenticated!');\n  }\n);\n\n//----------------------------------\n\n\nseed();\napp.use((err, req, res, next) => {\n  res.status(err.status || 500);\n  res.json({\n    'error': {\n      message:err.message,\n      error: err\n    }\n  });\n  next();\n});\n\napp.listen(3000);\n\n\n//# sourceURL=webpack:///./server/index.js?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-local\");\n\n//# sourceURL=webpack:///external_%22passport-local%22?");

/***/ })

/******/ });