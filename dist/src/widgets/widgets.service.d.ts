import { Model } from 'mongoose';
import { Widgets } from './schema/widgets.schema';
export declare class WidgetService {
    private widgetsModel;
    constructor(widgetsModel: Model<Widgets>);
    getWidgets(): Promise<Widgets[]>;
}
