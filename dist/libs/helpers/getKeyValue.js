"use strict";
exports.__esModule = true;
exports.getKeyValue = void 0;
var getKeyValue = function (data) {
    return Object.entries(data)
        .reduce(function (store, none) { return ({ key: none[0], value: none[1] }); }, {});
};
exports.getKeyValue = getKeyValue;
