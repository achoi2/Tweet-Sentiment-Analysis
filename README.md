# Tonely - Tweet Sentiment Analysis
===================================
Tonely is a web application designed to analyze tone percentages of draft tweets so that companies can establish a consistent tone amongst all customer service representatives. It also provides an approval service so that tweets may not be sumitted to Twitter unless they have been approved by a second member of the team.

## Who is our user?
===================
Brand support teams who want to conscientiously engage with customers through Twitter. 

### Brand Managers
------------------
Brand managers can establish benchmark tone ranges that all draft tweets must fall within, so that customer service members know the requirements for each tweet. Brand managers can also ensure that 

### Customer Support Representatives
------------------------------------
Customer Support Representatives can input draft tweets to be analyzed through IBM Watson's Tone Analyzer to see if tones fall within the benchmark ranges established by the brand managers.

## What is their problem?
=========================
Without Tonely, customer support representatives are able to tweet poorly worded posts and responses that may cause backlash. With Tonely, there are built in checks to ensure these problems do not arise, because tweets must fall within the benchmark ranges or be approved by a second party. 

## IBM Watson
==============

### Tone Analysis
-----------------
IBM Watson's built in Tone Analyzer delivers a tone score ranging from 0-1 of each of the following tones:
⋅⋅* Anger
⋅⋅* Fear
⋅⋅* Joy
⋅⋅* Sadness
⋅⋅* Analytical
⋅⋅* Confident
⋅⋅* Tentative

The higher the score, the stronger the tone is preceived.

### Issues We Faced
-------------------
The biggest hurdle we faced was getting authorization to retrieve data from the IBM Watson server. Since our request was coming directly from a script file, the browser would not authorize us to utilize the data from the server. 

To make the request to the server, we had to use the following header on our ajax request:

`headers: {
    "Authorization": "Basic " + btoa(watsonUsername + ":" + watsonPassword)
}`

However, even with authorization from IBM Watson, Google Chrome still would not allow access to the requested data. In order to get around this, an Google Chrome Extension, "Allow-Control-Allow-Origin" that allowed us to see the data we received from our ajax request.

## Styling
==========
The overall styling for our site had a common theme: 
⋅⋅* Clean
⋅⋅* Mobile responsive
⋅⋅* Intuitive

We utilized varying opacities of the same tone to create a harmonious appearance, seamlessly blending the various components of the site for a more pleasant user experience. By using multiple, reusable classes on various elements in our HTML, we were able to efficiently and clearly modify our styles. 

### Issues We Faced
-------------------

#### Loading Animation
----------------------
Getting the loading animation visuals to stagger themselves as they appeared on the screen was a challenge. Initially, all letters appeared on the screen after the same delay. In order to fix that, we had to scale the setTimeout function by a set amount of time withing our loop, seen below:

`var doSetTimeout = function (j) {
    setTimeout(function () {
        var letter = letters[j];
        letter.classList.remove('loading-letter')
        letter.classList.add('show');
    }, i * 400);`

#### Mobile Responsivity 
------------------------
By using media queries, we were able to scale the main div and our graph of our site to be responsive on multiple screen sizes.  We kept our media queries as simple as possible, adding to a seamless look as users shifted sizes. 

`@media (min-width: 768px) {
    .graph {
    width: 30em;
    }
    .header {
        min-width: 30em;
    }
}

@media (min-width: 1200px) {
    .graph {
        width: 50em;
    }
    .header {
        min-width: 50em;
    }
}`

#### Modal Styling
------------------
The biggest hurdle facing the styling of the modal was positioning, and getting the layering effect, making the modal appear to pop on the screen. To do this we used the CSS position functionality to position the parent, modal backdrop container on top of the entire body of the page, and Flexbox to center it's child containers on the center of the screen. 

##### Modal Functionality
-------------------------
The copy-paste feature was by far the biggest challenge we faced when creating the modal. The built in copy command in Javascript requires the text to be copied be put inside an input or textarea tag. However, this tag did not align with our vision for the modal, as we did not want the text to be editable after approval. Additionally, Google Chrome's built in secruity features do not allow text to be automatically copied from a hidden element. 

That led us to, on clicking of the copy bottom, create an input box, fill it with the desired text, copy that text, and the delete the input box. This occurs so fast that it is essentially invisible to the user, but still provides the functionality we needed to allow for easy tweeting.

The code can be seen below:

`var copyToClipboard = function () {
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
};`

## Hannah talks about chart.js and noUISlider here

## Andrew talks about Firebase here