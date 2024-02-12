import { ICustomWorld } from './custom-world';
import { config } from './config';
import { BROWSER } from '../constants/global';
import { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import {
  chromium,
  ChromiumBrowser,
  ConsoleMessage,
  firefox,
  FirefoxBrowser,
  request,
  webkit,
  WebKitBrowser,
} from '@playwright/test';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import 'reflect-metadata';
import { container } from 'tsyringe';

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;

declare global {
  const browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}

setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

BeforeAll(async function () {
  switch (config.browser) {
    case BROWSER.firefox:
      browser = await firefox.launch(config.browserOptions);
      break;
    case BROWSER.safari:
      browser = await webkit.launch(config.browserOptions);
      break;
    default:
      browser = await chromium.launch(config.browserOptions);
  }
});

Before({ tags: '@ignore' }, async function () {
  return 'skipped' as any;
});

Before({ tags: '@debug' }, async function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, '-');
  // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
    viewport: { width: 1200, height: 800 },
  });


  this.page = await this.context.newPage();
  this.apiRequestContext = await request.newContext();

  this.container = container
    .register('page', { useValue: this.page })
    .register('apiRequestContext', { useValue: this.apiRequestContext });

  this.page.on('console', async (msg: ConsoleMessage) => {
    if (msg.type() === 'log') {
      await this.attach(msg.text());
    }
  });
  this.feature = pickle;
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    await this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);

    if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot();
      image && (await this.attach(image, 'image/png'));
    }
  }
  await this.page?.close();
  await this.context?.close();
  this.container?.clearInstances();
});

AfterAll(async function () {
  await browser.close();
});
