const { defineConfig } = require("cypress");
module.exports = {
  chromeWebSecurity: false
};

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
     
      
    },
    chromeWebSecurity: false, //игнорируем сертификт протухший 

  },
});
