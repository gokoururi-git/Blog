"use strict";
exports.__esModule = true;
exports.combineReducers = exports.createStore = void 0;
var createStore = function (reducer, initialState) {
    // 执行createStore时initialState不传的话，给state传的值就是undefined，所以这里不用对initialState进行检查
    var state = reducer(initialState, {
        type: "__unique__type__"
    });
    var listeners = [];
    return {
        dispatch: function (action) {
            state = reducer(state, action);
            listeners.forEach(function (item) {
                item();
            });
        },
        getState: (function () {
            return state;
        }),
        subscribe: function (listener) {
            listeners.push(listener);
        }
    };
};
exports.createStore = createStore;
var combineReducers = function (reducers) {
    return function (state, action) {
        return Object.keys(reducers).reduce(function (previousState, currentKey) {
            previousState[currentKey] = reducers[currentKey](previousState, action);
            return previousState;
        }, state);
    };
};
exports.combineReducers = combineReducers;
