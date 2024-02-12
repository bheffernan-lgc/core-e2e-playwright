import { BROWSER } from '../constants/global';
import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, './envs', `${process.env.ENV}.env`) });

const browserOptions: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  // Options shared for all projects
  use: {
    headless: false,
    viewport: { width: 1280, height: 920 },
    actionTimeout: 15000,
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot: 'only-on-failure',
  },
  workers: 5,
};

export const config = {
  browser: process.env.BROWSER || BROWSER.chrome,
  browserOptions,
  baseURL: baseUrlHelper(),
  IMG_THRESHOLD: { threshold: 0.4 },
};

function baseUrlHelper() {
  const geo = process.env.GEO?.toLowerCase();
  const usUrl: string = process.env.ENV_US?.toString() ?? '';
  const euUrl: string = process.env.ENV_EU?.toString() ?? '';

  if (geo === 'us') {
    return usUrl;
  } else {
    return euUrl;
  }
}

export default config;
