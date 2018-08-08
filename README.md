# Tonely - Tweet Sentiment Analysis

## Who is our user?

## What is their problem?

## What does our app do to solve that problem for the user?

## Sara talks about styling and WatsonIBM here

## Hannah talks about chart.js and noUISlider here

##Firebase
We needed a way to store tweets so that others can view what has been submitted. We decided to use the firebase API. The firebase API will easily allow our users to store and share data in real time. 

When the user is satisfied with the analysis of their tweet, they can then store their tweet. By pressing the “Tweet Approved” button, the user’s tweet gets sent to firebase. 


<img src="readme_pic/firebase_one.png">


Once the button has been pressed, a modal will pop up. Next, the user will get back the tweets that have been sent to firebase, and can see it in the modal. By showing the tweets that have been submitted, someone else can view the tweets and review it. 


<img src="readme_pic/firebase_two.png">


One of the challenges that we faced with firebase was when we pressed the "Submit for Analysis" button. When pressed, a tweet would get entered into firebase. We only wanted the tweet to get entered if the "Tweet Approved" button was clicked. We were able to fix this problem by refactoring our code and making use of more functions.