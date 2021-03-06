import { ConfigService } from '../config/config.service';
import { Voyages } from "./schema/voyages.schema";
import { VoyagesService } from "./voyages.service";
import { Users } from "../users/users.schema";
import { CreateVoyageDto } from "./dto/create-voyage.dto";
import { AddMemberDto } from "./dto/add-member.dto";
export declare class VoyagesController {
    private readonly voyagesService;
    protected readonly env: ConfigService;
    private readonly bcryptSalt;
    constructor(voyagesService: VoyagesService, env: ConfigService);
    getVoyages(): Promise<boolean>;
    createVoyage(user: Users, newVoyages: CreateVoyageDto): Promise<Voyages>;
    addMember(user: Users, addMember: AddMemberDto): Promise<Voyages>;
}
