const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',

    expose: {
      apiUrl: 'http://localhost:3001',
      featureFlag: true,
    },
  },
})
