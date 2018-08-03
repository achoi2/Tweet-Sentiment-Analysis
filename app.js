var watsonUrl = 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21';
var ctx = document.getElementById('watsonChart').getContext('2d');

var data = {};
data.text = "I hate you.";

$.ajax(
    { url: watsonUrl, 
    data: data, 
    headers: { 
        "Authorization": "Basic " + btoa(watsonUsername + ":" + watsonPassword) },
    function(err, response, body) {
        console.log(body);
        console.log(body.document_tone.tones[0].tone_name + ', Score: ' + body.document_tone.tones[0].score);
    }
    });

var mixedChart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Tone Score',
            data: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
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
            pointRadius: 5,
            // showLine: false
            }, {
            label: 'Target Approval Score',
            data: [0.4, 0.6, 0.5, 0.4, 0.3, 0.3, 0.6],
            type: 'line',
            fill: false, 
            pointRadius: 5,
            backgroundColor: 'rgb(54, 216, 36)',
            borderColor: 'rgb(54, 216, 36)',
            }, {
            label: 'Maximum Approval Score',
            data: [0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6],
            type: 'line',
            fill: false,
            pointRadius: 5,
            // showLine: false
            backgroundColor: 'rgb(244, 72, 66)',
            borderColor: 'rgb(244, 72, 66)'
            }],
        labels: ['Anger', 'Fear', 'Joy', 'Sadness', 'Analytical', 'Confident', 'Tentative']
    },
    options: {
        beginatZero: true, 
        yAxes: [{
            max: 1.0
        }]
        // scales: {

        // }
    }
});