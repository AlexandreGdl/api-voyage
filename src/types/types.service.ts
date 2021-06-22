import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Types} from "./types.schema";
import {CreatePlaceDto} from "../places/dto/create-place.dto";
import {Places} from "../places/schema/places.schema";

@Injectable()
export class TypesService {
    constructor(
        @InjectModel('types') private typesModel: Model<Types>,
    ) {}

    async findType(name: string): Promise<Types | undefined> {
        return this.typesModel.findOne({ name });
    }

    async getAllTypes(): Promise<Types[]> {
        return this.typesModel.find({});
    }

    async createType(newType: string): Promise<Types> {
        const type = await this.findType(newType);

        if (type) throw new BadRequestException('Bad request');

        const createdType = await this.typesModel.create({
            name: newType
        });

        return createdType;
    }

}
