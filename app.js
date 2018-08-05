var watsonUrl = 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21';
var context = document.querySelector('#watsonChart').getContext('2d');

var data = {};
data.text = "I hate you.";

var toneChartObject = {Analytical: 0,
                        Anger: 0,
                        Confident: 0,
                        Fear: 0,
                        Joy: 0,
                        Sadness: 0,
                        Tentative: 0
                        };

var toneArray = ['Analytical', 'Anger', 'Confident', 'Fear', 'Joy', 'Sadness', 'Tentative'];

$.ajax(
    { url: watsonUrl, 
    data: data, 
    headers: { 
        "Authorization": "Basic " + btoa(watsonUsername + ":" + watsonPassword) },
    success: function(watsonData) {
        var toneObject = watsonData.document_tone.tones 
        for (var i = 0; i < toneObject.length; i++) {
            var watsonToneName = toneObject[i].tone_name
            for (var j = 0; j < toneArray.length; j++) {
                var toneName = toneArray[j]
                if (watsonToneName === toneName) {
                    toneChartObject[toneName] = toneObject[i].score;
                }
            }  
        }      
    }
});

var toneValuesArray = Object.values(toneChartObject);

var mixedChart = new Chart(context, {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Tone Score',
            data: toneValuesArray,
            backgroundColor: 'rgb(65, 193, 244, 0.5)',
            borderColor: 'rgb(65, 193, 244, 0.5)'
            }, {
            label: 'Minimum Approval Score',
            data: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
            // Changes this dataset to become a line
            type: 'line',
            fill: false,
            backgroundColor: 'rgb(244, 72, 66)',
            borderColor: 'rgb(244, 72, 66)',
            showLine: false
            }, {
            label: 'Target Approval Score',
            data: [0.4, 0.6, 0.5, 0.4, 0.3, 0.3, 0.6],
            type: 'line',
            fill: false, 
            backgroundColor: 'rgb(54, 216, 36)',
            borderColor: 'rgb(54, 216, 36)',
            showLine: false,
            }, {
            label: 'Maximum Approval Score',
            data: [0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6],
            type: 'line',
            fill: false,
            backgroundColor: 'rgb(244, 72, 66)',
            borderColor: 'rgb(244, 72, 66)',
            showLine: false,
            }],
        labels: toneArray
    },
    options: {
        beginatZero: true, 
        scales: {
            yAxes: [{
                id: 'y-axis-1',
                type: 'linear', 
                position: 'left', 
                ticks: {
                    min: 0, 
                    max: 1.1
                },
                gridLines: {
                    display: false
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false
                }
            }]
        }
    }
});