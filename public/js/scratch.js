var hash = window.location.hash.substring(1);

d3.json('/data/' + hash + '.json', function(data) {
  nv.addGraph(function() {
    var chart = nv.models.cumulativeLineChart()
                  .x(function(d) { return d[0] })
                  .y(function(d) { return d[1]/100 }) //adjusting, 100% is 1.00, not 100 as it is in the data
                  .color(d3.scale.category10().range())
                  .useInteractiveGuideline(true)
                  ;

     chart.xAxis
        .tickFormat(function(d) {
            ''
          });
     chart.yAxis
        .tickFormat(function(d) {
            ''
          });


    d3.select('#burndown svg')
        .datum(data)
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
});


    <div id="content" class="span8>">
      <div id="burndown">
      <svg></svg>
    </div>
