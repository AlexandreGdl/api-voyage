import { ConfigService } from '../config/config.service';
import { TypesService } from "./types.service";
import { Types } from "./types.schema";
import { Users } from "../users/users.schema";
import { CreateTypesDto } from "./dto/create-types.dto";
export declare class TypesController {
    protected readonly typesService: TypesService;
    protected readonly env: ConfigService;
    constructor(typesService: TypesService, env: ConfigService);
    getTypes(): Promise<Types[]>;
    createType(user: Users, body: CreateTypesDto): Promise<Types>;
}
