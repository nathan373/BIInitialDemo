function ShowSlope() {
    d3.csv("normal_battery.php", function(data) {
//		d3.csv("test.php", function(data) {
        var avgslope = c3.generate({
            bindto: '#avgslope',
//		title:{ text: 'Fully charged'},
            data: {
                json: data,
                type: 'spline',
                keys: {
                    x: 'avg_slope',
                    value: ['cnt']},
                color: function (color, d) {
                    return [d.index] > 10 ? "red" : "navy";
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                format: {
                    title: function (value) { return ('Discharge ' + value + '%'); },
//            title: function (index) { return (data[index]['devid']); },
                    //           value: function (value, ratio, id, index) {
//                return (data[index]['cnt']);
//				}
                }
            },
            axis: {
                x: {
                    type: 'indexed',
                    label: {
                        text: 'Discharge Rate - % Per Hour',
                        position: 'outer-middle'
                    }
//				value: 'slope',
//				 tick: {
//                    format: function (x) { return x*10; }
//                  //format: '%Y' // format string is also available for timeseries data
//                }
                },
                y: {
                    label: {
                        text: 'Device Count',
                        position: 'outer-middle'
                    }
                }
            }
        });
    });
}

    function ShowUncharged() {
        d3.json("https://2vf2f8xp27.execute-api.us-east-1.amazonaws.com/test/function_one", function(data1) {
//		d3.json(function(data1) {
            var chart1 = c3.generate({
                bindto: '#chart1',
                data: {
                    json: data1,
                    type: 'bar',
                    order: 'desc',
                    keys: {
                        x: 'Rng',
                        value: ['NumberOfDevices']},
                },
                legend: {
                    show: false
                },
                tooltip: {
                    format: {
                        name: function (name, ratio, id, index) { return ('Incident Count'); }
                    }
                },
                axis: {
                    x: {
                        type: 'category',
                        label: {
                            text: 'Charge Level Reached',
                            position: 'outer-middle'
                        }
                    },
                    y: {
                        label: {
                            text: 'Incident count',
                            position: 'outer-middle'
                        }
                    },
                    rotated: true
                }
            });
        });
    }

    function loadJSON(callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
//    xobj.open('GET', 'https://s3.amazonaws.com/slope-data/slope_charged/average_slope.json', true); 
        xobj.open('GET', 'normal_json.json', true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    function CreateTableFromJSON() {
        var data = '';
        var rawdata = '';
        loadJSON(function(response) {
            // Parse JSON string into object
            rawdata = JSON.parse(response);
            data = rawdata.sort(function(a, b){
                return b.range < a.range ? 1 : -1;}).slice(0, 100);

            var col = [];
            for (var i = 0; i < data.length; i++) {
                for (var key in data[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

            // CREATE DYNAMIC TABLE.
            var table = document.createElement("table");

            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = col[i];
                tr.appendChild(th);
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (var i = 0; i < data.length; i++) {

                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.align='center';
                    tabCell.innerHTML = data[i][col[j]];
                }
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("showData");
            //divContainer.innerHTML = "";
            //  divContainer.appendChild(table);
        })
    };