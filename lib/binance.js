'use strict'

class Binance {
  constructor() {
    const binanceAPI = require('node-binance-api');
    this.binance = new binanceAPI().options({
      APIKEY: process.env.API_KEY,
      APISECRET: process.env.API_SECRET_KEY
    });
    return this.binance;
  }
}

module.exports = Binance; 