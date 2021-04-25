const BinanceAPI = require('../lib/binance');
const { formatToUSD, formatToCurrency, formatCalcToPercent, formatToPercent } = require('../lib/formats');
const { sortArrayObjects } = require('../lib/utils');
const binance = new BinanceAPI();

const home = async (request, response) => {
    const prices = await binance.prices();
  
    binance.balance(async (error, balances) => {
      if (error) {
        return console.error(error);
      }

      const myBalances = [];
      let totalAverage = 0;
      for(const symbol of Object.keys(balances)) {
        const availableAmount = parseFloat(balances[symbol].available);
        const orderAmount = parseFloat(balances[symbol].onOrder);
        if((availableAmount > 0 || orderAmount > 0) && symbol !== 'USDT' && symbol !== 'BNB') {
          const symbolUSD = prices[`${symbol}USDT`] ? parseFloat(prices[`${symbol}USDT`]) : 1;

          let averageTicket = 0;
          if(symbol !== 'USDT') {
            averageTicket = await calcAverageTicket(`${symbol}USDT`);
          }
          const averagePercent = formatCalcToPercent(averageTicket, symbolUSD);
  
          myBalances.push({
            symbol: symbol,
            symbolUSD: formatToUSD(symbolUSD),
            averageTicket: formatToUSD(averageTicket),
            averagePercent: averagePercent,
          });
  
          totalAverage += averagePercent;
        }
      }

      response.render('pages/home', {
        prices: {
          BTC: formatToUSD(prices.BTCUSDT, 2),
          ETH: formatToUSD(prices.ETHUSDT, 2),
          BNB: formatToUSD(prices.BNBUSDT, 2)
        },
        balances: myBalances.sort(sortArrayObjects('amount', 'desc')),
        totalBalances: {
          average: formatToPercent(totalAverage)
        }
      });
    });
};

const calcAverageTicket = async (symbol) => {
  return new Promise((resolve, reject) => {
    binance.trades(symbol, (error, trades) => {
      let qty = 0;
      let amount = 0;
      if(error) {
        resolve(amount);
      }
      if(trades.length > 0) {
        const history = JSON.parse(JSON.stringify(trades));
        history.forEach((item) => {
            if(item.isBuyer) {
              amount += parseFloat(item.quoteQty);
              qty += parseFloat(item.qty);
            } else {
              qty = 0;
              amount = 0;
            }
        });
      }
      resolve(qty > 0 ? amount/qty : 0);
    });
  }); 
};

module.exports = home;