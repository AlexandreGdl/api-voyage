import { Db } from 'mongodb';
import { mergeObjects } from '../../_helper/utils';

export interface FactoryCreateOptions {
  // is creating the document in database or not ?
  isCreatingDocument?: boolean,

  // number of attributes generated in the arrays properties, by field name
  arraysLength?: Record<string, number>
}

export interface FactoryCreateOneOptions<T> extends FactoryCreateOptions {
  // custom values for the created object
  customValues?: T,
}

export interface FactoryCreateManyOptions<T> extends FactoryCreateOptions {
  /**
   * Custom values for the created objects.
   * If is an array, each element will be customized with a specific value.
   * If is an object, all element will be customized with the same values.
   */
  customValues?: Array<T> | T,
}

export interface FactoryParams {
  // Collection name to insert in db. None if never need insert in db.
  collection: string | 'none';
}

export abstract class BaseFactory<T> {

  // Database reference to make mongoose queries
  protected db: Db;

  // Factory Params
  protected params: FactoryParams;

  // default options for parameters of type FactoryCreateOptions
  protected defaultOptions: FactoryCreateOptions = {
    isCreatingDocument: true,
  }

  protected constructor(db: Db, params: FactoryParams) {
    this.db = db;
    this.params = params;
  };

  /**
   * Create one entity in database
   * @param {FactoryCreateOneOptions<T>} options factory option
   * @returns {T} the created entity object instance
   */
  public async createOne(options?: FactoryCreateOneOptions<T>): Promise<T> {
    // eslint-disable-next-line no-param-reassign
    options = mergeObjects<FactoryCreateOptions>(this.defaultOptions, options);

    const generatedObject = await this.generateOne(options);

    if (options.isCreatingDocument && this.params.collection !== 'none') {
      const { ops } = await this.db.collection(this.params.collection).insertOne(generatedObject);
      return ops[0];
    }

    return generatedObject;
  };

  /**
   * Create multiple entities in database
   * @param {number} amount the amount of objects to generate
   * @param {FactoryCreateOneOptions<T>} options factory option
   * @returns {T[]} the created entities objects instances
   */
  public async createMany(amount: number, options?: FactoryCreateManyOptions<T>): Promise<T[]> {
    // eslint-disable-next-line no-param-reassign
    options = mergeObjects<FactoryCreateOptions>(this.defaultOptions, options);

    const generatedObjects = await Promise.all(
      Array.from(Array(amount), (_, i: number) => {
        const opts = {
          ...options,
          customValues: options.customValues instanceof Array
            ? options.customValues?.[i]
            : options.customValues,
        };

        return this.generateOne(opts);
      })
    );

    if (options.isCreatingDocument && this.params.collection !== 'none') {
      const { ops } = await this.db.collection(this.params.collection).insertMany(generatedObjects);
      return ops;
    }

    return generatedObjects;
  };

  protected abstract generateOne(options: FactoryCreateOneOptions<T>): Promise<T>;
}
