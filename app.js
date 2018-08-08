(function() {
    var firebaseObject = localStorage.getItem('firebase-object');

    var firebaseConfig = JSON.parse(firebaseObject);

    firebase.initializeApp(firebaseConfig);
})();

var context = document.querySelector('.watson-chart').getContext('2d');
var watsonUrl = 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2018-06-11';
var submitButton = document.querySelector('.submit-button');
var approveButton = document.querySelector('.approve-button');

var setBenchmarkValues = function(minArray, targetArray, maxArray) {
    var sliders = document.querySelectorAll('.slider');
    for (var k = 0; k < 7; k++) {
        var handleValues = sliders[k].noUiSlider.get();
        for (var l = 0; l < handleValues.length; l++) {
            handleValues[l] = parseFloat(handleValues[l]);
        }
        minArray[k] = (handleValues[0]);
        targetArray[k] = (handleValues[1]);
        maxArray[k] = (handleValues[2]);
    }
};

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
    var minArray = [0, 0, 0, 0, 0, 0, 0];
    var targetArray = [0, 0, 0, 0, 0, 0, 0];
    var maxArray = [0, 0, 0, 0, 0, 0, 0];
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
                showLine: false,
                pointStyle: 'rect',
                borderWidth: 2.5
                }, {
                label: 'Target Approval Score',
                data: targetArray,
                type: 'line',
                fill: false, 
                backgroundColor: 'rgb(54, 216, 36)',
                borderColor: 'rgb(54, 216, 36)',
                showLine: false,
                pointStyle: 'rect', 
                borderWidth: 2.5
                }, {
                label: 'Maximum Approval Score',
                data: maxArray,
                type: 'line',
                fill: false,
                backgroundColor: 'rgb(244, 72, 66)',
                borderColor: 'rgb(244, 72, 66)',
                showLine: false,
                pointStyle: 'rect',
                borderWidth: 2.5
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
    var watsonUsername = localStorage.getItem('watson-username');
    var watsonPassword = localStorage.getItem('watson-password');
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
    var tweetsModal = document.querySelector('.tweets-modal');
    var modalBackdrop = document.querySelector('.modal-backdrop');
    var closeButton = document.querySelector('.close-button')      

    var database = firebase.database();
    var ref = database.ref('tweets');

    tweetsModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
    tweetsModal.classList.add('display-flex');
    modalBackdrop.classList.add('display-flex');
    var tweets = { tweet: text };
    ref.push(tweets);

    var closeModal = function () {
        tweetsModal.classList.add('hidden');
        modalBackdrop.classList.add('hidden');
        tweetsModal.classList.remove('display-flex');
        modalBackdrop.classList.remove('display-flex');
    };

    var clickOnBackdrop = function () {
        if (event.target === modalBackdrop) {
            closeModal();
        }
    };

    modalBackdrop.addEventListener('click', clickOnBackdrop);
    closeButton.addEventListener('click', closeModal);

    var clearModal = function (clearList) {
        while (clearList.hasChildNodes()) {
            clearList.removeChild(clearList.lastChild);
        }
    }

    var gotData = function (data) {       
        var tweets = data.val();
        var listOfTweets = document.querySelector(".tweet-list")
        var tweetArray = Object.keys(tweets);
        clearModal(listOfTweets);
        tweetArray.forEach(function (tweetID) {
            var tweet = tweets[tweetID]['tweet'];
            var tweetText = document.createElement('div');
            tweetText.textContent = tweet;
            tweetText.classList.add('tweet-div');
           
            var spacer = document.createElement('span');
            spacer.classList.add('spacer');

            var checkmark = document.createElement('p');
            checkmark.textContent = '\u2611';
            checkmark.classList.add('hidden', 'blue', 'dark-outline')
        
            var modalApprovalButton = document.createElement('button');
            modalApprovalButton.classList.add('pointer', 'modal-approval-button');
            modalApprovalButton.textContent = 'Approve';

            var listItemContents = document.createElement('div');
            listItemContents.classList.add('list-item-contents');

            var copyToClipboard = function () {
                var tweetInput = document.createElement('textarea');
                tweetInput.setAttribute('value', tweet);
                tweetInput.textContent = tweet;

                listItemContents.appendChild(tweetInput);

                var selection = document.getSelection();
                var range = document.createRange();
                range.selectNode(tweetInput);
                selection.removeAllRanges();
                selection.addRange(range);

                document.execCommand('copy');
                selection.removeAllRanges();

                tweetInput.parentNode.removeChild(tweetInput);
                alert('You have copied the tweet: ' + tweetInput.value);
            };

            var copyButton = document.createElement('button');
            copyButton.textContent = 'Copy';
            copyButton.classList.add('hidden', 'pointer', 'modal-approval-button');
            
            var trashIcon = document.createElement('img');
            trashIcon.setAttribute('src', 'trash-icon.png')
            trashIcon.classList.add('pointer');
            trashIcon.classList.add('trash-icon');
           
            listItemContents.appendChild(tweetText);
            listItemContents.appendChild(modalApprovalButton);
            listItemContents.appendChild(checkmark);
            listItemContents.appendChild(spacer);
            listItemContents.appendChild(copyButton);
            listItemContents.appendChild(trashIcon);

            var tweetLi = document.createElement('li');
            tweetLi.classList.add('tweet-li')
            tweetLi.appendChild(listItemContents)
            listOfTweets.appendChild(tweetLi);   

            trashIcon.addEventListener('click', function() {
                tweetLi.remove();
                ref.child(tweetID).remove();
            });

            modalApprovalButton.addEventListener('click', function () {
                tweetLi.classList.add('approved');
                modalApprovalButton.classList.add('hidden');
                setTimeout(function () {
                    checkmark.classList.remove('hidden');
                    copyButton.classList.remove('hidden');
                    copyButton.classList.add('display-flex');
                    }, 1000);
            
            copyButton.addEventListener('click', function () {
                copyToClipboard()
                tweetLi.remove();
                ref.child(tweetID).remove();
                });
            });
        });
    };  
    
    var errData = function (err) {
        console.log('Error');
        console.log(err);
    }
    
    ref.on('value', gotData, errData); 
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
    getWatsonData(data, toneChartObject, toneArray);
    var twitterText = document.querySelector('.tweet-submission');
    twitterText.textContent = textValue;
    $('.all-sliders').addClass('hidden');
}

var handleApprove = function(event) {
    event.preventDefault();
    var textValue = document.querySelector('.textarea').value;
    showTwitterText(textValue);
}

submitButton.addEventListener('click', handleSubmit);
approveButton.addEventListener('click', handleApprove);

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
            var handleValues = slider.noUiSlider.get();
            document.querySelector(sliderMin).textContent = "Min: " + handleValues[0];
            document.querySelector(sliderTarget).textContent = "Target: " + handleValues[1];
            document.querySelector(sliderMax).textContent = "Max: " + handleValues[2];
        });
    }

    for (var i = 0; i < 7; i++) {
        var currentSlider = sliders[i];
        createSlider(currentSlider);
        addOnUpdate(currentSlider);
    }
}

createSliders();