import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {ObjectId} from "mongodb";
import {Slates} from "./schema/slates.schema";
import {CreateSlateDto} from "./dto/create-slate.dto";
import {Users} from "../users/users.schema";
import {Voyages} from "../voyages/schema/voyages.schema";

@Injectable()
export class SlatesService {
  constructor(
    @InjectModel('slates') private slatesModel: Model<Slates>,
    @InjectModel('voyages') private voyagesModel: Model<Voyages>,
    @InjectModel('users') private usersModel: Model<Users>,
  ) {}

  async getAllSlates(): Promise<Slates[]> {
    return this.slatesModel.find({});
  }

  async createSlates(slates: CreateSlateDto): Promise<Slates | Slates[]> {
    const donor: undefined | Users = await this.usersModel.findById(slates.donorId);
    const recipient = await this.usersModel.findById(slates.recipientId);
    const voyage = await this.voyagesModel.findById(slates.voyageId);
    if (!recipient || (slates.donorId && !donor) || !voyage) throw new NotFoundException('Entity not found');

    // MULTIPLE DONOR

    if (slates.multipleDonorIds && slates.multipleDonorIds[0]) {
      return Promise.all(
        slates.multipleDonorIds.map((donorId) => {
          return this.slatesModel.create({
            ...slates,
            donorId: new ObjectId(donorId),
            recipientId: new ObjectId(slates.recipientId),
            voyageId: new ObjectId(slates.voyageId),
            completed: false
          });
        })
      );
    }

    // ONE DONOR

    if (slates.donorId) {
      return this.slatesModel.create({
        ...slates,
        donorId: new ObjectId(slates.donorId),
        recipientId: new ObjectId(slates.recipientId),
        voyageId: new ObjectId(slates.voyageId),
        completed: false
      });
    }
  }

}
