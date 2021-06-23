import { Db } from 'mongodb';
import { BaseFactory, FactoryCreateOneOptions, FactoryParams } from './base.factory';
import { Widgets } from "../../widgets/schema/widgets.schema";
import { mergeObjects } from '../../_helper/utils';

export class WidgetFactory extends BaseFactory<Widgets> {

  private static instance: WidgetFactory;

  private constructor(db: Db, params: FactoryParams) {
    super(db, params);
  }

  /**
   * Singleton method to get the only one instance of the class
   * @param {Db} db instance
   * @returns {UserFactory} instance
   */
  public static getInstance(db: Db): WidgetFactory {
    if (!WidgetFactory.instance) {
      WidgetFactory.instance = new WidgetFactory(db, { collection: 'widgets' });
    }

    return WidgetFactory.instance;
  }

  /**
   * This function is used in both createOne and createMany methods
   * Number of elements in sub arrays is defined by the arraysLength option, or
   * the length of the customValues same array. By default, one item will be created.
   * @param {FactoryCreateOneOptions<UserDocument>} options options to create one user.
   * @returns {Promise<UserDocument>} a Users object merge with the custom values.
   */
  protected async generateOne(options: FactoryCreateOneOptions<Widgets>): Promise<Widgets> {

    return mergeObjects<Widgets>(
      {
        name: 'default-name',
        description: 'default-desc'
      } as Widgets,
      options?.customValues
    );
  }
}
