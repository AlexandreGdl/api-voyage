import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, Schema} from 'mongoose';
import {Voyages} from "./schema/voyages.schema";
import {CreateVoyageDto} from "./dto/create-voyage.dto";
import {ObjectId} from "mongodb";
import {AddMemberDto} from "./dto/add-member.dto";
import { Users } from 'src/users/users.schema';

@Injectable()
export class VoyagesService {
    constructor(
        @InjectModel('voyages') private voyagesModel: Model<Voyages>,
        @InjectModel('users') private usersModel: Model<Users>,
    ) {}

    async createVoyage(newVoyages: CreateVoyageDto, userId: ObjectId): Promise<Voyages> {
        const createdVoyage = await this.voyagesModel.create({
            ...newVoyages,
            ownerId: userId,
            createdDate: new Date()
        });

        return createdVoyage;
    }

    async findVoyage(id: string): Promise<Voyages | null> {
        return this.voyagesModel.findById(id);
    }

    async addMember(addMember: AddMemberDto): Promise<Voyages> {

        const member = await this.usersModel.findOne({ username: addMember.username });
        console.log('tototo')
        console.log({ username: addMember.username })
        if (!member) throw new NotFoundException('Member not found');
        console.log('tototo 2')
    
        const updatedVoyage = await this.voyagesModel.findOneAndUpdate(
            { _id: addMember.voyageId },
            { $push: { memberIds: new ObjectId(member._id) } }
        );
        console.log('tototo')
        return updatedVoyage;
    }

    async getUsersVoyage(userId: ObjectId): Promise<Voyages[]> {
        return this.voyagesModel.aggregate([
          { $match: { $or: [{ ownerId: userId }, { memberIds: { $elemMatch: { userId } } }] } },
          { $sort: { createdDate: -1 } },
          { $lookup: {
            from: 'users',
            let: { memberId: '$memberIds' },
            pipeline: [
                { $match: { $expr: { $in: ['$_id', '$$memberId'] } } },
                { $project: {password: 0 } }
            ],
            as: 'members'
          } },
          { $lookup: {
            from: 'users',
            localField: 'ownerId',
            foreignField: '_id',
            as: 'owner'
          } },
          { $unwind: { preserveNullAndEmptyArrays: true, path: '$owner' }},
          { $project: {'owner.password' : 0 }}
        ]);
      }

}