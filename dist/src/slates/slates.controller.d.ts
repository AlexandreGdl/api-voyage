import { ConfigService } from '../config/config.service';
import { Slates } from './schema/slates.schema';
import { CreateSlateDto } from './dto/create-slate.dto';
import { Users } from '../users/users.schema';
import { SlatesService } from "./slates.service";
export declare class SlatesController {
    protected readonly env: ConfigService;
    private readonly slatesService;
    private readonly bcryptSalt;
    constructor(env: ConfigService, slatesService: SlatesService);
    createSlates(user: Users, newSlates: CreateSlateDto): Promise<Slates | Slates[]>;
}
