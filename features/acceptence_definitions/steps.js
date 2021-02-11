import {Given, When, Then, After, BeforeAll, AfterAll} from '@cucumber/cucumber';
import { Nuxt, Builder as NuxtBuilder } from 'nuxt';
import path from 'path';

let nuxt = null;

BeforeAll({timeout: 60*1000}, async function () {
  const config = {
    dev: false,
    telemetry: false,
    rootDir: path.resolve(__dirname, '../../')
  };
  nuxt = new Nuxt(config);
  await new NuxtBuilder(nuxt).build();
  await nuxt.server.listen(3000, '0.0.0.0');
});

AfterAll({timeout: 60*1000},  () => {
    nuxt.close();
});

When('I click button', function () {
    // You can use something like selenium-webdriver for click
    return 'pending';
  });

Then('I see {string} message', function (string) {
    return 'pending';
});