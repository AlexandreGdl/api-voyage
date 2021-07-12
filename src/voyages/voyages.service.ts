import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, Schema} from 'mongoose';
import {Voyages} from "./schema/voyages.schema";
import {CreateVoyageDto} from "./dto/create-voyage.dto";
import {ObjectId} from "mongodb";
import {AddMemberDto} from "./dto/add-member.dto";
import {ToggleWidgetDto} from "./dto/toggle-widget.dto";
import {Widgets} from "../widgets/schema/widgets.schema";
import { Users } from 'src/users/users.schema';
import {lookUpDonors, lookUpRecipients} from "../_helper/mongo.utils";

@Injectable()
export class VoyagesService {
    constructor(
      @InjectModel('voyages') private voyagesModel: Model<Voyages>,
      @InjectModel('widgets') private widgetsModel: Model<Widgets>,
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

    async toggleWidget(body: ToggleWidgetDto): Promise<Voyages> {
        const voyage = await this.voyagesModel.findOne(
          { _id: new ObjectId(body.voyageId) }
        );
        const widget = await this.widgetsModel.findById(body.widgetId);
        if (!voyage) throw new NotFoundException('Voyage not found');
        if (!widget) throw new NotFoundException('Widget not found');
        if (voyage.selectedWidgets.indexOf(widget._id) === -1) {
            return this.voyagesModel.findOneAndUpdate(
              { _id: new ObjectId(body.voyageId) },
              { $push: { selectedWidgets: new ObjectId(widget._id) } }
            );
        } else {
            return this.voyagesModel.findOneAndUpdate(
              { _id: new ObjectId(body.voyageId) },
              { $pull: { selectedWidgets: new ObjectId(widget._id) } }
            );
        }
    }

    async getUsersVoyage(userId: ObjectId): Promise<Voyages[]> {
        const toto = await this.voyagesModel.aggregate([
          { $match: { $or: [{ ownerId: userId }, { memberIds: userId }] } },
          { $sort: { createdDate: -1 } },
          { $lookup: {
            from: 'users',
            let: { memberId: '$memberIds' },
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
          { $lookup: {
              from: 'widgets',
              localField: 'selectedWidgets',
              foreignField: '_id',
              as: 'activeWidgets'
            } },
          { $project: {'owner.password' : 0 }},
          { $lookup: {
            from: 'slates',
            localField: '_id',
            foreignField: 'voyageId',
            as: 'slates'
          }},
          // slates lookup DONORS
          ...lookUpDonors,
          // slates lookup DONORS
          ...lookUpRecipients
        ]);
        return toto;
    }
}