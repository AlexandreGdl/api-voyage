import {Db, ObjectId} from 'mongodb';
import { BaseFactory, FactoryCreateOneOptions, FactoryParams } from './base.factory';
import { Places } from "../../places/schema/places.schema";
import { mergeObjects } from '../../_helper/utils';
import {Prop} from "@nestjs/mongoose";
import {Location} from "../../places/interface/location.interface";

export class PlaceFactory extends BaseFactory<Places> {

  private static instance: PlaceFactory;

  private constructor(db: Db, params: FactoryParams) {
    super(db, params);
  }

  /**
   * Singleton method to get the only one instance of the class
   * @param {Db} db instance
   * @returns {UserFactory} instance
   */
  public static getInstance(db: Db): PlaceFactory {
    if (!PlaceFactory.instance) {
      PlaceFactory.instance = new PlaceFactory(db, { collection: 'places' });
    }

    return PlaceFactory.instance;
  }

  /**
   * This function is used in both createOne and createMany methods
   * Number of elements in sub arrays is defined by the arraysLength option, or
   * the length of the customValues same array. By default, one item will be created.
   * @param {FactoryCreateOneOptions<UserDocument>} options options to create one user.
   * @returns {Promise<UserDocument>} a Users object merge with the custom values.
   */
  protected async generateOne(options: FactoryCreateOneOptions<Places>): Promise<Places> {

    const position: Location = {
      long: 0,
      lat: 0
    };

    return mergeObjects<Places>(
      {
        typeId: new ObjectId(),
        position,
        name: 'default-name',
      } as Places,
      options?.customValues
    );
  }
}
