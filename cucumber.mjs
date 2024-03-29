const getWorldParams = () => {
  const params = {

  };

  return params;
};

const config = {
  requireModule: ['ts-node/register'],
  require: ['src/**/*.ts'],
  format: [
    'json:reports/cucumber-report.json',
    'summary',
    'progress-bar',
  ],
  formatOptions: { snippetInterface: 'async-await', },
  worldParameters: getWorldParams(),
  publishQuiet: true,
};

if (process.env.USE_ALLURE) {
  config.format.push('./src/support/reporters/allure-reporter.ts');
} else {
  config.format.push('@cucumber/pretty-formatter');
}

export default config;
