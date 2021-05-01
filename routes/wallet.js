const BinanceAPI = require('../lib/binance');
const { formatToUSD, formatToCurrency, formatCalcToPercent, formatToPercent } = require('../lib/formats');
const { sortArrayObjects } = require('../lib/utils');

const wallet = async (request, response) => {
    const binance = new BinanceAPI();
    const prices = await binance.prices();
  
    binance.balance(async (error, balances) => {
      if (error) {
        const errorObj = JSON.parse(error.body);
        response.render('pages/error', {
          error: `${errorObj.msg} [${errorObj.code}]`
        });
      } else {
        const myBalances = [];
        let totalAvailable = 0;
        let totalOrder = 0;
        let totalBalances = 0;
        for(const symbol of Object.keys(balances)) {
          const availableAmount = parseFloat(balances[symbol].available);
          const orderAmount = parseFloat(balances[symbol].onOrder);
          if((availableAmount > 0 || orderAmount > 0) && symbol !== 'USDT' && symbol !== 'BNB') {
            const symbolUSD = prices[`${symbol}USDT`] ? parseFloat(prices[`${symbol}USDT`]) : 1;
            const availableUSD = symbolUSD*availableAmount;
            const orderUSD = symbolUSD*orderAmount;
    
            myBalances.push({
              symbol: symbol,
              symbolUSD: formatToUSD(symbolUSD),
              amount: availableAmount+orderAmount,
              available: {
                amount: formatToCurrency(availableAmount),
                amountUSD: formatToUSD(availableUSD)
              },
              order: {
                amount: formatToCurrency(orderAmount),
                amountUSD: formatToUSD(orderUSD)
              },
              total: {
                amount: formatToCurrency(availableAmount+orderAmount),
                amountUSD: formatToUSD(availableUSD+orderUSD)
              }
            });
    
            totalAvailable += availableUSD;
            totalOrder += orderUSD;
            totalBalances += availableUSD+orderUSD;
          }
        }

        response.render('pages/wallet', {
          prices: {
            BTC: formatToUSD(prices.BTCUSDT, 2),
            ETH: formatToUSD(prices.ETHUSDT, 2),
            BNB: formatToUSD(prices.BNBUSDT, 2)
          },
          balances: myBalances.sort(sortArrayObjects('amount', 'desc')),
          totalBalances: {
            available: formatToUSD(totalAvailable),
            order: formatToUSD(totalOrder),
            total: formatToUSD(totalBalances),
          }
        });
      }
    });
};

module.exports = wallet;