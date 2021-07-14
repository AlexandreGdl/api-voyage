import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppModule } from '../../app/app.module';

/**
 * @interface CreateTestAppResult
 */
export interface CreateTestAppResult {
  app: INestApplication,
  moduleFixture: TestingModule
}

/**
 * Get a nest application from a built testing module.
 * Use the global AppModule.
 * @returns {Promise<INestApplication>} Nest application and the testing module
 */
export const getTestingApplication = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      AppModule,
      LoggerModule.forRoot({
        pinoHttp: {
          level: 'silent'
        }
      }),
    ],
  }).compile();

  return moduleFixture.createNestApplication();
};

/**
 * Get a nest application from a built testing module. Return also the testing module
 * Use the global AppModule.
 * @returns {Promise<CreateTestAppResult>} Nest application and the testing module
 */
export const getTestingApplicationWithModule = async (): Promise<CreateTestAppResult> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      AppModule,
      LoggerModule.forRoot({
        pinoHttp: {
          level: 'silent'
        }
      }),
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();

  return { app, moduleFixture };
};
