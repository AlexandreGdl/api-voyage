import { ConfigService } from '../config/config.service';
import { Widgets } from "./schema/widgets.schema";
import { WidgetService } from "./widgets.service";
export declare class WidgetsController {
    protected readonly env: ConfigService;
    private readonly widgetService;
    private readonly bcryptSalt;
    constructor(env: ConfigService, widgetService: WidgetService);
    getWidgets(): Promise<Widgets[]>;
}
