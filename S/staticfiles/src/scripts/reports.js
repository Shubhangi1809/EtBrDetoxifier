const data = {{query_results |safe}};const filteredData = {};
const devices = [];
data.forEach(record => {
    const data = record.fields['CreatedAt'].split('T')[0];
    const device = record.fields['Device'];

    if (!filteredData[data]) {
        filteredData[data] = {};
    }

    if (!filteredData[data][device]) {
        filteredData[data][device] = 0;
    }

    if(!devices.includes(device)) {
        devices.push(device);
    }

    filteredData[data][device]++;
})

console.log(filteredData)

am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);

//

// Increase contrast by taking evey second color
chart.colors.step = 2;

// Add data
chart.data = generateChartData();

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 50;

// Create series
function createAxisAndSeries(field, name, opposite) {
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  if(chart.yAxes.indexOf(valueAxis) != 0){
  	valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
  }
  
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = field;
  series.dataFields.dateX = "date";
  series.strokeWidth = 2;
  series.yAxis = valueAxis;
  series.name = name;
  series.tooltipText = "{name}: [bold]{valueY}[/]";
  series.tensionX = 0.8;
  series.showOnInit = true;
  
  var interfaceColors = new am4core.InterfaceColorSet();
  
  var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.stroke = interfaceColors.getFor("background");
      bullet.circle.strokeWidth = 2;

  valueAxis.renderer.line.strokeOpacity = 1;
  valueAxis.renderer.line.strokeWidth = 2;
  valueAxis.renderer.line.stroke = series.stroke;
  valueAxis.renderer.labels.template.fill = series.stroke;
  valueAxis.renderer.opposite = opposite;
}

devices.forEach(e => {
    createAxisAndSeries(e, e, false);
})

// Add legend
chart.legend = new am4charts.Legend();

// Add cursor
chart.cursor = new am4charts.XYCursor();

// generate some random data, quite different range
function generateChartData() {

    const chartData = [];

    Object.keys(filteredData).forEach(date => {
        const data = {};

        devices.forEach(device => {
            if (!filteredData[date][device]) {
                data[device] = 0;
            } else {
                data[device] = filteredData[date][device];
            }
        });

        data['date'] = date;
        chartData.push(data);
    });

    return chartData;
}

});