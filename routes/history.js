const routes = require('express').Router();
const BinanceAPI = require('../lib/binance');
const { formatToUSD, formatToCurrency } = require('../lib/formats');
const { sortArrayObjects } = require('../lib/utils');
const binance = new BinanceAPI();

const history = (request, response) => {
    binance.balance(async (error, balances) => {
      if (error) {
        return console.error(error);
      }

      const symbols = [];
      Object.keys(balances).forEach((symbol) => {
        const availableAmount = parseFloat(balances[symbol].available);
        const orderAmount = parseFloat(balances[symbol].onOrder);
        if(availableAmount > 0 || orderAmount > 0) {
          if(symbol !== 'USDT') {
            symbols.push(symbol);
          }
        }
      });

      const historys = await trades(symbols.sort());

      response.render('pages/history', {
        historys: historys
      });
    });
};

const trades = async (symbols) => {
    const promisses = [];
    const historys = [];

    symbols.map(async (symbol) => {
        promisses.push(new Promise((resolve, reject) => {
            binance.trades(`${symbol}USDT`, (error, trades, currency) => {
                if(error) {
                    resolve();
                }
                if(trades.length > 0) {
                    const history = JSON.parse(JSON.stringify(trades));
                    historys[currency] = Array.isArray(history) ? history : [history];
                }
                
                resolve();
            });
        })); 
        promisses.push(new Promise((resolve, reject) => {
            binance.trades(`${symbol}BNB`, (error, trades, currency) => {
                if(error) {
                    resolve();
                }
                if(trades.length > 0) {
                    const history = JSON.parse(JSON.stringify(trades));
                    historys[currency] = Array.isArray(history) ? history : [history];
                }

                resolve();
            });
        })); 
    });
    await Promise.all(promisses);

    return historys;
};

module.exports = history;