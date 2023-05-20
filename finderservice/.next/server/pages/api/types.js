"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/types";
exports.ids = ["pages/api/types"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "(api)/./src/models/Type.js":
/*!****************************!*\
  !*** ./src/models/Type.js ***!
  \****************************/
/***/ ((module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nconst _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nvar typeSchema = new _mongoose.Schema({\n    name: String\n}, {\n    timestamps: false,\n    versionKey: false\n});\nvar Type = _mongoose.models.Type || (0, _mongoose.model)(\"Type\", typeSchema);\nmodule.exports = Type;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvbW9kZWxzL1R5cGUuanMuanMiLCJtYXBwaW5ncyI6Ijs7OztzQ0FBc0MsMEJBQVU7QUFFaEQsSUFBSUEsYUFBYSxJQUFJQyxnQkFBTSxDQUN6QjtJQUNFQyxNQUFNQztBQUNSLEdBQ0E7SUFBRUMsWUFBWSxLQUFLO0lBQUVDLFlBQVksS0FBSztBQUFDO0FBR3pDLElBQUlDLE9BQU9DLGdCQUFNLENBQUNELElBQUksSUFBSUUsSUFBQUEsZUFBSyxFQUFDLFFBQVFSO0FBQ3hDUyxPQUFPQyxPQUFPLEdBQUdKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmluZGVyc2VydmljZS8uL3NyYy9tb2RlbHMvVHlwZS5qcz85ZjAwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjaGVtYSwgbW9kZWwsIG1vZGVscyB9IGZyb20gXCJtb25nb29zZVwiO1xuXG52YXIgdHlwZVNjaGVtYSA9IG5ldyBTY2hlbWEoXG4gIHtcbiAgICBuYW1lOiBTdHJpbmcsXG4gIH0sXG4gIHsgdGltZXN0YW1wczogZmFsc2UsIHZlcnNpb25LZXk6IGZhbHNlIH1cbik7XG5cbnZhciBUeXBlID0gbW9kZWxzLlR5cGUgfHwgbW9kZWwoXCJUeXBlXCIsIHR5cGVTY2hlbWEpO1xubW9kdWxlLmV4cG9ydHMgPSBUeXBlO1xuIl0sIm5hbWVzIjpbInR5cGVTY2hlbWEiLCJTY2hlbWEiLCJuYW1lIiwiU3RyaW5nIiwidGltZXN0YW1wcyIsInZlcnNpb25LZXkiLCJUeXBlIiwibW9kZWxzIiwibW9kZWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/models/Type.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/types/index.js":
/*!**************************************!*\
  !*** ./src/pages/api/types/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _utils_mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/mongoose */ \"(api)/./src/utils/mongoose.js\");\n/* harmony import */ var _models_Type_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/models/Type.js */ \"(api)/./src/models/Type.js\");\n/* harmony import */ var _models_Type_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_models_Type_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function handler(req, res) {\n    await (0,_utils_mongoose__WEBPACK_IMPORTED_MODULE_0__.dbConnect)();\n    switch(req.method){\n        case \"GET\":\n            try {\n                const typeWorker = await _models_Type_js__WEBPACK_IMPORTED_MODULE_1___default().find();\n                if (typeWorker.length !== 0) {\n                    return res.status(200).json(typeWorker);\n                } else {\n                    await mongoose__WEBPACK_IMPORTED_MODULE_2___default().connection.close();\n                    console.log(\"Connection shutdown\");\n                    return res.status(404).json({\n                        error: \"Not exist that workers type\"\n                    });\n                }\n            } catch (error) {\n                await mongoose__WEBPACK_IMPORTED_MODULE_2___default().connection.close();\n                console.log(\"Connection shutdown\");\n                return res.status(400).json({\n                    error: error.message\n                });\n            }\n        default:\n            await mongoose__WEBPACK_IMPORTED_MODULE_2___default().connection.close();\n            console.log(\"Connection shutdown\");\n            res.status(404).json({\n                error: \"request do not exist\"\n            });\n            break;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL3R5cGVzL2luZGV4LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUE2QztBQUNUO0FBQ0o7QUFFakIsZUFBZUcsUUFBUUMsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDOUMsTUFBTUwsMERBQVNBO0lBRWYsT0FBUUksSUFBSUUsTUFBTTtRQUNoQixLQUFLO1lBQ0gsSUFBSTtnQkFDRixNQUFNQyxhQUFhLE1BQU1OLDJEQUFTO2dCQUNsQyxJQUFJTSxXQUFXRSxNQUFNLEtBQUssR0FBRztvQkFDM0IsT0FBT0osSUFBSUssTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQ0o7Z0JBQzlCLE9BQU87b0JBQ0wsTUFBTUwsZ0VBQXlCO29CQUMvQlksUUFBUUMsR0FBRyxDQUFDO29CQUNaLE9BQU9WLElBQUlLLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7d0JBQUVLLE9BQU87b0JBQThCO2dCQUNyRSxDQUFDO1lBQ0gsRUFBRSxPQUFPQSxPQUFPO2dCQUNkLE1BQU1kLGdFQUF5QjtnQkFDL0JZLFFBQVFDLEdBQUcsQ0FBQztnQkFDWixPQUFPVixJQUFJSyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO29CQUFFSyxPQUFPQSxNQUFNQyxPQUFPO2dCQUFDO1lBQ3JEO1FBRUY7WUFDRSxNQUFNZixnRUFBeUI7WUFDL0JZLFFBQVFDLEdBQUcsQ0FBQztZQUNaVixJQUFJSyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFSyxPQUFPO1lBQXVCO1lBQ3JELEtBQU07SUFDVjtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maW5kZXJzZXJ2aWNlLy4vc3JjL3BhZ2VzL2FwaS90eXBlcy9pbmRleC5qcz9iNzY5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiQ29ubmVjdCB9IGZyb20gXCJAL3V0aWxzL21vbmdvb3NlXCI7XG5pbXBvcnQgVHlwZSBmcm9tIFwiQC9tb2RlbHMvVHlwZS5qc1wiO1xuaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XG4gIGF3YWl0IGRiQ29ubmVjdCgpO1xuXG4gIHN3aXRjaCAocmVxLm1ldGhvZCkge1xuICAgIGNhc2UgXCJHRVRcIjpcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHR5cGVXb3JrZXIgPSBhd2FpdCBUeXBlLmZpbmQoKTtcbiAgICAgICAgaWYgKHR5cGVXb3JrZXIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHR5cGVXb3JrZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IG1vbmdvb3NlLmNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gc2h1dGRvd25cIik7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6IFwiTm90IGV4aXN0IHRoYXQgd29ya2VycyB0eXBlXCIgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGF3YWl0IG1vbmdvb3NlLmNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIHNodXRkb3duXCIpO1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9KTtcbiAgICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICBhd2FpdCBtb25nb29zZS5jb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gc2h1dGRvd25cIik7XG4gICAgICByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiBcInJlcXVlc3QgZG8gbm90IGV4aXN0XCIgfSk7XG4gICAgICBicmVhaztcbiAgfVxufVxuIl0sIm5hbWVzIjpbImRiQ29ubmVjdCIsIlR5cGUiLCJtb25nb29zZSIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJ0eXBlV29ya2VyIiwiZmluZCIsImxlbmd0aCIsInN0YXR1cyIsImpzb24iLCJjb25uZWN0aW9uIiwiY2xvc2UiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/types/index.js\n");

/***/ }),

/***/ "(api)/./src/utils/mongoose.js":
/*!*******************************!*\
  !*** ./src/utils/mongoose.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"dbConnect\": () => (/* binding */ dbConnect),\n/* harmony export */   \"dbDisconnect\": () => (/* binding */ dbDisconnect)\n/* harmony export */ });\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nasync function dbConnect() {\n    await mongoose.connect(process.env.MONGODB_URL, {\n        useNewUrlParser: true,\n        useUnifiedTopology: true\n    }).then(()=>{\n        const db = mongoose.connection;\n        db.on(\"error\", (err)=>{\n            console.error(\"Connection error\", err);\n        });\n        db.once(\"open\", ()=>{\n            console.log(\"Connection established\");\n        });\n    }).catch((error)=>{\n        console.error(\"Error connecting to FinderService Database\", error);\n    });\n}\nasync function dbDisconnect() {\n    await mongoose.connection.close();\n    console.log(\"Connection shutdown\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvdXRpbHMvbW9uZ29vc2UuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxNQUFNQSxXQUFXQyxtQkFBT0EsQ0FBQywwQkFBVTtBQUU1QixlQUFlQyxZQUFZO0lBQ2hDLE1BQU1GLFNBQ0hHLE9BQU8sQ0FBQ0MsUUFBUUMsR0FBRyxDQUFDQyxXQUFXLEVBQUU7UUFDaENDLGlCQUFpQixJQUFJO1FBQ3JCQyxvQkFBb0IsSUFBSTtJQUMxQixHQUNDQyxJQUFJLENBQUMsSUFBTTtRQUNWLE1BQU1DLEtBQUtWLFNBQVNXLFVBQVU7UUFDOUJELEdBQUdFLEVBQUUsQ0FBQyxTQUFTLENBQUNDLE1BQVE7WUFDdEJDLFFBQVFDLEtBQUssQ0FBQyxvQkFBb0JGO1FBQ3BDO1FBQ0FILEdBQUdNLElBQUksQ0FBQyxRQUFRLElBQU07WUFDcEJGLFFBQVFHLEdBQUcsQ0FBQztRQUNkO0lBQ0YsR0FDQ0MsS0FBSyxDQUFDLENBQUNILFFBQVU7UUFDaEJELFFBQVFDLEtBQUssQ0FBQyw4Q0FBOENBO0lBQzlEO0FBQ0osQ0FBQztBQUVNLGVBQWVJLGVBQWU7SUFDbkMsTUFBTW5CLFNBQVNXLFVBQVUsQ0FBQ1MsS0FBSztJQUMvQk4sUUFBUUcsR0FBRyxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpbmRlcnNlcnZpY2UvLi9zcmMvdXRpbHMvbW9uZ29vc2UuanM/NGM3OSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb25nb29zZSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRiQ29ubmVjdCgpIHtcbiAgYXdhaXQgbW9uZ29vc2VcbiAgICAuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT0RCX1VSTCwge1xuICAgICAgdXNlTmV3VXJsUGFyc2VyOiB0cnVlLFxuICAgICAgdXNlVW5pZmllZFRvcG9sb2d5OiB0cnVlLFxuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgZGIgPSBtb25nb29zZS5jb25uZWN0aW9uO1xuICAgICAgZGIub24oXCJlcnJvclwiLCAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb25uZWN0aW9uIGVycm9yXCIsIGVycik7XG4gICAgICB9KTtcbiAgICAgIGRiLm9uY2UoXCJvcGVuXCIsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIGVzdGFibGlzaGVkXCIpO1xuICAgICAgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY29ubmVjdGluZyB0byBGaW5kZXJTZXJ2aWNlIERhdGFiYXNlXCIsIGVycm9yKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRiRGlzY29ubmVjdCgpIHtcbiAgYXdhaXQgbW9uZ29vc2UuY29ubmVjdGlvbi5jbG9zZSgpO1xuICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gc2h1dGRvd25cIik7XG59XG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJyZXF1aXJlIiwiZGJDb25uZWN0IiwiY29ubmVjdCIsInByb2Nlc3MiLCJlbnYiLCJNT05HT0RCX1VSTCIsInVzZU5ld1VybFBhcnNlciIsInVzZVVuaWZpZWRUb3BvbG9neSIsInRoZW4iLCJkYiIsImNvbm5lY3Rpb24iLCJvbiIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIm9uY2UiLCJsb2ciLCJjYXRjaCIsImRiRGlzY29ubmVjdCIsImNsb3NlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/utils/mongoose.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/types/index.js"));
module.exports = __webpack_exports__;

})();