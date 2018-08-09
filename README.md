# Tonely - Tweet Sentiment Analysis
https://achoi2.github.io/Tweet-Sentiment-Analysis/

## Who is our user?

## What is their problem?

## What does our app do to solve that problem for the user?

## Sara talks about styling and WatsonIBM here

## Libraries
============
In order to effectively display the data we received from IBM Watson's tone analyzer, we needed to utilize some libraries. One of the hardest and most frustrating parts of this project was in simply just deciding on which libraries to use. There are so many available options, and the challenge was to pick a library that could do what you needed it to, while also being easy to integrate into the project and unlikely to interfere with any other functionality. The two main libraries we landed on were Chart.js and noUiSlider.

### noUiSlider
--------------
Before we displayed the data we got back from IBM Watson, we wanted to give the user a chance to set boundaries in order to capture the appropriate tone in their drafted tweet. The boundaries would include a minimum, target, and maximum value for each of the seven tones. In order to avoid crowding the screen with a bunch of input boxes, or shuffling the user through each tone individually, we needed a way to display all seven tone ranges simultaneously. Range sliders ended up being the best option - and we were able to use the noUiSlider library to quickly style them and allow for three handles. The trickiest part of this process was testing out two other libraries prior to settling on noUiSlider, only to realize that I was having the same issues that countless other users had experienced and the github repos were no longer being updated or maintained for those libraries. 

### Chart.js
------------
Chart.js was utilized in this project to display the data from IBM Watson on a graph that also showed the benchmarks set by the user. The graph creation was a relatively smooth process, and we did not have to tweak much in regards to the styling or the responsiveness. The biggest lesson we learned with this library was to make sure to fully read through the documentaiton and understand the limitations of the code before trying to create something. We had a vision in mind, but after many attempts to make it happen and a thorough review of the library - we realized what we wanted wasn't exactly an option with Chart.js. We went back to the drawing board armed with a better understanding of what we could accomplish. The final product had the exact functionality we wanted, but with some slight style adjustments that matched the newly adjusted goal.

#Firebase
We needed a way to store tweets so that others can view what has been submitted. For this we decided to use the firebase API.The firebase API will easily allow our users to store and share data in real time. 

When the user is satisfied with the analysis of their tweet, they can then store their tweet. By pressing the “Tweet Approved” button, the user’s tweet gets sent to firebase. 


![](readme_pic/firebase_one.png)


Once the button has been pressed, a modal will pop up. Next, the user will get back the tweets that have been sent to firebase, and can see it in the modal. By showing the tweets that have been submitted, someone else can view the tweets and review it. 


![](readme_pic/firebase_two.png)


One of the challenges that we faced with firebase was when we pressed the "Submit for Analysis" button. When pressed, a tweet would get entered into firebase. We only wanted the tweet to get entered if the "Tweet Approved" button was clicked. We were able to fix this problem by refactoring our code and making use of more functions.