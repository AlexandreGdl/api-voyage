import { Db } from 'mongodb';
import { BaseFactory, FactoryCreateOneOptions } from './base.factory';
import { Widgets } from "../../widgets/schema/widgets.schema";
export declare class WidgetFactory extends BaseFactory<Widgets> {
    private static instance;
    private constructor();
    static getInstance(db: Db): WidgetFactory;
    protected generateOne(options: FactoryCreateOneOptions<Widgets>): Promise<Widgets>;
}
