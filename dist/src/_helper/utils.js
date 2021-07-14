"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomIntInclusive = exports.transformStringsToObjectId = exports.randomEnum = exports.enumToArray = exports.stringifyParse = exports.checkPassword = exports.mergeObjects = void 0;
const mongodb_1 = require("mongodb");
function mergeObjects(defaults = {}, options = {}) {
    const keys = Object.keys(defaults);
    let i = keys.length;
    let k;
    const mergedOptions = options ? { ...options } : {};
    while (i--) {
        k = keys[i];
        if (!(k in mergedOptions)) {
            mergedOptions[k] = defaults[k];
        }
        if (options[k] && defaults[k] instanceof Array) {
            if (!options[k].length || !defaults[k].length) {
                mergedOptions[k] = options[k];
                continue;
            }
            const arrayMaxLength = [options[k].length, defaults[k].length].sort()[1];
            for (let j = 0; j < arrayMaxLength; j++) {
                mergedOptions[k][j] = mergeObjects(defaults[k][j], options[k][j]);
            }
        }
    }
    return mergedOptions;
}
exports.mergeObjects = mergeObjects;
function checkPassword(psw, strength) {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&\\-*?;,€_+()"\':~|=])(?=.{8,})');
    const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
    const lightRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{4,})');
    if (strength === 'strong')
        return strongRegex.test(psw);
    if (strength === 'medium')
        return mediumRegex.test(psw);
    return lightRegex.test(psw);
}
exports.checkPassword = checkPassword;
function stringifyParse(object) {
    return JSON.parse(JSON.stringify(object));
}
exports.stringifyParse = stringifyParse;
function enumToArray(e) {
    return Object.values(e);
}
exports.enumToArray = enumToArray;
function randomEnum(e) {
    const enumValues = Object.values(e);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
}
exports.randomEnum = randomEnum;
function transformStringsToObjectId(element) {
    const newElement = element;
    Object.keys(element).forEach(key => {
        const value = element[key];
        if (typeof value === 'object')
            transformStringsToObjectId(value);
        if (typeof value === 'string' && value.match(/^[0-9a-fA-F]{24}$/)) {
            newElement[key] = new mongodb_1.ObjectId(value);
        }
    });
    return newElement || element;
}
exports.transformStringsToObjectId = transformStringsToObjectId;
function getRandomIntInclusive(min, max) {
    const newMin = Math.ceil(min);
    const newMax = Math.floor(max);
    return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
}
exports.getRandomIntInclusive = getRandomIntInclusive;
//# sourceMappingURL=utils.js.map