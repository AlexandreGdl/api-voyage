import { Model } from 'mongoose';
import { Slates } from "./schema/slates.schema";
import { CreateSlateDto } from "./dto/create-slate.dto";
import { Users } from "../users/users.schema";
import { Voyages } from "../voyages/schema/voyages.schema";
export declare class SlatesService {
    private slatesModel;
    private voyagesModel;
    private usersModel;
    constructor(slatesModel: Model<Slates>, voyagesModel: Model<Voyages>, usersModel: Model<Users>);
    getAllSlates(): Promise<Slates[]>;
    createSlates(slates: CreateSlateDto): Promise<Slates | Slates[]>;
}
