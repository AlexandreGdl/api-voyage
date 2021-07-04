import { Db } from 'mongodb';
import { BaseFactory, FactoryCreateOneOptions } from './base.factory';
import { Users } from '../../users/users.schema';
export declare class UserFactory extends BaseFactory<Users> {
    private static instance;
    private constructor();
    static getInstance(db: Db): UserFactory;
    protected generateOne(options: FactoryCreateOneOptions<Users>): Promise<Users>;
}
