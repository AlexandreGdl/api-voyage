/**
 * Group all _helper function that can be not grouped with some other functions
 */
import { ObjectId } from 'mongodb';

type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };


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

/**
 * check if a string is strong or medium
 * strong = 8 characters, include uppercase, lowercase, special character, number
 * medium = 6 characters, include uppercase, lowercase, number
 * light = 4 characters, number && letters
 * @param {string} psw the string you want to test
 * @param {'strong' | 'medium'} strength the strength you want
 * @returns {boolean} if the string match the strength return true else false
 */
export function checkPassword (psw: string, strength: 'strong' | 'medium' | 'light'): boolean {
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&\\-*?;,€_+()"\':~|=])(?=.{8,})');
  const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
  const lightRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{4,})');
  if (strength === 'strong') return strongRegex.test(psw);
  if (strength === 'medium') return mediumRegex.test(psw);
  return lightRegex.test(psw);
}

/**
 * Convert an object to string, then convert it to object again,
 * to transform the Dates and ObjectIds to string.
 * Useful to match an object to an API response body
 * @param {unknown} object object to transform
 * @returns {unknown} the transformed object
 */
export function stringifyParse(object: unknown): unknown {
  return JSON.parse(JSON.stringify(object));
}

/**
 * Build a string array from an Enum Type.
 * @param {E} e an Enum type
 * @returns {string[]} the enum values
 */
export function enumToArray<E extends Enum<E>>(e: Enum<E>): E[keyof E][] {
  return (Object.values(e) as unknown) as E[keyof E][];
}

/**
 * Return a random value from an Enum
 * @param {E} e an Enum type
 * @returns {E} an element of the given Enum type
 */
export function randomEnum<E>(e: E): E[keyof E] {
  const enumValues = (Object.values(e) as unknown) as E[keyof E][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

/**
 * get a error object
 * @param {T} element the element
 * @returns {U | T} the new element
 */
export function transformStringsToObjectId<T, U>(element: T): U | T {
  const newElement = element;

  Object.keys(element).forEach(key => {
    const value = element[key];

    if (typeof value === 'object') transformStringsToObjectId(value);

    if (typeof value === 'string' && value.match(/^[0-9a-fA-F]{24}$/)) {
      newElement[key] = new ObjectId(value);
    }
  });

  return newElement || element;
}

/**
 * Shortcut to get a random number in range
 * @param {number} min minimum value included
 * @param {number} max maximum value included
 * @returns {number} a random number between the params.
 */
export function getRandomIntInclusive(min: number, max: number): number {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
}

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};