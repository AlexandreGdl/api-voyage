import { Db } from 'mongodb';
import { BaseFactory, FactoryCreateOneOptions } from './base.factory';
import { Types } from "../../types/types.schema";
export declare class TypeFactory extends BaseFactory<Types> {
    private static instance;
    private constructor();
    static getInstance(db: Db): TypeFactory;
    protected generateOne(options: FactoryCreateOneOptions<Types>): Promise<Types>;
}
