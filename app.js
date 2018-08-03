var watsonUrl = 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21';

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

    console.log(toneChartObject);


