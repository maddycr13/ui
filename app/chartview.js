var dataChartView = Backbone.Marionette.ItemView.extend({
    el: '#chart-div',
    initialize: function(options) {
        this.data = options.model;
    },
    render: function() {
        this.$el.highcharts({
            chart: {
                type: 'coloumn'
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>:<b>{point.y.2f}%</b>oftotal<br/>'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                borderWidth: 0
            },
            series: this.data.toJSON()
        });
    }
});