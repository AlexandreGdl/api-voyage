import { Model } from 'mongoose';
import { Voyages } from "./schema/voyages.schema";
import { CreateVoyageDto } from "./dto/create-voyage.dto";
import { ObjectId } from "mongodb";
import { AddMemberDto } from "./dto/add-member.dto";
export declare class VoyagesService {
    private voyagesModel;
    constructor(voyagesModel: Model<Voyages>);
    createVoyage(newVoyages: CreateVoyageDto, userId: ObjectId): Promise<Voyages>;
    findVoyage(id: string): Promise<Voyages | null>;
    addMember(addMember: AddMemberDto): Promise<Voyages>;
}
