import { Model } from 'mongoose';
import { Types } from "./types.schema";
export declare class TypesService {
    private typesModel;
    constructor(typesModel: Model<Types>);
    findType(name: string): Promise<Types | undefined>;
    getAllTypes(): Promise<Types[]>;
    createType(newType: string): Promise<Types>;
}
