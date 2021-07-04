"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeObjects = void 0;
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
//# sourceMappingURL=utils.js.map