import {ConflictException, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Model } from 'mongoose';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Places } from './schema/places.schema';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel('places') private placesModel: Model<Places>,
  ) {}

  async getGlobalPlaces(): Promise<Places[]> {
    return this.placesModel.aggregate([
      { $match: { isGlobal: true } },
      { $lookup: {
        from: 'types',
        localField: 'typeId',
        foreignField: '_id',
        as: 'type'
      } },
      { $unwind: { path: '$type', preserveNullAndEmptyArrays: true } }
    ]);
  }

  async createPlaces(newPlaces: CreatePlaceDto): Promise<Places> {
    const createdPlace = await this.placesModel.create({
      ...newPlaces
    });
    return createdPlace;
  }
}
