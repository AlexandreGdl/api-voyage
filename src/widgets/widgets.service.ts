import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Widgets } from './schema/widgets.schema';

@Injectable()
export class WidgetService {
  constructor(
    @InjectModel('widgets') private widgetsModel: Model<Widgets>,
  ) {}

  async getWidgets(): Promise<Widgets[]> {
    return this.widgetsModel.find();
  }

}
