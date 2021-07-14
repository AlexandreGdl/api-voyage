import { INestApplication } from '@nestjs/common';
import { UserDocument } from '../../user/schema/user.schema';
import { IMongoConnection } from './mongo.utils';
import { LevelEnum } from '../../auth/enum/level.enum';
import { SubscriptionTypeEnum } from '../../subscription/enums/subscription-type.enum';
export declare function createUser(mc: IMongoConnection, userLevel: LevelEnum, password: string, secretMemoryPassword?: string, subscriptionType?: SubscriptionTypeEnum): Promise<UserDocument>;
export declare function getJwt(app: INestApplication, user: {
    mail: string;
    password: string;
}): Promise<string>;
export declare function getSecretJwt(app: INestApplication, token: string, password: string): Promise<string>;
