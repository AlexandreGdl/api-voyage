/**
 * Merge an object containing default values
 * with an object with the same type
 * @param {T} defaults default values for the options
 * @param {T} options the custom values to merge with the defaults
 * @returns {T} the merged options
 */
export function mergeObjects<T>(defaults: T = {} as T, options: T = {} as T): T {
  const keys = Object.keys(defaults);
  let i = keys.length;
  let k: string;

  const mergedOptions: T = options ? { ...options } : {} as T;

  while (i--) {
    k = keys[i];

    // property is an object
    if (!(k in mergedOptions)) {
      mergedOptions[k] = defaults[k];
    }

    // property is an array
    if (options[k] && defaults[k] instanceof Array) {
      if (!options[k].length || !defaults[k].length) {
        mergedOptions[k] = options[k]; continue;
      }

      const arrayMaxLength = [options[k].length, defaults[k].length].sort()[1];

      for (let j = 0; j < arrayMaxLength; j++) {
        mergedOptions[k][j] = mergeObjects(defaults[k][j], options[k][j]);
      }
    }
  }

  return mergedOptions;
}

