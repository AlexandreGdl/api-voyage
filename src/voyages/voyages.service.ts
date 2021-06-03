import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, Schema} from 'mongoose';
import {Voyages} from "./schema/voyages.schema";
import {CreateVoyageDto} from "./dto/create-voyage.dto";
import {ObjectId} from "mongodb";
import {AddMemberDto} from "./dto/add-member.dto";

@Injectable()
export class VoyagesService {
    constructor(
        @InjectModel('voyages') private voyagesModel: Model<Voyages>,
    ) {}

    async createVoyage(newVoyages: CreateVoyageDto, userId: ObjectId): Promise<Voyages> {
        const createdVoyage = await this.voyagesModel.create({
            ...newVoyages,
            ownerId: userId,
        });

        return createdVoyage;
    }

    async findVoyage(id: string): Promise<Voyages | null> {
        return this.voyagesModel.findById(id);
    }

    async addMember(addMember: AddMemberDto): Promise<Voyages> {
        const updatedVoyage = await this.voyagesModel.findOneAndUpdate(
            { _id: addMember.voyageId },
            { $push: { memberIds: new ObjectId(addMember.userId) } }
        );
        return updatedVoyage;
    }

}