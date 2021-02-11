# cucumber-vue-nuxt

```
npm i

// to test vue components
npm run test:unit

// to test nuxt
npm run test:acceptance
```

`npm i --save-dev @cucumber/cucumber @babel/core @babel/register @babel/preset-env`

Make directory structure and package.json by official cucumber guide https://cucumber.io/docs/guides/10-minute-tutorial/.

Replace `require` by `import` in `step_definitions/steps.js`.

To support "es6 import" update `scripts.test` in `package.json`: replace `"test": "cucumber-js"` by `"test": "cucumber-js --require-module @babel/register"`.

Create `babel.config.js`
```
module.exports = {
  presets: ['@babel/preset-env']
}
```

Now your cucumber works.

## Next step: add vue support.
To compile vue Single File Components you can use this guide https://github.com/avajs/ava/blob/main/docs/recipes/vue.md

Meaningful steps:
* Create file `./test/_setup.js`
* Install require dependencies

`npm i --save-dev require-extension-hooks require-extension-hooks-vue require-extension-hooks-babel@beta jsdom jsdom-global`

Update `scripts.test` in `package.json`: `"test": "cucumber-js --require-module @babel/register --require test/_setup.js --require features/step_definitions/*.js`.

Install `@vue/test-utils`

`npm i --save-dev @vue/test-utils`

```
// test/_setup.js

// Set up JSDom.
require('jsdom-global')()

// Fix the Date object, see <https://github.com/vuejs/vue-test-utils/issues/936#issuecomment-415386167>.
window.Date = Date

// Setup browser environment
const hooks = require('require-extension-hooks');
const Vue = require('vue');

// Setup Vue.js to remove production tip
Vue.config.productionTip = false;

// Setup vue files to be processed by `require-extension-hooks-vue`
hooks('vue').plugin('vue').push();
// Setup vue and js files to be processed by `require-extension-hooks-babel`
hooks(['vue', 'js']).exclude(({filename}) => filename.match(/\/node_modules\//)).plugin('babel').push();
```

Now you can test vue single file components!

Note that `@vue/test-utils` should be import earlier then your vue component.

## Add nuxt support
To add nuxt support you can see that repo https://github.com/vinayakkulkarni/nuxt-ava-e2e-unit-testing

You need update `test/_setup.js`

```
const hooks = require('require-extension-hooks');

if (process.env.TEST === 'unit') {
  require('jsdom-global')();
  require('browser-env');
  const Vue = require('vue');
  Vue.config.productionTip = false;
  // https://github.com/nuxt/create-nuxt-app/issues/180#issuecomment-463069941
  window.Date = global.Date = Date;
}

if (process.env.TEST === 'e2e') {
  const Vue = require('vue');
  Vue.config.productionTip = false;
}

// Setup vue files to be processed by `require-extension-hooks-vue`
hooks('vue').plugin('vue').push();
// Setup vue and js files to be processed by `require-extension-hooks-babel`
hooks(['vue', 'js'])
  .exclude(
    ({filename}) => filename.match(/\/node_modules\//) || filename.includes('webpack.config.test.js')
  )
  .plugin('babel')
  .push();
```

As you can see we introduce ENVIRONMENT variable `TEST`. To set this variable install `cross-env` package and update your `package.json`. 

Also we add `webpack.config.test.js` and `babel-plugin-webpack-alias-7` and update `babel.config.js` to support path like `~/components/Hello`.

```
npm i cross-env
```
```
// package.json
    "test:unit": "cross-env TEST=unit cucumber-js --require-module @babel/register --require test/_setup.js --require features/step_definitions/*.js",
    "test:integration": "cross-env TEST=e2e cucumber-js --require-module @babel/register --require test/_setup.js --require features/acceptence_definitions/*.js"
```
```
// babel.config.js
module.exports = {
  presets: ['@babel/preset-env'],
  "plugins": [
    ["babel-plugin-webpack-alias-7", {config: './test/webpack.config.test.js'}]
  ]
}

```

Now `features/step_definitions` contains step definitions for test components and `features/acceptance_definitions/*.js` contains step definitions for nuxt tests.

