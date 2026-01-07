const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // This tells Cypress the EXACT address of your site
    baseUrl: 'http://qamukesh.local:10003',
    // This helps prevent "Origin" errors by allowing cross-origin during redirects
    chromeWebSecurity: false, 
    setupNodeEvents(on, config) {
      // We will add email logic here later
    },
  },
});