import { Db } from 'mongodb';
export interface FactoryCreateOptions {
    isCreatingDocument?: boolean;
    arraysLength?: Record<string, number>;
}
export interface FactoryCreateOneOptions<T> extends FactoryCreateOptions {
    customValues?: T;
}
export interface FactoryCreateManyOptions<T> extends FactoryCreateOptions {
    customValues?: Array<T> | T;
}
export interface FactoryParams {
    collection: string | 'none';
}
export declare abstract class BaseFactory<T> {
    protected db: Db;
    protected params: FactoryParams;
    protected defaultOptions: FactoryCreateOptions;
    protected constructor(db: Db, params: FactoryParams);
    createOne(options?: FactoryCreateOneOptions<T>): Promise<T>;
    createMany(amount: number, options?: FactoryCreateManyOptions<T>): Promise<T[]>;
    protected abstract generateOne(options: FactoryCreateOneOptions<T>): Promise<T>;
}
