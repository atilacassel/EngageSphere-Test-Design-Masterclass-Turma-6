const { defineConfig } = require('cypress')

module.exports = defineConfig({
  allowCypressEnv: false,
  
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    fixturesFolder: false,

    expose: {
      apiUrl: 'http://localhost:3001',
      featureFlag: true,
    },
  },
})
