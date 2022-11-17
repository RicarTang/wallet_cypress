const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config);
    },
    baseUrl: 'http://127.0.0.1:8000'
    
  },
  retries: 2, // 失败重跑次数
});
