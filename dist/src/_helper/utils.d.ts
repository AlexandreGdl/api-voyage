declare type Enum<E> = Record<keyof E, number | string> & {
    [k: number]: string;
};
export declare function mergeObjects<T>(defaults?: T, options?: T): T;
export declare function checkPassword(psw: string, strength: 'strong' | 'medium' | 'light'): boolean;
export declare function stringifyParse(object: unknown): unknown;
export declare function enumToArray<E extends Enum<E>>(e: Enum<E>): E[keyof E][];
export declare function randomEnum<E>(e: E): E[keyof E];
export declare function transformStringsToObjectId<T, U>(element: T): U | T;
export declare function getRandomIntInclusive(min: number, max: number): number;
export {};
