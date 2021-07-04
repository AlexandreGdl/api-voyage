import { Db } from 'mongodb';
import { BaseFactory, FactoryCreateOneOptions } from './base.factory';
import { Places } from "../../places/schema/places.schema";
export declare class PlaceFactory extends BaseFactory<Places> {
    private static instance;
    private constructor();
    static getInstance(db: Db): PlaceFactory;
    protected generateOne(options: FactoryCreateOneOptions<Places>): Promise<Places>;
}
