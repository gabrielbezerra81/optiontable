import React__default, { createElement, useRef, useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import createSaga from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createActions, createReducer } from 'reduxsauce';
import { put, call, all, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import styled, { createGlobalStyle, css } from 'styled-components';
import ReactLoading from 'react-loading';
import useUndo from 'use-undo';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var _HANDLERS;

var _createActions = createActions({
  loadingOptions: ["isLoadingRequest"],
  loadOptions: ["payload"],
  loadReactiveOptions: ["payload"],
  setFieldValues: ["payload"],
  setTableOption: ["payload"],
  removeTableOption: ["payload"],
  createChannel: ["payload"],
  loadPagination: [],
  setItemUp: [],
  setItemDown: []
}),
    Types = _createActions.Types,
    Creators = _createActions.Creators;

var INITIAL_STATE = {
  isLoadingRequest: false,
  isRequestFailed: false,
  navbar: {},
  option: "",
  reactiveOptionURL: "",
  allCalls: [],
  allStrikes: [],
  allPuts: [],
  calls: [],
  strikes: [],
  puts: [],
  allOptions: [],
  pagination: {
    itemsAbove: 0,
    itemsBelow: 0,
    itemsPerPage: 15,
    initialItemIndex: 0
  }
};

var loadingOptions = function loadingOptions(state, _ref) {
  var isLoadingRequest = _ref.isLoadingRequest;
  return _extends({}, state, {
    isLoadingRequest: isLoadingRequest
  });
};

var setFieldValues = function setFieldValues(state, _ref2) {
  var _extends2;

  var payload = _ref2.payload;
  var field = payload.field,
      values = payload.values;
  return _extends({}, state, (_extends2 = {}, _extends2[field] = values, _extends2));
};

var setTableOption = function setTableOption(state, _ref3) {
  var payload = _ref3.payload;

  if (state.allOptions.length < 6) {
    if (state.allOptions.filter(function (_ref4) {
      var id = _ref4.id;
      return id === payload.id;
    }).length > 0 && payload.cv === undefined) {
      var cv = state.allOptions.filter(function (_ref5) {
        var id = _ref5.id;
        return id === payload.id;
      })[0].cv;
      var optionIndex = state.allOptions.indexOf(state.allOptions.filter(function (_ref6) {
        var id = _ref6.id;
        return id === payload.id;
      })[0]);

      if (cv === "sell") {
        var allOptions = state.allOptions.filter(function (_ref7) {
          var id = _ref7.id;
          return id !== payload.id;
        });
        allOptions.splice(optionIndex, 0, _extends({}, state.allOptions[optionIndex], {
          cv: "buy",
          initials: "C"
        }));
        return _extends({}, state, {
          allOptions: allOptions
        });
      } else {
        var _allOptions = state.allOptions.filter(function (_ref8) {
          var id = _ref8.id;
          return id !== payload.id;
        });

        _allOptions.splice(optionIndex, 0, _extends({}, state.allOptions[optionIndex], {
          cv: "sell",
          initials: "V"
        }));

        return _extends({}, state, {
          allOptions: _allOptions
        });
      }
    }
  }

  if (state.allOptions.length < 6) {
    return _extends({}, state, {
      allOptions: [].concat(state.allOptions, [_extends({}, payload, {
        initials: payload.cv === "buy" ? "C" : "V",
        quantity: 0
      })])
    });
  } else {
    return _extends({}, state);
  }
};

var removeTableOption = function removeTableOption(state, _ref9) {
  var payload = _ref9.payload;
  var id = payload.id;
  var allOptions = state.allOptions.filter(function (option) {
    return option.id !== id;
  });
  return _extends({}, state, {
    allOptions: allOptions
  });
};

var loadPagination = function loadPagination(state) {
  var itemsBelow = state.strikes.length - state.pagination.itemsPerPage;
  var _state$pagination = state.pagination,
      initialItemIndex = _state$pagination.initialItemIndex,
      itemsPerPage = _state$pagination.itemsPerPage;
  var calls = state.calls.slice(initialItemIndex, itemsPerPage);
  var strikes = state.strikes.slice(initialItemIndex, itemsPerPage);
  var puts = state.puts.slice(initialItemIndex, itemsPerPage);
  return _extends({}, state, {
    calls: calls,
    strikes: strikes,
    puts: puts,
    pagination: _extends({}, state.pagination, {
      itemsBelow: itemsBelow
    })
  });
};

var setItemUp = function setItemUp(state) {
  var _state$pagination2 = state.pagination,
      initialItemIndex = _state$pagination2.initialItemIndex,
      itemsPerPage = _state$pagination2.itemsPerPage,
      itemsAbove = _state$pagination2.itemsAbove,
      itemsBelow = _state$pagination2.itemsBelow;
  var calls = state.allCalls.slice(initialItemIndex - 1, itemsPerPage - 1);
  var strikes = state.allStrikes.slice(initialItemIndex - 1, itemsPerPage - 1);
  var puts = state.allPuts.slice(initialItemIndex - 1, itemsPerPage - 1);
  return _extends({}, state, {
    calls: calls,
    strikes: strikes,
    puts: puts,
    pagination: _extends({}, state.pagination, {
      itemsAbove: itemsAbove - 1,
      itemsBelow: itemsBelow + 1,
      itemsPerPage: itemsPerPage - 1,
      initialItemIndex: initialItemIndex - 1
    })
  });
};

var setItemDown = function setItemDown(state) {
  var _state$pagination3 = state.pagination,
      initialItemIndex = _state$pagination3.initialItemIndex,
      itemsPerPage = _state$pagination3.itemsPerPage,
      itemsAbove = _state$pagination3.itemsAbove,
      itemsBelow = _state$pagination3.itemsBelow;
  var calls = state.allCalls.slice(initialItemIndex + 1, itemsPerPage + 1);
  var strikes = state.allStrikes.slice(initialItemIndex + 1, itemsPerPage + 1);
  var puts = state.allPuts.slice(initialItemIndex + 1, itemsPerPage + 1);
  return _extends({}, state, {
    calls: calls,
    strikes: strikes,
    puts: puts,
    pagination: _extends({}, state.pagination, {
      itemsAbove: itemsAbove + 1,
      itemsBelow: itemsBelow - 1,
      itemsPerPage: itemsPerPage + 1,
      initialItemIndex: initialItemIndex + 1
    })
  });
};
var HANDLERS = (_HANDLERS = {}, _HANDLERS[Types.LOADING_OPTIONS] = loadingOptions, _HANDLERS[Types.SET_FIELD_VALUES] = setFieldValues, _HANDLERS[Types.SET_TABLE_OPTION] = setTableOption, _HANDLERS[Types.REMOVE_TABLE_OPTION] = removeTableOption, _HANDLERS[Types.LOAD_PAGINATION] = loadPagination, _HANDLERS[Types.SET_ITEM_UP] = setItemUp, _HANDLERS[Types.SET_ITEM_DOWN] = setItemDown, _HANDLERS);
var reducer = createReducer(INITIAL_STATE, HANDLERS);

var reducers = combineReducers({
  options: reducer
});

var api = axios.create({
  baseURL: "https://api.rendacontinua.com/api"
});

var SERVER_ERROR = "Ops, ocorreu um erro inesperado na aplicação.";

var _marked = /*#__PURE__*/regeneratorRuntime.mark(loadOptions),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(loadReactiveOptions);
var loadingOptions$1 = Creators.loadingOptions,
    setFieldValues$1 = Creators.setFieldValues,
    loadPagination$1 = Creators.loadPagination;
function loadOptions(_ref) {
  var payload, option, _yield$call, data, calls, puts, strikes;

  return regeneratorRuntime.wrap(function loadOptions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = _ref.payload;
          _context.prev = 1;
          _context.next = 4;
          return put(loadingOptions$1(true));

        case 4:
          option = payload.option;
          _context.next = 7;
          return call(api.get, "/stocks/options/expirations/" + option);

        case 7:
          _yield$call = _context.sent;
          data = _yield$call.data;

          if (data) {
            _context.next = 23;
            break;
          }

          _context.next = 12;
          return put(setFieldValues$1({
            field: "calls",
            values: []
          }));

        case 12:
          _context.next = 14;
          return put(setFieldValues$1({
            field: "puts",
            values: []
          }));

        case 14:
          _context.next = 16;
          return put(setFieldValues$1({
            field: "strikes",
            values: []
          }));

        case 16:
          _context.next = 18;
          return put(setFieldValues$1({
            field: "allCalls",
            values: []
          }));

        case 18:
          _context.next = 20;
          return put(setFieldValues$1({
            field: "allPuts",
            values: []
          }));

        case 20:
          _context.next = 22;
          return put(setFieldValues$1({
            field: "allStrikes",
            values: []
          }));

        case 22:
          return _context.abrupt("return", toast.warn("Não há dados disponíveis para este ativo."));

        case 23:
          calls = data.options.filter(function (_ref2) {
            var type = _ref2.type;
            return type === "CALL";
          });
          puts = data.options.filter(function (_ref3) {
            var type = _ref3.type;
            return type === "PUT";
          });
          strikes = data.options.filter(function (item, index) {
            return index % 2 === 0;
          }).map(function (option) {
            return {
              id: option.id,
              strike: option.strike
            };
          });
          _context.next = 28;
          return put(setFieldValues$1({
            field: "allCalls",
            values: calls
          }));

        case 28:
          _context.next = 30;
          return put(setFieldValues$1({
            field: "allPuts",
            values: puts
          }));

        case 30:
          _context.next = 32;
          return put(setFieldValues$1({
            field: "allStrikes",
            values: strikes
          }));

        case 32:
          _context.next = 34;
          return put(setFieldValues$1({
            field: "calls",
            values: calls
          }));

        case 34:
          _context.next = 36;
          return put(setFieldValues$1({
            field: "puts",
            values: puts
          }));

        case 36:
          _context.next = 38;
          return put(setFieldValues$1({
            field: "strikes",
            values: strikes
          }));

        case 38:
          _context.next = 40;
          return put(loadPagination$1());

        case 40:
          _context.next = 45;
          break;

        case 42:
          _context.prev = 42;
          _context.t0 = _context["catch"](1);
          toast.error(SERVER_ERROR);

        case 45:
          _context.prev = 45;
          _context.next = 48;
          return put(loadingOptions$1(false));

        case 48:
          return _context.finish(45);

        case 49:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 42, 45, 49]]);
}
function loadReactiveOptions(_ref4) {
  var payload, mainOption, tableOptions, reactiveOptionURL;
  return regeneratorRuntime.wrap(function loadReactiveOptions$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          payload = _ref4.payload;
          mainOption = payload.mainOption, tableOptions = payload.tableOptions;
          reactiveOptionURL = "http://173.249.37.183:8090/quotes/symbols?symbols=" + mainOption.toUpperCase() + (tableOptions ? "," + tableOptions.join(",") : "");
          _context2.next = 5;
          return put(setFieldValues$1({
            field: "option",
            values: mainOption
          }));

        case 5:
          _context2.next = 7;
          return put(setFieldValues$1({
            field: "reactiveOptionURL",
            values: reactiveOptionURL
          }));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

var _marked$1 = /*#__PURE__*/regeneratorRuntime.mark(rootSaga);
function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return all([takeLatest(Types.LOAD_OPTIONS, loadOptions), takeEvery(Types.LOAD_REACTIVE_OPTIONS, loadReactiveOptions)]);

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$1);
}

var middlewares = null;
var sagaMiddleware = createSaga();

if (process.env.NODE_ENV === "development") {
  middlewares = composeWithDevTools(applyMiddleware(sagaMiddleware));
} else {
  middlewares = applyMiddleware(sagaMiddleware);
}

var store = createStore(reducers, middlewares);
sagaMiddleware.run(rootSaga);

var color = {
  primary: "#3B3B3D",
  primaryLight: "#757373",
  border: "#3B3B3D",
  borderLight: "#7D7D7D",
  tableCell: "#272827",
  tableNumber: "#537587",
  text: "#D2D5D2",
  textLight: "#ffffff",
  strategyTable: "#FF9A2C",
  sliderBar: "#767171",
  button: "#007BFF"
};

var font = {
  family: {
    primary: "myriad-pro, sans-serif"
  },
  size: {
    normal: "10pt",
    title: "12pt",
    content: "8pt"
  }
};

var effect = {
  hover: "\n    :hover{\n      opacity: 0.8;\n    }\n  "
};

var _templateObject;
var GlobalStyle = createGlobalStyle(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  @import url(\"https://use.typekit.net/sww7xwr.css\");\n  body{\n    margin: 0;\n    padding: 0;\n    background-color: black;\n    max-width: 1650px;\n    ul{\n      list-style: none;\n      margin: 0;\n      padding: 0;\n    }\n    a, p, h1, h2, h3, label{\n      margin: 0;\n      padding: 0;\n      font-family: ", ";\n      font-weight: normal;\n    }\n\n    p{\n      font-family: ", ";\n    }\n\n    h2{\n      font-size: ", ";\n      color: ", ";\n      text-transform: uppercase;\n    }\n\n    .loadable-margin{\n      margin-top: 50px;\n    }\n  }\n"])), font.family.title, font.family.content, font.size.title, color.text);

var ComponentWrapper = function ComponentWrapper(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React__default.createElement(Provider, {
    store: store
  }, children, /*#__PURE__*/React__default.createElement(ToastContainer, null), /*#__PURE__*/React__default.createElement(GlobalStyle, null));
};

function _extends$1() {
  _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$1.apply(this, arguments);
}

var _ref = /*#__PURE__*/createElement("g", {
  "data-name": "Camada 2"
}, /*#__PURE__*/createElement("path", {
  d: "M25.92 13.21A2.53 2.53 0 0024.4 11a3.53 3.53 0 01-1.89-1.6 3.46 3.46 0 01.21-2.47 2.53 2.53 0 00-.52-2.67 2.53 2.53 0 00-2.67-.52 3.46 3.46 0 01-2.47.21A3.53 3.53 0 0115.46 2 2.43 2.43 0 0011 2a3.53 3.53 0 01-1.6 1.89 3.46 3.46 0 01-2.51-.19 2.53 2.53 0 00-2.67.52 2.53 2.53 0 00-.52 2.67 3.46 3.46 0 01.21 2.47A3.53 3.53 0 012 11a2.43 2.43 0 000 4.5 3.53 3.53 0 011.89 1.6 3.46 3.46 0 01-.21 2.47 2.53 2.53 0 00.52 2.67 2.53 2.53 0 002.67.52 3.46 3.46 0 012.47-.21A3.57 3.57 0 0111 24.4a2.43 2.43 0 004.5 0 3.57 3.57 0 011.6-1.89 3.46 3.46 0 012.47.21 2.43 2.43 0 003.19-3.19 3.46 3.46 0 01-.21-2.47 3.53 3.53 0 011.89-1.6 2.52 2.52 0 001.52-2.25zm-12.71 4.67a4.67 4.67 0 114.66-4.67 4.66 4.66 0 01-4.66 4.67z",
  fill: "#444",
  stroke: "#b1b2b1",
  strokeMiterlimit: 10,
  "data-name": "Camada 1"
}));

function SvgSettings(props) {
  return /*#__PURE__*/createElement("svg", _extends$1({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 26.42 26.42"
  }, props), _ref);
}

function _extends$2() {
  _extends$2 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$2.apply(this, arguments);
}

var _ref$1 = /*#__PURE__*/createElement("g", {
  "data-name": "Camada 2"
}, /*#__PURE__*/createElement("path", {
  d: "M13.21.5a12.71 12.71 0 1012.71 12.71A12.71 12.71 0 0013.21.5zm6.65 15.06a3 3 0 010 4.31l-.15.15a3 3 0 01-4.31 0l-2.19-2.18L11 20a3 3 0 01-4.31 0l-.15-.15a3 3 0 010-4.31l2.19-2.19-2.17-2.16a3.06 3.06 0 010-4.32l.15-.15a3 3 0 014.31 0l2.19 2.19 2.19-2.19a3 3 0 014.31 0l.15.15a3.06 3.06 0 010 4.32l-2.19 2.18z",
  fill: "#444",
  stroke: "#b1b2b1",
  strokeMiterlimit: 10,
  "data-name": "Camada 1"
}));

function SvgClose(props) {
  return /*#__PURE__*/createElement("svg", _extends$2({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 26.42 26.42"
  }, props), _ref$1);
}

var _templateObject$1, _templateObject2, _templateObject3, _templateObject4;
var Wrapper = styled.nav(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteralLoose(["\n  position: relative;\n  width: 100%;\n  height: 60px;\n  display: flex;\n  justify-content: space-between;\n  background-color: ", ";\n\n  ::before {\n    content: \"\";\n    position: absolute;\n    z-index: 9;\n    top: 0;\n    height: 50%;\n    width: 100%;\n    background-color: rgba(255, 255, 255, 0.13);\n    filter: blur(3px);\n  }\n\n  .search {\n    margin: 10px 0 0 10px;\n    position: relative;\n    z-index: 99;\n  }\n\n  .items {\n    display: grid;\n    grid-template-columns: 2.5fr repeat(5, 1.8fr) 6fr;\n    position: relative;\n    top: 5px;\n  }\n"])), color.primary);
var Item = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n  margin: 0 40px;\n  position: relative;\n\n  h1 {\n    margin: 0;\n    font-size: 9pt;\n    color: ", ";\n    font-family: ", ";\n    line-height: 15pt;\n  }\n\n  p {\n    margin: 0;\n    font-size: 16pt;\n    color: ", ";\n    font-family: ", ";\n    line-height: 26pt;\n  }\n\n  .loading {\n    position: absolute;\n    top: 10px;\n\n    svg {\n      height: 50px;\n    }\n  }\n"])), color.text, font.family.primary, function (props) {
  return props.red ? "red" : color.textLight;
}, font.family.primary);
var CorporationName = styled.h1(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n  position: relative;\n  font-size: 16pt;\n  color: ", ";\n  text-transform: uppercase;\n  font-family: ", ";\n  line-height: 26pt;\n\n  .loading {\n    position: absolute;\n    top: 10px;\n    right: 60px;\n\n    svg {\n      height: 50px;\n    }\n  }\n"])), color.textLight, font.family.primary);
var Buttons = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n  margin: 5px 10px 0 0;\n  display: flex;\n  position: relative;\n  z-index: 99;\n\n  .button {\n    cursor: pointer;\n    /* :hover {\n      .cls-1 {\n        fill: ", ";\n        stroke: ", ";\n      }\n    } */\n  }\n\n  svg {\n    width: 40px;\n    margin: 0 5px;\n\n    .cls-1 {\n      fill: transparent;\n    }\n  }\n"])), color.button, color.button);

var _templateObject$2;
var Center = styled.div(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])));
var Loadable = function Loadable(props) {
  var isLoading = props.isLoading,
      type = props.type,
      color = props.color,
      width = props.width,
      center = props.center,
      className = props.className,
      children = props.children;
  return isLoading ? center ? /*#__PURE__*/React__default.createElement(Center, null, /*#__PURE__*/React__default.createElement(ReactLoading, {
    type: type,
    color: color,
    width: width,
    className: className
  })) : /*#__PURE__*/React__default.createElement(ReactLoading, {
    type: type,
    color: color,
    width: width,
    className: className
  }) : children;
};
Loadable.defaultProps = {
  isLoading: false,
  center: false,
  type: "bars",
  color: color.textLight
};
Loadable.propTypes = {
  isLoading: PropTypes.bool,
  center: PropTypes.bool,
  type: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

function _extends$3() {
  _extends$3 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$3.apply(this, arguments);
}

var _ref$2 = /*#__PURE__*/createElement("g", {
  "data-name": "Camada 2"
}, /*#__PURE__*/createElement("path", {
  d: "M15.52 13.32l-4.26-4.26a6.05 6.05 0 10-2.2 2.2l4.26 4.26a.91.91 0 001.31 0l.89-.89a.91.91 0 000-1.31zM1.75 6A4.29 4.29 0 116 10.32 4.29 4.29 0 011.75 6z",
  fill: "#222",
  "data-name": "Camada 1"
}));

function SvgSearchIcon(props) {
  return /*#__PURE__*/createElement("svg", _extends$3({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 15.8 15.8"
  }, props), _ref$2);
}

var _templateObject$3, _templateObject2$1, _templateObject3$1;
var Wrapper$1 = styled.div(_templateObject$3 || (_templateObject$3 = _taggedTemplateLiteralLoose(["\n  display: flex;\n"])));
var Input = styled.input(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteralLoose(["\n  text-transform: uppercase;\n  background-color: black;\n  border: 2pt solid ", ";\n  border-radius: 5px 0 0 5px;\n  color: ", ";\n  text-align: center;\n  font-size: 12pt;\n  font-family: myriad-pro, sans-serif;\n  line-height: 20pt;\n"])), color.primaryLight, color.text);
var Button = styled.div(_templateObject3$1 || (_templateObject3$1 = _taggedTemplateLiteralLoose(["\n  cursor: pointer;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: ", ";\n  border-radius: 0 5px 5px 0;\n  :hover {\n    opacity: 0.8;\n  }\n  svg {\n    width: 20px;\n  }\n"])), color.primaryLight);
var SearchInput = function SearchInput(_ref) {
  var inputProps = _ref.inputProps,
      onSearch = _ref.onSearch;

  function handlePress(event) {
    if (event.key === "Enter") {
      onSearch();
    }
  }

  return /*#__PURE__*/React__default.createElement(Wrapper$1, null, /*#__PURE__*/React__default.createElement(Input, _extends({
    onKeyPress: handlePress
  }, inputProps)), /*#__PURE__*/React__default.createElement(Button, {
    "data-value": "123",
    onClick: onSearch
  }, /*#__PURE__*/React__default.createElement(SvgSearchIcon, {
    alt: "\xEDcone de pesquisa"
  })));
};
SearchInput.propTypes = {
  inputProps: PropTypes.object,
  onSearch: PropTypes.func
};

var _templateObject$4;
var Icon = styled.div(_templateObject$4 || (_templateObject$4 = _taggedTemplateLiteralLoose(["\n  width: ", ";\n  height: ", ";\n\n  background-color: ", ";\n  mask: url(", ") no-repeat center / contain;\n  -webkit-mask: url(", ") no-repeat center / contain;\n"])), function (props) {
  return props.width ? props.width : "24px";
}, function (props) {
  return props.height ? props.height : "24px";
}, function (props) {
  return props.color ? props.color : "#D2D5D2";
}, function (props) {
  return props.url;
}, function (props) {
  return props.src;
});

var Navbar = function Navbar(_ref) {
  var handleSettings = _ref.handleSettings,
      handleExit = _ref.handleExit;
  var dispatch = useDispatch();
  var loadReactiveOptions = Creators.loadReactiveOptions,
      setFieldValues = Creators.setFieldValues;

  var _useSelector = useSelector(function (state) {
    return state.options;
  }),
      isLoadingRequest = _useSelector.isLoadingRequest,
      navbar = _useSelector.navbar,
      reactiveOptionURL = _useSelector.reactiveOptionURL;

  var optionRef = useRef();

  function handleSearch() {
    var _optionRef$current;

    var option = (_optionRef$current = optionRef.current) === null || _optionRef$current === void 0 ? void 0 : _optionRef$current.value;

    if (option) {
      dispatch(loadReactiveOptions({
        mainOption: option,
        tableOptions: ["PETRE722"]
      }));
    }
  }

  var getMenuData = function getMenuData(array) {
    var result = array.find(function (_ref2) {
      var _optionRef$current2;

      var symbol = _ref2.symbol;
      return symbol === ((_optionRef$current2 = optionRef.current) === null || _optionRef$current2 === void 0 ? void 0 : _optionRef$current2.value.toUpperCase());
    });
    return result;
  };

  useEffect(function () {
    var eventSource;
    var result = [];

    if (reactiveOptionURL) {
      eventSource = new EventSource(reactiveOptionURL);

      eventSource.onmessage = function (_ref3) {
        var data = _ref3.data;

        if (typeof data !== undefined) {
          result.push(JSON.parse(data));
          console.log(data);
        }

        var navbar = getMenuData(result);
        dispatch(setFieldValues({
          field: "navbar",
          values: navbar
        }));
      };

      eventSource.onerror = function (error) {
        console.log("erro", error);
      };
    }

    return function () {
      if (reactiveOptionURL) {
        eventSource.close();
      }
    };
  }, [reactiveOptionURL]);
  return /*#__PURE__*/React__default.createElement(Wrapper, {
    className: "draggableNavbar"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "search"
  }, /*#__PURE__*/React__default.createElement(SearchInput, {
    inputProps: {
      ref: optionRef
    },
    onSearch: handleSearch
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "items"
  }, /*#__PURE__*/React__default.createElement(Item, null, /*#__PURE__*/React__default.createElement("h1", null, "\xDAltimo pre\xE7o"), /*#__PURE__*/React__default.createElement(Loadable, {
    isLoading: isLoadingRequest,
    className: "loading"
  }, /*#__PURE__*/React__default.createElement("p", null, navbar === null || navbar === void 0 ? void 0 : navbar.ultimo))), /*#__PURE__*/React__default.createElement(Item, {
    red: true
  }, /*#__PURE__*/React__default.createElement("h1", null, "Oscila\xE7\xE3o"), /*#__PURE__*/React__default.createElement(Loadable, {
    isLoading: isLoadingRequest,
    className: "loading"
  }, /*#__PURE__*/React__default.createElement("p", null))), /*#__PURE__*/React__default.createElement(Item, null, /*#__PURE__*/React__default.createElement("h1", null, "M\xEDnimo"), /*#__PURE__*/React__default.createElement(Loadable, {
    isLoading: isLoadingRequest,
    className: "loading"
  }, /*#__PURE__*/React__default.createElement("p", null))), /*#__PURE__*/React__default.createElement(Item, null, /*#__PURE__*/React__default.createElement("h1", null, "M\xE1ximo"), /*#__PURE__*/React__default.createElement(Loadable, {
    isLoading: isLoadingRequest,
    className: "loading"
  }, /*#__PURE__*/React__default.createElement("p", null))), /*#__PURE__*/React__default.createElement(Item, null, /*#__PURE__*/React__default.createElement("h1", null, "Compra"), /*#__PURE__*/React__default.createElement(Loadable, {
    isLoading: isLoadingRequest,
    className: "loading"
  }, /*#__PURE__*/React__default.createElement("p", null, navbar === null || navbar === void 0 ? void 0 : navbar.compra))), /*#__PURE__*/React__default.createElement(Item, null, /*#__PURE__*/React__default.createElement("h1", null, "Venda"), /*#__PURE__*/React__default.createElement(Loadable, {
    isLoading: isLoadingRequest,
    className: "loading"
  }, /*#__PURE__*/React__default.createElement("p", null, navbar === null || navbar === void 0 ? void 0 : navbar.venda))), /*#__PURE__*/React__default.createElement(Loadable, {
    isLoading: isLoadingRequest,
    className: "loading"
  }, /*#__PURE__*/React__default.createElement(CorporationName, null))), /*#__PURE__*/React__default.createElement(Buttons, null, /*#__PURE__*/React__default.createElement(SvgSettings, {
    alt: "Bot\xE3o de configura\xE7\xF5es",
    className: "button",
    onClick: handleSettings
  }), /*#__PURE__*/React__default.createElement(SvgClose, {
    className: "button",
    alt: " Bot\xE3o de fechar",
    onClick: handleExit
  })));
};

var _templateObject$5, _templateObject2$2, _templateObject3$2, _templateObject4$1, _templateObject5, _templateObject6;
var Wrapper$2 = styled.div(_templateObject$5 || (_templateObject$5 = _taggedTemplateLiteralLoose(["\n  display: grid;\n  grid-template-columns: 1.6fr 1fr;\n  margin: 5px 0;\n  color: white;\n"])));
var Options = styled.div(_templateObject2$2 || (_templateObject2$2 = _taggedTemplateLiteralLoose(["\n  display: grid;\n  grid-template-rows: 1fr 1fr;\n  grid-row-gap: 20px;\n"])));
var Main = styled.div(_templateObject3$2 || (_templateObject3$2 = _taggedTemplateLiteralLoose(["\n  margin-top: -70px;\n  display: flex;\n  grid-template-columns: 3fr 1fr 3fr;\n  grid-column-gap: 10px;\n"])));
var Move = styled.span(_templateObject4$1 || (_templateObject4$1 = _taggedTemplateLiteralLoose(["\n  display: ", ";\n  cursor: ", ";\n  opacity: ", ";\n  position: relative;\n  width: 100%;\n  height: 40px;\n  background-color: ", ";\n\n  .totalItems {\n    position: absolute;\n    left: 10px;\n    bottom: 5px;\n  }\n\n  .countItems {\n    position: absolute;\n    right: 10px;\n    bottom: 5px;\n  }\n\n  :hover {\n    opacity: ", ";\n  }\n  ::before {\n    content: \"\";\n    color: black;\n    position: relative;\n    top: 10px;\n    left: calc(50% - 10px);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 0;\n    height: 0;\n  }\n"])), function (props) {
  return props.display ? null : "none";
}, function (props) {
  return props.disabled ? "unset" : "pointer";
}, function (props) {
  return props.disabled ? "0.4" : "1";
}, color.primary, function (props) {
  return props.disabled ? "0.4" : "0.8";
});
var MoveUp = styled(Move)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n  margin-top: -15px;\n  ::before {\n    border-left: 20px solid transparent;\n    border-right: 20px solid transparent;\n    border-bottom: 20px solid #050000;\n  }\n"])));
var MoveDown = styled(Move)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteralLoose(["\n  margin-top: -10px;\n  ::before {\n    border-top: 20px solid #050000;\n    border-right: 20px solid transparent;\n    border-left: 20px solid transparent;\n  }\n"])));

function _extends$4() {
  _extends$4 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$4.apply(this, arguments);
}

var _ref$3 = /*#__PURE__*/createElement("defs", null, /*#__PURE__*/createElement("style", null, ".arrow_svg__cls-1{fill:#d2d5d2}"));

var _ref2 = /*#__PURE__*/createElement("g", {
  id: "arrow_svg__Camada_2",
  "data-name": "Camada 2"
}, /*#__PURE__*/createElement("g", {
  id: "arrow_svg__Camada_1-2",
  "data-name": "Camada 1"
}, /*#__PURE__*/createElement("path", {
  className: "arrow_svg__cls-1",
  d: "M3.42 8.51L0 5.09h6.84L3.42 8.51z"
}), /*#__PURE__*/createElement("path", {
  className: "arrow_svg__cls-1",
  d: "M2.4 0h2.04v5.45H2.4z"
})));

function SvgArrow(props) {
  return /*#__PURE__*/createElement("svg", _extends$4({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 6.84 8.51"
  }, props), _ref$3, _ref2);
}

var _templateObject$6, _templateObject2$3, _templateObject3$3, _templateObject4$2, _templateObject5$1, _templateObject6$1;
var TableHeader = styled.div(_templateObject$6 || (_templateObject$6 = _taggedTemplateLiteralLoose(["\n  background-color: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: ", ";\n  height: 40px;\n"])), color.primary, function (props) {
  return props.right && "flex-end";
});
var TableHeaderDate = styled.h1(_templateObject2$3 || (_templateObject2$3 = _taggedTemplateLiteralLoose(["\n  color: ", ";\n  font-size: 12pt;\n  line-height: 14pt;\n  font-family: ", ";\n  padding-left: 40px;\n  padding-right: ", ";\n  display: flex;\n\n  span {\n    cursor: pointer;\n    border: solid ", ";\n    border-width: 0 4px 4px 0;\n    display: inline-block;\n    position: relative;\n    padding: 7px;\n    transform: ", ";\n    top: ", ";\n    margin-right: ", ";\n    margin-left: ", ";\n\n    :hover {\n      opacity: 0.8;\n    }\n  }\n"])), color.text, font.family.primary, function (props) {
  return props.right && "40px";
}, color.text, function (props) {
  return props.rotate ? "rotate(-135deg)" : "rotate(45deg)";
}, function (props) {
  return props.rotate ? "5px" : "-5px";
}, function (props) {
  return !props.right && "20px";
}, function (props) {
  return props.right && "20px";
});
var TableHeaderTitle = styled(TableHeaderDate)(_templateObject3$3 || (_templateObject3$3 = _taggedTemplateLiteralLoose(["\n  text-transform: uppercase;\n"])));
var TableContent = styled.div(_templateObject4$2 || (_templateObject4$2 = _taggedTemplateLiteralLoose(["\n  .header {\n    display: grid;\n    align-content: center;\n    grid-template-columns: ", ";\n    padding: 0 10px;\n    margin-top: 5px;\n    background-color: ", ";\n    height: 40px;\n\n    h1 {\n      color: ", ";\n      font-size: 12pt;\n      line-height: 14pt;\n      font-family: ", ";\n      text-transform: uppercase;\n\n      :nth-child(1) {\n        margin-left: ", ";\n      }\n\n      :nth-child(n + 2) {\n        ::before {\n          content: \"\";\n          position: relative;\n          margin-right: 5px;\n          border-right: 1px dashed ", ";\n        }\n      }\n    }\n  }\n"])), function (props) {
  return "repeat(" + props.cols + ", 1fr)";
}, color.primary, color.text, font.family.primary, function (props) {
  return props.cols > 5 && "40px";
}, color.text);
var TableContentHeader = styled.div(_templateObject5$1 || (_templateObject5$1 = _taggedTemplateLiteralLoose(["\n  display: grid;\n  align-content: center;\n  grid-template-columns: ", ";\n  padding: 0 10px;\n  margin-top: 5px;\n  background-color: ", ";\n  height: 40px;\n\n  h1 {\n    color: ", ";\n    font-size: 12pt;\n    line-height: 14pt;\n    font-family: ", ";\n    text-transform: uppercase;\n\n    :nth-child(1) {\n      margin-left: ", ";\n    }\n\n    :nth-child(n + 2) {\n      ::before {\n        content: \"\";\n        position: relative;\n        margin-right: 5px;\n        border-right: 1px dashed ", ";\n      }\n    }\n  }\n"])), function (props) {
  return "repeat(" + props.cols + ", 1fr)";
}, color.primary, color.text, font.family.primary, function (props) {
  return props.cols > 5 && "40px";
}, color.text);
var TableContentRow = styled.div(_templateObject6$1 || (_templateObject6$1 = _taggedTemplateLiteralLoose(["\n  display: grid;\n  grid-template-columns: ", ";\n  padding: 0 0 5px 0;\n  border-bottom: 1px dashed ", ";\n  color: ", ";\n  font-size: 12pt;\n  line-height: 23pt;\n  font-family: ", ";\n  max-height: 22px;\n\n  p {\n    position: relative;\n    bottom: 3px;\n    color: ", ";\n\n    :nth-child(1) {\n      margin-left: ", ";\n    }\n\n    :nth-child(n + 2) {\n      margin-left: 15px;\n    }\n  }\n\n  .M {\n    text-transform: uppercase;\n  }\n\n  .value {\n    color: green;\n  }\n"])), function (props) {
  return "repeat(" + props.cols + ", 1fr)";
}, color.border, color.text, font.family.primary, color.tableNumber, function (props) {
  return props.cols > 5 && "50px";
});

var _templateObject$7, _templateObject2$4, _templateObject3$4;
var Wrapper$3 = styled.header(_templateObject$7 || (_templateObject$7 = _taggedTemplateLiteralLoose(["\n  display: grid;\n  grid-template-columns: 3fr 1fr 3fr;\n  grid-column-gap: 10px;\n"])));
var StrikeTableHeader = styled.div(_templateObject2$4 || (_templateObject2$4 = _taggedTemplateLiteralLoose(["\n  background-color: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 40px;\n  h1 {\n    color: ", ";\n    font-size: 12pt;\n    line-height: 14pt;\n    text-transform: uppercase;\n    font-family: ", ";\n  }\n  svg {\n    cursor: pointer;\n    height: 15px;\n    margin-left: 5px;\n    transition: transform 0.2s;\n    transform: ", ";\n    :hover {\n      opacity: 0.8;\n    }\n  }\n"])), color.primary, color.text, font.family.primary, function (props) {
  return props.rotate ? "rotate(180deg)" : "rotate(0deg)";
});
var StrikeTableContentHeader = styled.div(_templateObject3$4 || (_templateObject3$4 = _taggedTemplateLiteralLoose(["\n  display: grid;\n  grid-template-columns: ", ";\n  height: 40px;\n  margin-top: 5px;\n  background-color: ", ";\n\n  h1 {\n    position: relative;\n    top: 5px;\n    margin: 10px;\n    color: ", ";\n    font-size: 12pt;\n    line-height: 14pt;\n    font-family: ", ";\n\n    :nth-child(2) {\n      top: -5px;\n    }\n\n    :nth-child(even) {\n      text-transform: uppercase;\n    }\n  }\n"])), function (props) {
  return "repeat(" + props.cols + ", 1fr)";
}, color.primary, color.text, font.family.primary);

var Header = function Header() {
  var _useState = useState(false),
      isToRotate = _useState[0],
      setIsToRotate = _useState[1];

  function handleStrikeOrder() {
    setIsToRotate(!isToRotate);
  }

  return /*#__PURE__*/React__default.createElement(Wrapper$3, null, /*#__PURE__*/React__default.createElement("section", null, /*#__PURE__*/React__default.createElement(TableHeader, null, /*#__PURE__*/React__default.createElement(TableHeaderDate, null, /*#__PURE__*/React__default.createElement("span", null), "27/07/2019"), /*#__PURE__*/React__default.createElement(TableHeaderTitle, null, "Call")), /*#__PURE__*/React__default.createElement(TableContent, null, /*#__PURE__*/React__default.createElement(TableContentHeader, {
    cols: 6
  }, /*#__PURE__*/React__default.createElement("h1", null, "M"), /*#__PURE__*/React__default.createElement("h1", null, "Taxa"), /*#__PURE__*/React__default.createElement("h1", null, "VE"), /*#__PURE__*/React__default.createElement("h1", null, "VI"), /*#__PURE__*/React__default.createElement("h1", null, "Compra"), /*#__PURE__*/React__default.createElement("h1", null, "Venda")))), /*#__PURE__*/React__default.createElement("section", null, /*#__PURE__*/React__default.createElement(StrikeTableHeader, {
    rotate: isToRotate ? 1 : 0
  }, /*#__PURE__*/React__default.createElement("h1", null, "Strike"), /*#__PURE__*/React__default.createElement(SvgArrow, {
    onClick: handleStrikeOrder,
    alt: "Seta"
  })), /*#__PURE__*/React__default.createElement(TableContent, null, /*#__PURE__*/React__default.createElement(StrikeTableContentHeader, {
    cols: 3
  }, /*#__PURE__*/React__default.createElement("h1", null, "PETR"), /*#__PURE__*/React__default.createElement("h1", null, "13d"), /*#__PURE__*/React__default.createElement("h1", null, "PETR")))), /*#__PURE__*/React__default.createElement("section", null, /*#__PURE__*/React__default.createElement(TableHeader, {
    right: true
  }, /*#__PURE__*/React__default.createElement(TableHeaderTitle, null, "Put"), /*#__PURE__*/React__default.createElement(TableHeaderDate, {
    right: true
  }, "27/07/2019", /*#__PURE__*/React__default.createElement("span", null))), /*#__PURE__*/React__default.createElement(TableContent, null, /*#__PURE__*/React__default.createElement(TableContentHeader, {
    cols: 5
  }, /*#__PURE__*/React__default.createElement("h1", null, "Compra"), /*#__PURE__*/React__default.createElement("h1", null, "Venda"), /*#__PURE__*/React__default.createElement("h1", null, "VI"), /*#__PURE__*/React__default.createElement("h1", null, "VE"), /*#__PURE__*/React__default.createElement("h1", null, "Taxa")))));
};

var _templateObject$8, _templateObject2$5, _templateObject3$5, _templateObject4$3, _templateObject5$2;
var Wrapper$4 = styled.div(_templateObject$8 || (_templateObject$8 = _taggedTemplateLiteralLoose([""])));
var TableContentRow$1 = styled(TableContentRow)(_templateObject2$5 || (_templateObject2$5 = _taggedTemplateLiteralLoose(["\n  position: relative;\n\n  .value {\n    position: relative;\n    z-index: 9999;\n    cursor: pointer;\n  }\n"])));
var RowSelected = styled.div(_templateObject3$5 || (_templateObject3$5 = _taggedTemplateLiteralLoose(["\n  ", "\n\n  ", "\n\n  border-radius: 5px;\n  position: absolute;\n  width: calc(100% + 115px);\n  height: 20px;\n  top: 3px;\n  left: 20px;\n\n  .type {\n    position: absolute;\n    /* left: -10px; */\n    height: 100%;\n    width: 20px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .remove {\n    position: absolute;\n    z-index: 999;\n    right: 0;\n    height: 100%;\n    width: 20px;\n    display: ", ";\n    justify-content: center;\n    align-items: center;\n  }\n"])), function (props) {
  return props.active === "sell" && css(_templateObject4$3 || (_templateObject4$3 = _taggedTemplateLiteralLoose(["\n      border: 1px solid red;\n\n      .remove,\n      .type {\n        cursor: pointer;\n        background-color: red;\n      }\n    "])));
}, function (props) {
  return props.active === "buy" && css(_templateObject5$2 || (_templateObject5$2 = _taggedTemplateLiteralLoose(["\n      border: 1px solid green;\n\n      .remove,\n      .type {\n        cursor: pointer;\n        background-color: green;\n      }\n    "])));
}, function (props) {
  var _props$active;

  return ((_props$active = props.active) === null || _props$active === void 0 ? void 0 : _props$active.length) > 1 ? "flex" : "none";
});

var Call = function Call() {
  var dispatch = useDispatch();
  var setTableOption = Creators.setTableOption,
      removeTableOption = Creators.removeTableOption;

  var _useSelector = useSelector(function (state) {
    return state.options;
  }),
      isLoadingRequest = _useSelector.isLoadingRequest,
      calls = _useSelector.calls,
      allOptions = _useSelector.allOptions;

  return /*#__PURE__*/React__default.createElement(Wrapper$4, null, /*#__PURE__*/React__default.createElement(TableContent, null, /*#__PURE__*/React__default.createElement(Loadable, {
    isLoading: isLoadingRequest,
    center: true,
    className: "loadable-margin"
  }, calls.map(function (call) {
    var _call$compra, _call$venda;

    return /*#__PURE__*/React__default.createElement(TableContentRow$1, {
      key: call.id,
      cols: 6
    }, /*#__PURE__*/React__default.createElement("p", {
      className: "M"
    }, call.model === "AMERICAN" && "A", call.model === "EUROPEAN" && "E"), /*#__PURE__*/React__default.createElement("p", null, "26.90"), /*#__PURE__*/React__default.createElement("p", null, "26.90"), /*#__PURE__*/React__default.createElement("p", null, "26.90"), /*#__PURE__*/React__default.createElement("p", {
      className: "value",
      onClick: function onClick() {
        dispatch(setTableOption(_extends({}, call, {
          cv: "sell"
        })));
      }
    }, (_call$compra = call.compra) === null || _call$compra === void 0 ? void 0 : _call$compra.toFixed(2)), /*#__PURE__*/React__default.createElement("p", {
      className: "value",
      onClick: function onClick() {
        dispatch(setTableOption(_extends({}, call, {
          cv: "buy"
        })));
      }
    }, (_call$venda = call.venda) === null || _call$venda === void 0 ? void 0 : _call$venda.toFixed(2)), /*#__PURE__*/React__default.createElement(RowSelected, {
      active: allOptions.filter(function (_ref) {
        var id = _ref.id;
        return id === call.id;
      })[0] !== undefined ? allOptions.filter(function (_ref2) {
        var id = _ref2.id;
        return id === call.id;
      })[0].cv : ""
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "type",
      onClick: function onClick() {
        dispatch(setTableOption(_extends({}, call)));
      }
    }, /*#__PURE__*/React__default.createElement("span", null, allOptions.filter(function (_ref3) {
      var id = _ref3.id;
      return id === call.id;
    })[0] !== undefined ? allOptions.filter(function (_ref4) {
      var id = _ref4.id;
      return id === call.id;
    })[0].initials : "")), /*#__PURE__*/React__default.createElement("div", {
      className: "remove",
      onClick: function onClick() {
        return dispatch(removeTableOption({
          id: call.id
        }));
      }
    }, /*#__PURE__*/React__default.createElement("span", null, "x"))));
  }))));
};

function _extends$5() {
  _extends$5 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$5.apply(this, arguments);
}

var _ref$4 = /*#__PURE__*/createElement("defs", null, /*#__PURE__*/createElement("style", null, ".horizontal-lines_svg__cls-1{fill:#7d7d7d}"));

var _ref2$1 = /*#__PURE__*/createElement("g", {
  id: "horizontal-lines_svg__Camada_2",
  "data-name": "Camada 2"
}, /*#__PURE__*/createElement("g", {
  id: "horizontal-lines_svg__Camada_1-2",
  "data-name": "Camada 1"
}, /*#__PURE__*/createElement("path", {
  className: "horizontal-lines_svg__cls-1",
  d: "M6.61 0h6.61v1.3H6.61zM9.91 3.24h3.31v1.29H9.91zM6.61 12.95h6.61v1.3H6.61zM9.91 9.72h3.31v1.29H9.91zM0 6.48h13.22v1.3H0z"
})));

function SvgHorizontalLines(props) {
  return /*#__PURE__*/createElement("svg", _extends$5({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 13.22 14.25"
  }, props), _ref$4, _ref2$1);
}

var _templateObject$9, _templateObject2$6, _templateObject3$6;
var Wrapper$5 = styled.div(_templateObject$9 || (_templateObject$9 = _taggedTemplateLiteralLoose(["\n  width: 180px;\n"])));
var TableContent$1 = styled.div(_templateObject2$6 || (_templateObject2$6 = _taggedTemplateLiteralLoose([""])));
var TableContentRow$2 = styled.div(_templateObject3$6 || (_templateObject3$6 = _taggedTemplateLiteralLoose(["\n  display: grid;\n  grid-template-columns: ", ";\n  padding: 0 0 5px 0;\n  border-bottom: 1px dashed ", ";\n  color: ", ";\n  font-size: 10pt;\n  font-family: ", ";\n  max-height: 22px;\n\n  p {\n    position: relative;\n    z-index: 999;\n  }\n\n  svg {\n    width: 20px;\n    position: relative;\n    top: -36px;\n    left: 265%;\n  }\n\n  :nth-child(odd) {\n    background-color: ", ";\n  }\n\n  :nth-child(", ") {\n    ::after {\n      content: \"\";\n      position: relative;\n      border-top: 1px solid red;\n      border-right: 1px solid red;\n      border-bottom: 1px solid red;\n      border-radius: 0 5px 5px 0;\n    }\n  }\n\n  :nth-child(", ") {\n    ::after {\n      content: \"\";\n      position: relative;\n      left: 100%;\n      border-top: 1px solid green;\n      border-bottom: 1px solid green;\n      border-left: 1px solid green;\n      border-radius: 5px 0 0 5px;\n    }\n  }\n\n  ::after {\n    content: \"\";\n    top: -34px;\n    position: relative;\n    z-index: 99;\n    height: 22px;\n    width: calc(100% * 2);\n  }\n\n  p {\n    position: relative;\n    bottom: 5px;\n    margin: 10px;\n    color: ", ";\n    font-size: 12pt;\n    line-height: 14pt;\n    font-family: ", ";\n    text-transform: uppercase;\n  }\n\n  .code {\n    font-size: 10pt;\n  }\n"])), function (props) {
  return "repeat(" + props.cols + ", 1fr)";
}, color.borderLight, color.text, font.family.primary, color.tableCell, function (props) {
  return props.sellActive + 1;
}, function (props) {
  return props.buyActive + 1;
}, color.text, font.family.primary);

var Strike = function Strike() {
  var _useSelector = useSelector(function (state) {
    return state.options;
  }),
      isLoadingRequest = _useSelector.isLoadingRequest,
      strikes = _useSelector.strikes;

  return /*#__PURE__*/React__default.createElement(Wrapper$5, null, /*#__PURE__*/React__default.createElement(TableContent$1, null, /*#__PURE__*/React__default.createElement(Loadable, {
    isLoading: isLoadingRequest,
    center: true,
    className: "loadable-margin"
  }, strikes.map(function (strike) {
    return /*#__PURE__*/React__default.createElement(TableContentRow$2, {
      key: strike.id,
      cols: 3
    }, /*#__PURE__*/React__default.createElement("p", {
      className: "code"
    }, "H27"), /*#__PURE__*/React__default.createElement("p", null, strike.strike), /*#__PURE__*/React__default.createElement("p", {
      className: "code"
    }, "H27"), /*#__PURE__*/React__default.createElement(SvgHorizontalLines, {
      alt: "Linhas horizontais"
    }));
  }))));
};

var _templateObject$a, _templateObject2$7, _templateObject3$7, _templateObject4$4, _templateObject5$3;
var Wrapper$6 = styled.div(_templateObject$a || (_templateObject$a = _taggedTemplateLiteralLoose([""])));
var TableContentRow$3 = styled(TableContentRow)(_templateObject2$7 || (_templateObject2$7 = _taggedTemplateLiteralLoose(["\n  position: relative;\n\n  p {\n    position: relative;\n    right: 5px;\n\n    :nth-child(1) {\n      margin-left: 10px;\n    }\n  }\n\n  .value {\n    position: relative;\n    z-index: 9999;\n    cursor: pointer;\n  }\n"])));
var RowSelected$1 = styled.div(_templateObject3$7 || (_templateObject3$7 = _taggedTemplateLiteralLoose(["\n  ", "\n\n  ", "\n\n  border-radius: 5px;\n  position: absolute;\n  width: calc(100% + 130px);\n  height: 20px;\n  top: 3px;\n  right: 10px;\n\n  .type {\n    position: absolute;\n    right: 0;\n    height: 100%;\n    width: 20px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .remove {\n    position: absolute;\n    z-index: 999;\n    left: 0;\n    height: 100%;\n    width: 20px;\n    display: ", ";\n    justify-content: center;\n    align-items: center;\n  }\n"])), function (props) {
  return props.active === "sell" && css(_templateObject4$4 || (_templateObject4$4 = _taggedTemplateLiteralLoose(["\n      border: 1px solid red;\n\n      .remove,\n      .type {\n        cursor: pointer;\n        background-color: red;\n      }\n    "])));
}, function (props) {
  return props.active === "buy" && css(_templateObject5$3 || (_templateObject5$3 = _taggedTemplateLiteralLoose(["\n      border: 1px solid green;\n\n      .remove,\n      .type {\n        cursor: pointer;\n        background-color: green;\n      }\n    "])));
}, function (props) {
  var _props$active;

  return ((_props$active = props.active) === null || _props$active === void 0 ? void 0 : _props$active.length) > 1 ? "flex" : "none";
});

var Put = function Put() {
  var dispatch = useDispatch();
  var setTableOption = Creators.setTableOption,
      removeTableOption = Creators.removeTableOption;

  var _useSelector = useSelector(function (state) {
    return state.options;
  }),
      isLoadingRequest = _useSelector.isLoadingRequest,
      puts = _useSelector.puts,
      allOptions = _useSelector.allOptions;

  return /*#__PURE__*/React__default.createElement(Wrapper$6, null, /*#__PURE__*/React__default.createElement(TableContent, null, /*#__PURE__*/React__default.createElement(Loadable, {
    isLoading: isLoadingRequest,
    center: true,
    className: "loadable-margin"
  }, puts.map(function (put) {
    var _put$compra, _put$venda;

    return /*#__PURE__*/React__default.createElement(TableContentRow$3, {
      key: put.id,
      cols: 5
    }, /*#__PURE__*/React__default.createElement("p", {
      className: "value",
      onClick: function onClick() {
        return dispatch(setTableOption(_extends({}, put, {
          cv: "sell"
        })));
      }
    }, (_put$compra = put.compra) === null || _put$compra === void 0 ? void 0 : _put$compra.toFixed(2)), /*#__PURE__*/React__default.createElement("p", {
      className: "value",
      onClick: function onClick() {
        return dispatch(setTableOption(_extends({}, put, {
          cv: "buy"
        })));
      }
    }, (_put$venda = put.venda) === null || _put$venda === void 0 ? void 0 : _put$venda.toFixed(2)), /*#__PURE__*/React__default.createElement("p", null, "26.90"), /*#__PURE__*/React__default.createElement("p", null, "26.90"), /*#__PURE__*/React__default.createElement("p", null, "26.90"), /*#__PURE__*/React__default.createElement(RowSelected$1, {
      active: allOptions.filter(function (_ref) {
        var id = _ref.id;
        return id === put.id;
      })[0] !== undefined ? allOptions.filter(function (_ref2) {
        var id = _ref2.id;
        return id === put.id;
      })[0].cv : ""
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "type",
      onClick: function onClick() {
        return dispatch(setTableOption(_extends({}, put)));
      }
    }, /*#__PURE__*/React__default.createElement("span", null, allOptions.filter(function (_ref3) {
      var id = _ref3.id;
      return id === put.id;
    })[0] !== undefined ? allOptions.filter(function (_ref4) {
      var id = _ref4.id;
      return id === put.id;
    })[0].initials : "")), /*#__PURE__*/React__default.createElement("div", {
      className: "remove",
      onClick: function onClick() {
        return dispatch(removeTableOption({
          id: put.id
        }));
      }
    }, /*#__PURE__*/React__default.createElement("span", null, "x"))));
  }))));
};

function _extends$6() {
  _extends$6 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$6.apply(this, arguments);
}

var _ref$5 = /*#__PURE__*/createElement("g", {
  "data-name": "Camada 2"
}, /*#__PURE__*/createElement("path", {
  d: "M0 7.93V1.5l2.36 2.26S5-1 8.77.18a4.92 4.92 0 013.48 4.93 16.23 16.23 0 01-2.94 8s1.12-6-.45-9-4.52 1.31-4.52 1.31l1.79 2.51z",
  fill: "#d2d5d2",
  "data-name": "Camada 1"
}));

function SvgUndo(props) {
  return /*#__PURE__*/createElement("svg", _extends$6({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 12.26 13.07"
  }, props), _ref$5);
}

function _extends$7() {
  _extends$7 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$7.apply(this, arguments);
}

var _ref$6 = /*#__PURE__*/createElement("g", {
  "data-name": "Camada 2"
}, /*#__PURE__*/createElement("path", {
  d: "M0 7.93V1.5l2.36 2.26S5-1 8.77.18a4.92 4.92 0 013.48 4.93 16.23 16.23 0 01-2.94 8s1.12-6-.45-9-4.52 1.31-4.52 1.31l1.79 2.51z",
  fill: "#d2d5d2",
  "data-name": "Camada 1"
}));

function SvgRedo(props) {
  return /*#__PURE__*/createElement("svg", _extends$7({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 12.26 13.07"
  }, props), _ref$6);
}

function _extends$8() {
  _extends$8 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$8.apply(this, arguments);
}

var _ref$7 = /*#__PURE__*/createElement("defs", null, /*#__PURE__*/createElement("style", null, ".more-or-less_svg__cls-1{fill:#717172}"));

var _ref2$2 = /*#__PURE__*/createElement("g", {
  id: "more-or-less_svg__Camada_2",
  "data-name": "Camada 2"
}, /*#__PURE__*/createElement("g", {
  id: "more-or-less_svg__Camada_1-2",
  "data-name": "Camada 1"
}, /*#__PURE__*/createElement("path", {
  className: "more-or-less_svg__cls-1",
  d: "M0 3.59h9.72v2.55H0zM27.03 3.59h-3.59V0H20.9v3.59h-3.59v2.54h3.59v3.59h2.54V6.13h3.59V3.59z"
})));

function SvgMoreOrLess(props) {
  return /*#__PURE__*/createElement("svg", _extends$8({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 27.03 9.72"
  }, props), _ref$7, _ref2$2);
}

function _extends$9() {
  _extends$9 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$9.apply(this, arguments);
}

var _ref$8 = /*#__PURE__*/createElement("defs", null, /*#__PURE__*/createElement("style", null, ".horizontal-arrows_svg__cls-1{fill:#717172}"));

var _ref2$3 = /*#__PURE__*/createElement("g", {
  id: "horizontal-arrows_svg__Camada_2",
  "data-name": "Camada 2"
}, /*#__PURE__*/createElement("g", {
  id: "horizontal-arrows_svg__Camada_1-2",
  "data-name": "Camada 1"
}, /*#__PURE__*/createElement("path", {
  className: "horizontal-arrows_svg__cls-1",
  d: "M19.21 4.43h-.09v-.31H2.91l3.02-3.06L4.88 0l-.03.03h-.01L1.06 3.81 0 4.87l.02.02.02.02H.03l1.06 1.06.01-.01 3.74 3.75.04-.03.03.03 1.06-1.06-3.08-3.03h16.23v-.31h.09v-.88z"
}), /*#__PURE__*/createElement("path", {
  className: "horizontal-arrows_svg__cls-1",
  d: "M0 11.98h.08v.31h16.21l-3.02 3.06 1.06 1.06.03-.03v.01l3.79-3.79 1.06-1.06-.03-.02-.01-.01v-.01l-1.05-1.06-.01.01-3.75-3.75-.03.03-.03-.03-1.06 1.06 3.08 3.03H.08v.32H0v.87z"
})));

function SvgHorizontalArrows(props) {
  return /*#__PURE__*/createElement("svg", _extends$9({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 19.21 16.41"
  }, props), _ref$8, _ref2$3);
}

function _extends$a() {
  _extends$a = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$a.apply(this, arguments);
}

var _ref$9 = /*#__PURE__*/createElement("defs", null, /*#__PURE__*/createElement("style", null, ".bell_svg__cls-1,.bell_svg__cls-2{fill:#fff}.bell_svg__cls-2{stroke:#007bff;stroke-miterlimit:10}"));

var _ref2$4 = /*#__PURE__*/createElement("g", {
  id: "bell_svg__Camada_2",
  "data-name": "Camada 2"
}, /*#__PURE__*/createElement("g", {
  id: "bell_svg__Camada_1-2",
  "data-name": "Camada 1"
}, /*#__PURE__*/createElement("path", {
  className: "bell_svg__cls-1",
  d: "M3.45 15.38l4.1 1.41A2.14 2.14 0 014.84 18a2.11 2.11 0 01-1.39-2.62zM.2 13.49l11 3.74a.47.47 0 00.54-.16c.14-.2.2-.52-.17-1-.43-.68-.9-1.65.08-4.77.5-1.37 1.25-4.09-1.73-5.88A3.29 3.29 0 008.67 5a4.31 4.31 0 00-4.93 3.48c-.83 2-1.46 3.77-3 3.91a.73.73 0 00-.48.23c-.18.22-.36.55-.19.78a.3.3 0 00.13.09z"
}), /*#__PURE__*/createElement("path", {
  className: "bell_svg__cls-1",
  d: "M2.73 7a.29.29 0 00.27.32c.3 0 .36-.12.48-.47a4.54 4.54 0 013.65-2.51c.19 0 .21-.42.06-.64a4.5 4.5 0 00-2.86 1.12A4.33 4.33 0 002.73 7z"
}), /*#__PURE__*/createElement("path", {
  className: "bell_svg__cls-1",
  d: "M1.35 6.19a.37.37 0 00.33.41c.38 0 .46-.14.62-.58A5.74 5.74 0 016.94 3c.24 0 .28-.53.1-.81a5.76 5.76 0 00-3.62 1.29 5.5 5.5 0 00-2.07 2.71zM13.41 10.65a.3.3 0 01-.41.09c-.26-.16-.22-.32-.1-.67a4.56 4.56 0 00-1.34-4.22c-.14-.13.09-.46.34-.54a4.59 4.59 0 011.58 2.63 4.36 4.36 0 01-.07 2.71z"
}), /*#__PURE__*/createElement("path", {
  className: "bell_svg__cls-1",
  d: "M15 10.86a.36.36 0 01-.51.11c-.33-.19-.28-.38-.14-.83a5.72 5.72 0 00-1.79-5.28c-.17-.16.1-.58.42-.69a5.69 5.69 0 012 3.28 5.45 5.45 0 01.02 3.41z"
}), /*#__PURE__*/createElement("path", {
  className: "bell_svg__cls-1",
  transform: "rotate(23.09 10.556 2.867)",
  d: "M9.98-.01h1.14v5.75H9.98z"
}), /*#__PURE__*/createElement("path", {
  className: "bell_svg__cls-2",
  d: "M4.74 12.96l2.22-5.93M6.44 13.33l2.22-5.92M7.95 14.09l2.22-5.93"
})));

function SvgBell(props) {
  return /*#__PURE__*/createElement("svg", _extends$a({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 15.26 18.18"
  }, props), _ref$9, _ref2$4);
}

var _templateObject$b, _templateObject2$8, _templateObject3$8, _templateObject4$5, _templateObject5$4, _templateObject6$2, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11;
var Wrapper$7 = styled.div(_templateObject$b || (_templateObject$b = _taggedTemplateLiteralLoose(["\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  margin: 0 5px;\n\n  svg {\n    width: 24px;\n  }\n\n  button {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 5px 10px;\n    background-color: ", ";\n    border-radius: 5px;\n    border: none;\n    font-family: ", ";\n    font-size: ", ";\n    color: ", ";\n\n    ", "\n  }\n"])), color.button, font.family.primary, font.size.normal, color.textLight, effect.hover);
var Header$1 = styled.div(_templateObject2$8 || (_templateObject2$8 = _taggedTemplateLiteralLoose(["\n  display: flex;\n  height: 40px;\n\n  .body {\n    background-color: ", ";\n    width: 100%;\n    margin-right: 6px;\n  }\n\n  .strategy {\n    background-color: ", ";\n    padding: 10px;\n    display: flex;\n  }\n\n  .search {\n    cursor: pointer;\n    background-color: ", ";\n    padding: 10px;\n    border: 1px solid ", ";\n    border-radius: 0 5px 5px 0;\n\n    ", "\n\n    svg {\n      path {\n        fill: ", ";\n        width: 24px;\n      }\n    }\n  }\n  transition: 1s;\n  .searchInput {\n    display: ", ";\n    position: absolute;\n    z-index: 999;\n    top: 50px;\n    right: 0;\n  }\n"])), color.primary, color.tableCell, color.primary, color.primaryLight, effect.hover, color.primaryLight, function (props) {
  return !props.isSearchOpen && "none";
});
var Actions = styled.div(_templateObject3$8 || (_templateObject3$8 = _taggedTemplateLiteralLoose(["\n  margin: 5px 0;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-column-gap: 5px;\n\n  button {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 0;\n    cursor: pointer;\n    height: 40px;\n    background-color: ", ";\n\n    svg {\n      width: 15px;\n\n      .cls-1 {\n        fill: ", ";\n      }\n    }\n    h2 {\n      margin-right: 5px;\n    }\n\n    ", "\n\n    :disabled {\n      cursor: default;\n      opacity: 0.6;\n    }\n  }\n"])), color.tableCell, color.text, effect.hover);
var Options$1 = styled.div(_templateObject4$5 || (_templateObject4$5 = _taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 10px;\n  background-color: ", ";\n  height: 60px;\n\n  .button {\n    cursor: pointer;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n\n    ", "\n\n    svg {\n      width: 40px;\n      height: 20px;\n      margin-top: 10px;\n\n      .cls-1 {\n        fill: ", ";\n      }\n    }\n  }\n"])), color.primary, effect.hover, color.text);
var Table = styled.div(_templateObject5$4 || (_templateObject5$4 = _taggedTemplateLiteralLoose([""])));
var TableHeader$1 = styled.div(_templateObject6$2 || (_templateObject6$2 = _taggedTemplateLiteralLoose(["\n  background-color: ", ";\n  height: 30px;\n  display: grid;\n  grid-template-columns: 3fr 2fr 4fr repeat(3, 3fr);\n  align-items: center;\n  padding: 0 10px;\n\n  h3 {\n    font-weight: normal;\n    text-transform: uppercase;\n  }\n"])), color.tableCell);
var TableContent$2 = styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteralLoose(["\n  background-color: ", ";\n  padding: 5px 0;\n"])), color.primary);
var TableRow = styled.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteralLoose(["\n  display: grid;\n  grid-template-columns: 2.5fr 2fr 4fr repeat(3, 3fr);\n  padding: 0 10px;\n\n  p {\n    font-size: ", ";\n    padding: 0;\n    margin: 0;\n  }\n\n  .cod,\n  .qtde,\n  .vcto,\n  .strike {\n    display: grid;\n    justify-items: center;\n    padding: 5px;\n    margin: 2.5px 0;\n    border-radius: 5px;\n    background-color: rgba(255, 255, 255, 0.18);\n  }\n\n  .qtde,\n  .vcto,\n  .strike {\n    margin: 5px;\n\n    p {\n      color: ", ";\n    }\n  }\n\n  .cod {\n    margin: 5px 5px 0 0;\n    height: 16px;\n    p {\n      color: ", ";\n    }\n  }\n\n  .cv {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    .buy,\n    .sell {\n      display: grid;\n      justify-items: center;\n      width: 15px;\n      background-color: rgba(255, 255, 255, 0.18);\n      padding: 5px;\n      margin: 0 5px;\n      border-radius: 8px;\n\n      p {\n        opacity: 0.4;\n      }\n    }\n\n    .buy {\n      background-color: ", ";\n\n      p {\n        color: white;\n        font-weight: bold;\n        opacity: ", ";\n      }\n    }\n\n    .sell {\n      background-color: ", ";\n\n      p {\n        color: white;\n        font-weight: bold;\n        opacity: ", ";\n      }\n    }\n  }\n\n  .qtde,\n  .vcto,\n  .strike {\n    position: relative;\n\n    p {\n      margin-right: 15px;\n    }\n    .buttons {\n      position: absolute;\n      top: calc(8%);\n      right: 5px;\n\n      .up {\n        cursor: pointer;\n        margin-bottom: 4px;\n        width: 0;\n        height: 0;\n        border-style: solid;\n        border-width: 0 5px 9px 5px;\n        border-color: transparent transparent ", " transparent;\n\n        ", "\n      }\n\n      .down {\n        cursor: pointer;\n        width: 0;\n        height: 0;\n        border-style: solid;\n        border-width: 9px 5px 0 5px;\n        border-color: ", " transparent transparent transparent;\n\n        ", "\n      }\n    }\n  }\n\n  .family {\n    margin-left: 10px;\n    /* display: flex;\n      align-items: center;\n      justify-content: space-between; */\n    display: grid;\n    grid-template-columns: 1.5fr 1fr 1fr;\n    justify-items: center;\n    align-items: center;\n\n    p {\n      text-transform: uppercase;\n      margin-bottom: 0;\n    }\n\n    img {\n      width: 40px;\n    }\n\n    .close {\n      cursor: pointer;\n\n      ", ";\n    }\n  }\n"])), font.size.normal, color.strategyTable, color.text, function (props) {
  return props.cv.toLowerCase() === "buy" && "green";
}, function (props) {
  return props.cv.toLowerCase() === "buy" && "1";
}, function (props) {
  return props.cv.toLowerCase() === "sell" && "red";
}, function (props) {
  return props.cv.toLowerCase() === "sell" && "1";
}, color.text, effect.hover, color.text, effect.hover, effect.hover);
var Slider = styled.div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteralLoose(["\n  background-color: ", ";\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  .slide {\n    width: 60%;\n\n    .title,\n    .values {\n      display: flex;\n      justify-content: space-between;\n    }\n\n    .content {\n      position: relative;\n      background-color: ", ";\n      height: 10px;\n\n      .control {\n        position: absolute;\n        background-color: red;\n        height: 100%;\n        width: 5px;\n        left: 60%;\n      }\n    }\n  }\n"])), color.tableCell, color.sliderBar);
var Alert = styled.div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteralLoose(["\n  background-color: ", ";\n  padding: 5px;\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n\n  .row {\n    display: flex;\n    align-items: center;\n    padding-left: 50px;\n\n    p {\n      color: ", ";\n      width: 100px;\n    }\n  }\n\n  .amount {\n    position: relative;\n    display: grid;\n    justify-items: center;\n    padding: 5px;\n    margin: 2.5px 0;\n    border-radius: 5px;\n    background-color: rgba(255, 255, 255, 0.18);\n\n    p {\n      color: ", ";\n      margin-right: 25px;\n    }\n\n    .buttons {\n      position: absolute;\n      top: calc(10%);\n      right: 5px;\n\n      .up {\n        cursor: pointer;\n        margin-bottom: 4px;\n        width: 0;\n        height: 0;\n        border-style: solid;\n        border-width: 0 6px 10px 6px;\n        border-color: transparent transparent ", " transparent;\n\n        ", "\n      }\n\n      .down {\n        cursor: pointer;\n        width: 0;\n        height: 0;\n        border-style: solid;\n        border-width: 10px 6px 0 6px;\n        border-color: ", " transparent transparent transparent;\n\n        ", "\n      }\n    }\n  }\n\n  .value {\n    display: flex;\n    margin: 0 10px 15px auto;\n    p {\n      margin: 0 5px;\n    }\n  }\n\n  .button {\n    display: flex;\n\n    .alert {\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding: 5px;\n      background-color: ", ";\n      border-radius: 5px;\n\n      ", "\n\n      span {\n        background-color: white;\n        width: 1px;\n        height: calc(100% + 10px);\n      }\n      p {\n        margin-right: 5px;\n      }\n\n      svg {\n        width: 20px;\n        margin: 0 5px;\n      }\n    }\n  }\n\n  .row-2 {\n    display: flex;\n  }\n\n  img {\n    cursor: pointer;\n    width: 25px;\n    margin-left: 10px;\n\n    svg {\n      .cls-1 {\n        fill: red;\n      }\n    }\n\n    ", "\n  }\n"])), color.primary, color.text, color.strategyTable, color.text, effect.hover, color.text, effect.hover, color.button, effect.hover, effect.hover);
var Signature = styled.div(_templateObject11 || (_templateObject11 = _taggedTemplateLiteralLoose(["\n  background-color: ", ";\n  padding: 5px 20px 20px 50px;\n  display: flex;\n  justify-content: space-between;\n\n  section {\n    label {\n      color: ", ";\n    }\n\n    :nth-child(2) {\n      display: flex;\n      align-items: center;\n      margin-top: auto;\n    }\n  }\n\n  .input {\n    display: flex;\n    flex-direction: column;\n    margin-bottom: 10px;\n\n    input {\n      border: none;\n      background-color: ", ";\n      color: ", ";\n      height: 30px;\n      width: 150px;\n      border-radius: 5px;\n      padding: 0 5px;\n    }\n  }\n"])), color.tableCell, color.text, color.border, color.textLight);

var AllOptions = function AllOptions() {
  var dispatch = useDispatch();
  var removeTableOption = Creators.removeTableOption,
      setFieldValues = Creators.setFieldValues;

  var _useSelector = useSelector(function (state) {
    return state.options;
  }),
      isLoadingRequest = _useSelector.isLoadingRequest,
      allOptions = _useSelector.allOptions,
      allStrikes = _useSelector.allStrikes,
      option = _useSelector.option;

  var _useUndo = useUndo(allOptions),
      present = _useUndo[0].present,
      _useUndo$ = _useUndo[1],
      set = _useUndo$.set,
      undo = _useUndo$.undo,
      redo = _useUndo$.redo,
      reset = _useUndo$.reset,
      canUndo = _useUndo$.canUndo,
      canRedo = _useUndo$.canRedo;

  useEffect(function () {
    set(allOptions);
  }, [allOptions]);
  useEffect(function () {
    reset([]);
  }, [option]);
  useEffect(function () {
    dispatch(setFieldValues({
      field: "allOptions",
      values: present
    }));
  }, [present]);
  return /*#__PURE__*/React__default.createElement(Wrapper$7, null, /*#__PURE__*/React__default.createElement(Header$1, null, /*#__PURE__*/React__default.createElement("div", {
    className: "body"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "strategy"
  }, /*#__PURE__*/React__default.createElement("h2", null, "Estrat\xE9gia")), /*#__PURE__*/React__default.createElement("div", {
    className: "search"
  }, /*#__PURE__*/React__default.createElement(SvgSearchIcon, null))), /*#__PURE__*/React__default.createElement(Actions, null, /*#__PURE__*/React__default.createElement("button", {
    className: "button",
    onClick: undo,
    disabled: !canUndo
  }, /*#__PURE__*/React__default.createElement("h2", null, "Desfazer"), " ", /*#__PURE__*/React__default.createElement(SvgUndo, null)), /*#__PURE__*/React__default.createElement("button", {
    className: "button",
    onClick: redo,
    disabled: !canRedo
  }, /*#__PURE__*/React__default.createElement("h2", null, "Refazer"), " ", /*#__PURE__*/React__default.createElement(SvgRedo, null)), /*#__PURE__*/React__default.createElement("button", {
    className: "button",
    onClick: function onClick() {
      return dispatch(setFieldValues({
        field: "allOptions",
        values: []
      }));
    },
    disabled: present.length < 1
  }, /*#__PURE__*/React__default.createElement("h2", null, "Limpar"), " ", /*#__PURE__*/React__default.createElement(SvgClose, {
    width: "20"
  }))), /*#__PURE__*/React__default.createElement(Loadable, {
    isLoading: isLoadingRequest,
    center: true
  }, /*#__PURE__*/React__default.createElement("div", null)), allStrikes.length > 0 && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement(Options$1, null, /*#__PURE__*/React__default.createElement("div", {
    className: "button"
  }, /*#__PURE__*/React__default.createElement("h2", null, "Strikes"), /*#__PURE__*/React__default.createElement(SvgMoreOrLess, null)), /*#__PURE__*/React__default.createElement("div", {
    className: "button"
  }, /*#__PURE__*/React__default.createElement("h2", null, "Largura"), /*#__PURE__*/React__default.createElement(SvgMoreOrLess, null)), /*#__PURE__*/React__default.createElement("div", {
    className: "button"
  }, /*#__PURE__*/React__default.createElement("h2", null, " QTDE"), /*#__PURE__*/React__default.createElement(SvgMoreOrLess, null)), /*#__PURE__*/React__default.createElement("div", {
    className: "button"
  }, /*#__PURE__*/React__default.createElement("h2", null, "Vencimentos"), /*#__PURE__*/React__default.createElement(SvgMoreOrLess, null)), /*#__PURE__*/React__default.createElement("div", {
    className: "button"
  }, /*#__PURE__*/React__default.createElement("h2", null, "Inverter C/V"), /*#__PURE__*/React__default.createElement(SvgHorizontalArrows, null))), /*#__PURE__*/React__default.createElement(Table, null, /*#__PURE__*/React__default.createElement(TableHeader$1, null, /*#__PURE__*/React__default.createElement("h2", null, "C\xF3d"), /*#__PURE__*/React__default.createElement("h2", null, "C/V"), /*#__PURE__*/React__default.createElement("h2", null, "QTDE"), /*#__PURE__*/React__default.createElement("h2", null, "VCTO"), /*#__PURE__*/React__default.createElement("h2", null, "Strike"), /*#__PURE__*/React__default.createElement("div", null)), /*#__PURE__*/React__default.createElement(TableContent$2, null, present.map(function (option) {
    return /*#__PURE__*/React__default.createElement(TableRow, {
      key: option.id,
      cv: option.cv,
      flag: option.model
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "cod"
    }, /*#__PURE__*/React__default.createElement("p", null, option.symbol)), /*#__PURE__*/React__default.createElement("div", {
      className: "cv"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "buy"
    }, /*#__PURE__*/React__default.createElement("p", null, "C")), /*#__PURE__*/React__default.createElement("div", {
      className: "sell"
    }, /*#__PURE__*/React__default.createElement("p", null, "V"))), /*#__PURE__*/React__default.createElement("div", {
      className: "qtde"
    }, /*#__PURE__*/React__default.createElement("p", null, option.quantity), /*#__PURE__*/React__default.createElement("div", {
      className: "buttons"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "up"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "down"
    }))), /*#__PURE__*/React__default.createElement("div", {
      className: "vcto"
    }, /*#__PURE__*/React__default.createElement("p", null, option.expiration), /*#__PURE__*/React__default.createElement("div", {
      className: "buttons"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "up"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "down"
    }))), /*#__PURE__*/React__default.createElement("div", {
      className: "strike"
    }, /*#__PURE__*/React__default.createElement("p", null, option.strike), /*#__PURE__*/React__default.createElement("div", {
      className: "buttons"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "up"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "down"
    }))), /*#__PURE__*/React__default.createElement("div", {
      className: "type"
    }, /*#__PURE__*/React__default.createElement("p", null, option.type), /*#__PURE__*/React__default.createElement("img", {
      alt: ""
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "close",
      onClick: function onClick() {
        dispatch(removeTableOption({
          id: option.id
        }));
      }
    }, /*#__PURE__*/React__default.createElement("p", null, "x"))));
  }))), /*#__PURE__*/React__default.createElement(Slider, null, /*#__PURE__*/React__default.createElement("div", {
    className: "slide"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "title"
  }, /*#__PURE__*/React__default.createElement("p", null, "M\xEDn"), /*#__PURE__*/React__default.createElement("p", null, "M\xE9dio"), /*#__PURE__*/React__default.createElement("p", null, "M\xE1x")), /*#__PURE__*/React__default.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "control"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "values"
  }, /*#__PURE__*/React__default.createElement("p", null, "4.02"), /*#__PURE__*/React__default.createElement("p", null, "4.295"), /*#__PURE__*/React__default.createElement("p", null, "4.50")))), /*#__PURE__*/React__default.createElement(Alert, null, /*#__PURE__*/React__default.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React__default.createElement("p", null, "Pre\xE7o:"), /*#__PURE__*/React__default.createElement("div", {
    className: "amount"
  }, /*#__PURE__*/React__default.createElement("p", null, "100.000.000.000"), /*#__PURE__*/React__default.createElement("div", {
    className: "buttons"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "up"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "down"
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React__default.createElement("p", null, "Validade: "), /*#__PURE__*/React__default.createElement("div", {
    className: "amount"
  }, /*#__PURE__*/React__default.createElement("p", null, "100.000.000.000"), /*#__PURE__*/React__default.createElement("div", {
    className: "buttons"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "up"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "down"
  }))))), /*#__PURE__*/React__default.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "value"
  }, /*#__PURE__*/React__default.createElement("p", null, "TOTAL:"), " ", /*#__PURE__*/React__default.createElement("p", null, "R$187.789,00")), /*#__PURE__*/React__default.createElement("div", {
    className: "row-2"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "button"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "alert"
  }, /*#__PURE__*/React__default.createElement("p", null, " Cadastar alerta!"), /*#__PURE__*/React__default.createElement("span", null), /*#__PURE__*/React__default.createElement(SvgBell, null))), /*#__PURE__*/React__default.createElement(SvgSettings, null)))), /*#__PURE__*/React__default.createElement(Signature, null, /*#__PURE__*/React__default.createElement("section", null, /*#__PURE__*/React__default.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React__default.createElement("label", {
    htmlFor: "signature"
  }, "Assinatura eletr\xF4nica"), /*#__PURE__*/React__default.createElement("input", {
    type: "text"
  })), /*#__PURE__*/React__default.createElement("button", null, "Comprar")), /*#__PURE__*/React__default.createElement("section", null, /*#__PURE__*/React__default.createElement("input", {
    type: "CHECKBOX"
  }), /*#__PURE__*/React__default.createElement("label", {
    htmlFor: "save"
  }, " Salvar assinatura")))));
};

var OptionsContainer = function OptionsContainer() {
  var dispatch = useDispatch();
  var loadOptions = Creators.loadOptions,
      setItemUp = Creators.setItemUp,
      setItemDown = Creators.setItemDown;

  var _useSelector = useSelector(function (state) {
    return state.options;
  }),
      option = _useSelector.option,
      pagination = _useSelector.pagination,
      allStrikes = _useSelector.allStrikes;

  var itemsAbove = pagination.itemsAbove,
      itemsBelow = pagination.itemsBelow;

  function handleScroll(e) {
    e.preventDefault();

    if (e.deltaY > 0) {
      itemsBelow > 0 && dispatch(setItemDown());
    } else {
      itemsAbove > 0 && dispatch(setItemUp());
    }
  }

  useEffect(function () {
    if (option) {
      dispatch(loadOptions({
        option: option
      }));
    }
  }, [option]);
  return /*#__PURE__*/React__default.createElement(Wrapper$2, null, /*#__PURE__*/React__default.createElement(Options, null, /*#__PURE__*/React__default.createElement(Header, null), /*#__PURE__*/React__default.createElement(MoveUp, {
    onClick: function onClick() {
      return itemsAbove > 0 && dispatch(setItemUp());
    },
    disabled: itemsAbove < 1,
    display: allStrikes.length > 0 ? 1 : 0
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "totalItems"
  }, "Total de Itens: ", allStrikes === null || allStrikes === void 0 ? void 0 : allStrikes.length), /*#__PURE__*/React__default.createElement("span", {
    className: "countItems"
  }, "Itens acima: ", itemsAbove)), /*#__PURE__*/React__default.createElement(Main, {
    onWheel: allStrikes.length > 0 ? handleScroll : null
  }, /*#__PURE__*/React__default.createElement(Call, null), /*#__PURE__*/React__default.createElement(Strike, null), /*#__PURE__*/React__default.createElement(Put, null)), /*#__PURE__*/React__default.createElement(MoveDown, {
    onClick: function onClick() {
      return itemsBelow > 0 && dispatch(setItemDown());
    },
    disabled: itemsBelow < 1,
    display: allStrikes.length > 0 ? 1 : 0
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "totalItems"
  }, "Total de Itens: ", allStrikes === null || allStrikes === void 0 ? void 0 : allStrikes.length), /*#__PURE__*/React__default.createElement("span", {
    className: "countItems"
  }, "Itens abaixo: ", itemsBelow))), /*#__PURE__*/React__default.createElement(AllOptions, null));
};

var TableOptions = function TableOptions(_ref) {
  var navbarActions = _ref.navbarActions;
  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(ComponentWrapper, null, /*#__PURE__*/React__default.createElement(Navbar, {
    handleSettings: navbarActions === null || navbarActions === void 0 ? void 0 : navbarActions.handleSettings,
    handleExit: navbarActions === null || navbarActions === void 0 ? void 0 : navbarActions.handleExit
  }), /*#__PURE__*/React__default.createElement(OptionsContainer, null)));
};
TableOptions.propTypes = {
  navbarActions: PropTypes.shape({
    handleSettings: PropTypes.func,
    handleExit: PropTypes.func
  })
};

export default TableOptions;
//# sourceMappingURL=index.modern.js.map
