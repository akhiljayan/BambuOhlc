(function () {
    angular.module('app').factory('operations', [
        '$state', '$filter', '$http', '$cookies', '$interval',
        function ($state, $filter, $http, $cookies, $interval) {
            var operationFactory = {};
            operationFactory.apiKey = "HOXI2Z1GC3JDPS44";
            
            operationFactory.symbols = [{
                    "key": "msft",
                    "display": "MFST"
                },
                {
                    "key": "aapl",
                    "display": "AAPL"
                },
                {
                    "key": "intc",
                    "display": "INTC"
                },
                {
                    "key": "nflx",
                    "display": "NFLX"
                },
                {
                    "key": "orcl",
                    "display": "ORCL"
                },
                {
                    "key": "cmcsa",
                    "display": "CMCSA"
                },
                {
                    "key": "goog",
                    "display": "GOOG"
                },
                {
                    "key": "luv",
                    "display": "LUV"
                },
                {
                    "key": "hog",
                    "display": "HOG"
                },
                {
                    "key": "googl",
                    "display": "GOOGL"
                },
                {
                    "key": "amzn",
                    "display": "AMZN"
                }
            ];

            operationFactory.dataKey = {
                "mainDataKey": "Time Series (Daily)",
                "open": "1. open",
                "high": "2. high",
                "low": "3. low",
                "close": "4. close",
                "volume": "6. volume",
                "adjusted": "5. adjusted close"
            }
            operationFactory.setCokieSymbol = function (symbol) {
                $cookies.remove('symbol');
                $cookies.put('symbol', symbol);
            };

            operationFactory.getCokieSymbol = function () {
                if ($cookies.get('symbol')) {
                    return $cookies.get('symbol');
                } else {
                    return "";
                }
            };



            operationFactory.getApiUrl = function (symbol, funct = "TIME_SERIES_DAILY_ADJUSTED", interval = "5min") {
                var apiCore = "https://www.alphavantage.co/query?";
                var apiFunct = "&function=" + funct;
                var apiInterval = "&interval=" + interval;
                var apiSymbol = "&symbol=" + symbol;
                var key = "&apikey=" + operationFactory.apiKey;
                return apiCore + apiFunct + apiInterval + apiSymbol + key;
            };


            operationFactory.formatData = function (data) {
                var finalData = [];
                var ohlcData = data[operationFactory.dataKey.mainDataKey];
                angular.forEach(ohlcData, function (value, key) {
                    var tempdata = {};
                    var resolvedData = resolveOhlc(value, operationFactory.dataKey);

                    tempdata.date = Date.parse(key);
                    tempdata.open = resolvedData.open;
                    tempdata.high = resolvedData.high;
                    tempdata.low = resolvedData.low;
                    tempdata.close = resolvedData.close;
                    tempdata.volume = resolvedData.volume;
                    tempdata.adjusted = resolvedData.adjusted;
                    finalData.push(tempdata);
                });

                var clipFinalData = finalData.slice(1).slice(-5);
                var returnData = [{
                    "values": clipFinalData
                }];
                return returnData;
            };

            function resolveOhlc(value, key) {
                var returnObj = {
                    "open": value[key.open],
                    "high": value[key.high],
                    "low": value[key.low],
                    "close": value[key.close],
                    "volume": value[key.volume],
                    "adjusted": value[key.adjusted]
                };
                return returnObj;
            }

            $interval(function () {
                $cookies.remove('symbol');
            }, 1.8e+6);



            return operationFactory;
        }
    ]);

})();