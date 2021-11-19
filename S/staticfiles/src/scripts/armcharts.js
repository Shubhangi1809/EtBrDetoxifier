// google.charts.load('current', {packages: ['corechart', 'bar']});
// google.charts.setOnLoadCallback(drawMultSeries);

// function drawMultSeries() {
//       var data = google.visualization.arrayToDataTable([
//         ['City', '2010 Population', '2000 Population'],
//         ['New York City, NY', 8175000, 8008000],
//         ['Los Angeles, CA', 3792000, 3694000],
//         ['Chicago, IL', 2695000, 2896000],
//         ['Houston, TX', 2099000, 1953000],
//         ['Philadelphia, PA', 1526000, 1517000]
//       ]);

//       var options = {
//         title: 'Population of Largest U.S. Cities',
//         chartArea: {width: '50%'},
//         hAxis: {
//           title: 'Total Population',
//           minValue: 0
//         },
//         vAxis: {
//           title: 'City'
//         }
//       };

//       var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
//       chart.draw(data, options);
//     }
// google.charts.load("current", {packages:["corechart"]});
// google.charts.setOnLoadCallback(drawChart);
//     function drawChart() {
//       var data = google.visualization.arrayToDataTable([
//         ["Element", "Density", { role: "style" } ],
//         ["Copper", 8.94, "#b87333"],
//         ["Silver", 10.49, "silver"],
//         ["Gold", 19.30, "gold"],
//         ["Platinum", 21.45, "color: #e5e4e2"]
//       ]);

//       var view = new google.visualization.DataView(data);
//       view.setColumns([0, 1,
//                        { calc: "stringify",
//                          sourceColumn: 1,
//                          type: "string",
//                          role: "annotation" },
//                        2]);

//       var options = {
//         title: "Density of Precious Metals, in g/cm^3",
//         width: 500,
//         bar: {groupWidth: "95%"},
//         legend: { position: "none" },
//       };
//       var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
//       chart.draw(view, options);
//   }
// google.charts.load('current', {packages: ['corechart', 'line']});
// google.charts.setOnLoadCallback(drawCurveTypes);

// function drawCurveTypes() {
//       var data = new google.visualization.DataTable();
//       data.addColumn('number', 'X');
//       data.addColumn('number', 'Dogs');
//       data.addColumn('number', 'Cats');

//       data.addRows([
//         [0, 0, 0],    [1, 10, 5],   [2, 23, 15],  [3, 17, 9],   [4, 18, 10],  [5, 9, 5],
//         [6, 11, 3],   [7, 27, 19],  [8, 33, 25],  [9, 40, 32],  [10, 32, 24], [11, 35, 27],
//         [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
//         [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
//         [24, 60, 52], [25, 50, 42], [26, 52, 44], [27, 51, 43], [28, 49, 41], [29, 53, 45],
//         [30, 55, 47], [31, 60, 52], [32, 61, 53], [33, 59, 51], [34, 62, 54], [35, 65, 57],
//         [36, 62, 54], [37, 58, 50], [38, 55, 47], [39, 61, 53], [40, 64, 56], [41, 65, 57],
//         [42, 63, 55], [43, 66, 58], [44, 67, 59], [45, 69, 61], [46, 69, 61], [47, 70, 62],
//         [48, 72, 64], [49, 68, 60], [50, 66, 58], [51, 65, 57], [52, 67, 59], [53, 70, 62],
//         [54, 71, 63], [55, 72, 64], [56, 73, 65], [57, 75, 67], [58, 70, 62], [59, 68, 60],
//         [60, 64, 56], [61, 60, 52], [62, 65, 57], [63, 67, 59], [64, 68, 60], [65, 69, 61],
//         [66, 70, 62], [67, 72, 64], [68, 75, 67], [69, 80, 72]
//       ]);

//       var options = {
//         hAxis: {
//           title: 'Time'
//         },
//         vAxis: {
//           title: 'Popularity'
//         },
//         series: {
//           1: {curveType: 'function'}
//         }
//       };

//       var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
//       chart.draw(data, options);
//     }
/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
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