import { Db } from 'mongodb';
import { BaseFactory, FactoryCreateOneOptions, FactoryParams } from './base.factory';
import { Types } from "../../types/types.schema";
import { mergeObjects } from '../../_helper/utils';

export class TypeFactory extends BaseFactory<Types> {

  private static instance: TypeFactory;

  private constructor(db: Db, params: FactoryParams) {
    super(db, params);
  }

  /**
   * Singleton method to get the only one instance of the class
   * @param {Db} db instance
   * @returns {UserFactory} instance
   */
  public static getInstance(db: Db): TypeFactory {
    if (!TypeFactory.instance) {
      TypeFactory.instance = new TypeFactory(db, { collection: 'types' });
    }

    return TypeFactory.instance;
  }

  /**
   * This function is used in both createOne and createMany methods
   * Number of elements in sub arrays is defined by the arraysLength option, or
   * the length of the customValues same array. By default, one item will be created.
   * @param {FactoryCreateOneOptions<UserDocument>} options options to create one user.
   * @returns {Promise<UserDocument>} a Users object merge with the custom values.
   */
  protected async generateOne(options: FactoryCreateOneOptions<Types>): Promise<Types> {

    return mergeObjects<Types>(
      {
        name: 'default-name'
      } as Types,
      options?.customValues
    );
  }
}
