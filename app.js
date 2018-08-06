var watsonUrl = 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21';
var submitButton = document.querySelector('.submit-button');
var approveButton = document.querySelector('.approve-button');

var setBenchmarkValues = function(minArray, targetArray, maxArray) {
    var sliders = document.querySelectorAll('.slider');
    for (var k = 0; k < 7; k++) {
        var snapValues = sliders[k].noUiSlider.get();
        for (var l = 0; l < snapValues.length; l++) {
            snapValues[l] = parseFloat(snapValues[l]);
        }
        minArray.push(snapValues[0]);
        targetArray.push(snapValues[1]);
        maxArray.push(snapValues[2]);
    }
}

var loadingAnimation = function () {
    var loadingText = document.querySelector('.loading-text');
    var letters = document.querySelectorAll('.loading-letter');
    var doSetTimeout = function (j) {
        setTimeout(function () {
            var letter = letters[j];
            letter.classList.remove('loading-letter')
            letter.classList.add('show');
        }, i * 400);
    }
    for (i = 0; i < letters.length; i++) {
        doSetTimeout(i);
    }
    setTimeout(function () {
        loadingText.classList.add('hidden');
    }, 3500);
}

var newChart = function (toneChartObject, toneArray) {
    var context = document.querySelector('.watson-chart').getContext('2d');
    var minArray = [];
    var targetArray = [];
    var maxArray = [];
    setBenchmarkValues(minArray, targetArray, maxArray);
    var toneValuesArray = Object.values(toneChartObject);
        new Chart(context, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Tone Score',
                data: toneValuesArray,
                backgroundColor: 'rgb(65, 193, 244, 0.5)',
                borderColor: 'rgb(65, 193, 244, 0.5)'
                }, {
                label: 'Minimum Approval Score',
                data: minArray,
                // Changes this dataset to become a line
                type: 'line',
                fill: false,
                backgroundColor: 'rgb(244, 72, 66)',
                borderColor: 'rgb(244, 72, 66)',
                showLine: false
                }, {
                label: 'Target Approval Score',
                data: targetArray,
                type: 'line',
                fill: false, 
                backgroundColor: 'rgb(54, 216, 36)',
                borderColor: 'rgb(54, 216, 36)',
                showLine: false,
                }, {
                label: 'Maximum Approval Score',
                data: maxArray,
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
};

var getWatsonData = function (data, toneChartObject, toneArray) {
    loadingAnimation ();
    return $.ajax(
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
            setTimeout(function() {newChart(toneChartObject, toneArray)}, 3300);
        }
    });     
} 

var showTwitterText = function (text) {
    var approveButton = document.querySelector('.approve-button');
    var twitterText = document.querySelector('.tweet-submission');
    twitterText.textContent = text
    approveButton.addEventListener('click', function (e) {
        e.preventDefault()
        console.log(text)
    });
};

var handleSubmit = function () {
    var toneChartObject = {Analytical: 0,
        Anger: 0,
        Confident: 0,
        Fear: 0,
        Joy: 0,
        Sadness: 0,
        Tentative: 0
        };
    
    var toneArray = ['Analytical', 'Anger', 'Confident', 'Fear', 'Joy', 'Sadness', 'Tentative'];
    event.preventDefault();
    var textValue = document.querySelector('.textarea').value;
    var data = {"text": textValue};
    showTwitterText(textValue)
    getWatsonData(data, toneChartObject, toneArray);
}


submitButton.addEventListener('click', handleSubmit);

var createSliders = function() {
    var sliders = document.querySelectorAll('.slider');

    var createSlider = function createSlider(slider) {
        noUiSlider.create(slider, {
            start: [ 0.1, 0.5, 0.9 ],
            connect: [false, true, true, false],
            step: 0.1,
            range: {
                'min': [  0 ],
                'max': [ 1 ]
            }
        });
    }

    var addOnUpdate = function addOnUpdate(slider) {
        slider.noUiSlider.on('update', function() {
            var sliderName = slider.getAttribute('class');
            sliderName = sliderName.split(" ");
            var sliderMin = "." + sliderName[0] + "-min";
            var sliderTarget = "." + sliderName[0] + "-target";
            var sliderMax = "." + sliderName[0] + "-max"
            var snapValues = slider.noUiSlider.get();
            document.querySelector(sliderMin).textContent = "Min: " + snapValues[0];
            document.querySelector(sliderTarget).textContent = "Target: " + snapValues[1];
            document.querySelector(sliderMax).textContent = "Max: " + snapValues[2];
        });
    }

    for (var i = 0; i < 7; i++) {
        var currentSlider = sliders[i];
        createSlider(currentSlider);
        addOnUpdate(currentSlider);
    }
}

createSliders();
