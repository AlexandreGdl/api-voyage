import { Model } from 'mongoose';
import { Voyages } from "./schema/voyages.schema";
import { CreateVoyageDto } from "./dto/create-voyage.dto";
import { ObjectId } from "mongodb";
import { AddMemberDto } from "./dto/add-member.dto";
import { ToggleWidgetDto } from "./dto/toggle-widget.dto";
import { Widgets } from "../widgets/schema/widgets.schema";
import { Users } from 'src/users/users.schema';
export declare class VoyagesService {
    private voyagesModel;
    private widgetsModel;
    private usersModel;
    constructor(voyagesModel: Model<Voyages>, widgetsModel: Model<Widgets>, usersModel: Model<Users>);
    createVoyage(newVoyages: CreateVoyageDto, userId: ObjectId): Promise<Voyages>;
    findVoyage(id: string): Promise<Voyages | null>;
    addMember(addMember: AddMemberDto): Promise<Voyages>;
    toggleWidget(body: ToggleWidgetDto): Promise<Voyages>;
    getUsersVoyage(userId: ObjectId): Promise<Voyages[]>;
}
