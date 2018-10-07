(function () {
    angular.module('app').controller('ShowChartController', [
        '$state', '$stateParams', '$scope','operations','$timeout',
        function ($state, $stateParams, $scope,operations,$timeout) {
            var vm = this;
            vm.header = 'Home sweet home!';
            vm.$onInit = onInit;

            vm.$onChanges = function (changes) {
                debugger;
                if(angular.equals(changes.data.previousValue,{}) && !angular.equals(changes.data.currentValue,{})){
                    setUpChart(changes.data.currentValue);
                }

                if(!angular.equals(changes.data.previousValue,{}) && !angular.equals(changes.data.currentValue,{})){
                    setUpChart(changes.data.currentValue);
                }
            }

            function onInit() {
                if(vm.data){
                    setUpChart(vm.data);
                }
            }


            function setUpChart(data) {
                var atlastData = operations.formatData(data);
                vm.ohlcData = atlastData;
                vm.chartOptions = {
                    chart: {
                        type: 'ohlcBarChart',
                        height: 450,
                        margin : {
                            top: 20,
                            right: 20,
                            bottom: 40,
                            left: 60
                        },
                        x: function(d){ 
                            return  d.date; 
                        },
                        y: function(d){ return d['date']; },
                        duration: 100,
                        xScale: d3.time.scale(),
                        xAxis: {
                            axisLabel: 'Dates',
                            tickFormat: function(d) {
                                debugger;
                                return d3.time.format('%m/%d/%Y')(new Date(d));
                            },
                            showMaxMin: false
                        },
        
                        yAxis: {
                            axisLabel: 'Stock Price',
                            tickFormat: function(d){
                                return '$' + d3.format(',.1f')(d);
                            },
                            showMaxMin: false
                        },
                        zoom: {
                            enabled: true,
                            scaleExtent: [1, 10],
                            useFixedDomain: false,
                            useNiceScale: false,
                            horizontalOff: false,
                            verticalOff: true,
                            unzoomEventType: 'dblclick.zoom'
                        }
                    }
                };

                $timeout( function(){
                   
                }, 5000 );
        

                //vm.ohlcData = [{"values":[{"date":1526947200000,"open":"188.3750","high":"188.8800","low":"186.7800","close":"187.1600","volume":"15240704","adjusted":"186.5040"},{"date":1526860800000,"open":"188.0000","high":"189.2700","low":"186.9106","close":"187.6300","volume":"18400787","adjusted":"186.9723"},{"date":1526601600000,"open":"187.1900","high":"187.8102","low":"186.1300","close":"186.3100","volume":"18297728","adjusted":"185.6569"},{"date":1526515200000,"open":"188.0000","high":"188.9100","low":"186.3600","close":"186.9900","volume":"17294029","adjusted":"186.3346"},{"date":1526428800000,"open":"186.0700","high":"188.4600","low":"186.0000","close":"188.1800","volume":"19183064","adjusted":"187.5204"}]}];
                
            }
        }
    ]);
})();