'use strict'

const cypressEslint = require('eslint-plugin-cypress/flat')

const config = {
  plugins: {
    cypress: cypressEslint,
  },
}

module.exports = { config }
