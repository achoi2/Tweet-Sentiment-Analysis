var watsonUrl = 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21';

var data = {};
data.text = "I hate you.";

var toneChartObject = {anger: 0,
                        fear: 0,
                        joy: 0,
                        sadness: 0,
                        analytical: 0,
                        confident: 0,
                        tentative: 0
                        };

var toneArray = ['anger', 'fear', 'joy', 'sadness', 'analytical', 'confident', 'tentative'];

$.ajax(
    { url: watsonUrl, 
    data: data, 
    headers: { 
        "Authorization": "Basic " + btoa(watsonUsername + ":" + watsonPassword) },
    success: function(watsonData) {
        var toneObject = watsonData.document_tone.tones 
        for (var i = 0; i < toneObject.length; i++) {
            watsonToneId = toneObject[i].tone_id
            for (var j = 0; j < toneArray.length; j++) {
                toneName = toneArray[j]
                if (watsonToneId === toneName) {
                    toneChartObject[toneName] = toneObject[i].score;
                }
            }  
        }      
    }
    });


