import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
export interface CreateTestAppResult {
    app: INestApplication;
    moduleFixture: TestingModule;
}
export declare const getTestingApplication: () => Promise<INestApplication>;
export declare const getTestingApplicationWithModule: () => Promise<CreateTestAppResult>;
