import { Db } from 'mongodb';
import { BaseFactory, FactoryCreateOneOptions, FactoryParams } from './base.factory';
import { Users } from '../../users/users.schema';
import { mergeObjects } from '../../_helper/utils';

export class UserFactory extends BaseFactory<Users> {

  private static instance: UserFactory;

  private constructor(db: Db, params: FactoryParams) {
    super(db, params);
  }

  /**
   * Singleton method to get the only one instance of the class
   * @param {Db} db instance
   * @returns {UserFactory} instance
   */
  public static getInstance(db: Db): UserFactory {
    if (!UserFactory.instance) {
      UserFactory.instance = new UserFactory(db, { collection: 'users' });
    }

    return UserFactory.instance;
  }

  /**
   * Generate one event with fakerjs.
   * This function is used in both createOne and createMany methods
   * Number of elements in sub arrays is defined by the arraysLength option, or
   * the length of the customValues same array. By default, one item will be created.
   * @param {FactoryCreateOneOptions<UserDocument>} options options to create one user.
   * @returns {Promise<UserDocument>} a Users object merge with the custom values.
   */
  protected async generateOne(options: FactoryCreateOneOptions<Users>): Promise<Users> {

    return mergeObjects<Users>(
      {

      } as Users,
      options?.customValues
    );
  }
}
