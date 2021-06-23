import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, Schema} from 'mongoose';
import {Voyages} from "./schema/voyages.schema";
import {CreateVoyageDto} from "./dto/create-voyage.dto";
import {ObjectId} from "mongodb";
import {AddMemberDto} from "./dto/add-member.dto";
import {ToggleWidgetDto} from "./dto/toggle-widget.dto";
import {Widgets} from "../widgets/schema/widgets.schema";

@Injectable()
export class VoyagesService {
    constructor(
      @InjectModel('voyages') private voyagesModel: Model<Voyages>,
      @InjectModel('widgets') private widgetsModel: Model<Widgets>,
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

}