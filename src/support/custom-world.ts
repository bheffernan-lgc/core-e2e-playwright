import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import { APIRequestContext, BrowserContext, Page, PlaywrightTestOptions } from '@playwright/test';
import { DependencyContainer } from 'tsyringe';

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

export interface ICustomWorld extends World {
  debug: boolean;
  feature?: messages.Pickle;
  context?: BrowserContext;
  page?: Page;
  testName?: string;
  startTime?: Date;
  playwrightOptions?: PlaywrightTestOptions;
  apiRequestContext?: APIRequestContext;
  container?: DependencyContainer;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
  debug = false;
}

setWorldConstructor(CustomWorld);
