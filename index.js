'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * The top-level merge function
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * @param {object} remerge map
                                                                                                                                                                                                                                                                   * @return {function} reducer function
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   */

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _shallowCopy = require('shallow-copy');

var _shallowCopy2 = _interopRequireDefault(_shallowCopy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var merge = function merge(map) {

  var _getAccessorKey = function _getAccessorKey(key) {
    // this regex tests if the key is of the form abc[123], with opening and closing square brackets
    var containsAccessor = /\w+\[\w+\]$/.test(key);
    if (containsAccessor) {
      // this regex captures the content inside the square brackets
      var captureAccessor = /.+\[(\w+)\]/.exec(key);
      if (captureAccessor) {
        return captureAccessor[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  var _removeAccessorKey = function _removeAccessorKey(key) {
    if (_getAccessorKey(key)) {
      return key.replace(_getAccessorKey(key), "");
    }
    return key;
  };

  var _preprocess = function _preprocess(map) {
    var newMap = {};

    for (var key in map) {
      var isFunction = _lodash2.default.isFunction(map[key]);
      newMap[_removeAccessorKey(key)] = {
        key: /([^\[]+)/.exec(key)[1],
        isLeaf: isFunction,
        accessorKeyName: _getAccessorKey(key),
        child: isFunction ? map[key] : _preprocess(map[key])
      };
    }

    return newMap;
  };

  var _initial = function _initial(map) {
    if (!map) {
      return undefined;
    } else if (_lodash2.default.isFunction(map)) {
      return undefined;
    } else if (map['_'] !== undefined) {
      return map['_'];
    }

    var newMap = {};
    for (var key in map) {
      if (!_getAccessorKey(key)) {
        var result = _initial(map[key]);
        if (result !== undefined) {
          newMap[key] = result;
        }
      }
    }
    return Object.keys(newMap).length > 0 ? newMap : null;
  };

  var _process = function _process(_map, state, action) {
    var currentPath = action.type.split('.', 1)[0];

    var newState = (0, _shallowCopy2.default)(state);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(_map)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var path = _step.value;

        if (path === currentPath) {
          var _map$path = _map[path];
          var key = _map$path.key;
          var accessorKeyName = _map$path.accessorKeyName;
          var isLeaf = _map$path.isLeaf;
          var child = _map$path.child;


          if (isLeaf) {

            return child(newState, action);
          } else {

            var smallerMap = child;
            var smallerState = accessorKeyName ? newState[key][action[accessorKeyName]] : newState[key];
            var smallerAction = _extends({}, action, {
              type: action.type.split('.').splice(1).join(".")
            });
            var newSmallerState = _process(smallerMap, smallerState, smallerAction);

            if (accessorKeyName) {
              var collection = (0, _shallowCopy2.default)(newState[key]);
              collection[action[accessorKeyName]] = newSmallerState;
              newState[key] = collection;
            } else {
              newState[key] = newSmallerState;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return newState;
  };

  var initialState = _initial(map);
  var computedMap = _preprocess(map);

  return function (state, action) {
    if (state === undefined) {
      return initialState;
    }

    return _process(computedMap, state, action);
  };
};

exports.default = merge;
