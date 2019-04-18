/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log("App.js is ready to use!")

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];



  //Calculate the time difference
  function timeDiff(time1, time2) {

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    let diff = time1 - time2;

    if (diff < msPerMinute) {
      return Math.round(diff/1000) + ' seconds ago';
    } else if (diff < msPerHour) {
      return Math.round(diff/msPerMinute) + ' minutes ago';
    } else if (diff < msPerDay ) {
      return Math.round(diff/msPerHour ) + ' hours ago';
    } else if (diff < msPerMonth) {
      return Math.round(diff/msPerDay) + ' days ago';
    } else if (diff < msPerYear) {
      return Math.round(diff/msPerMonth) + ' months ago';
    } else {
      return Math.round(diff/msPerYear ) + ' years ago';
    }
  }

  // Function to iterate through the array of objects
  function renderTweets(tweetArr) {

    tweetArr.forEach ( (tweetObj) => {

      $('#tweets-Container').append(createTweetElement(tweetObj))

    } )

  }



  //Function to create tweet based on DB
  function createTweetElement (tweetData) {

    // Gathering information
    const tweetName = tweetData.user.name;
    const tweetHandle = tweetData.user.handle;
    const tweetContent = tweetData.content.text;
    const tweetCreation = timeDiff(Date.now(),tweetData.created_at);
    const tweetImgSml = tweetData.user.avatars.small;

    // Assembling parts of the Article
    const $createImg = $('<img>').addClass("tw-header-image").attr("src", tweetImgSml);
    const $createName = $('<div>').addClass("tw-header-title").text(tweetName);
    const $createHandle = $('<div>').addClass("tw-header-tag").text(tweetHandle);
    const $createContent = $('<div>').addClass('containerTw-body').text(tweetContent);
    const $createCreation = $('<footer>').addClass('containerTw-footer').text(tweetCreation, " days ago");

    // Assembling the final element
    const $tweet = $('<article class="containerTw">').append($createImg)
                                                    .append($createName)
                                                    .append($createHandle)
                                                    .append($createContent)
                                                    .append($createCreation);

   return $tweet

  }

// Renders tweets on the page
renderTweets(data);

// Dealing with the SUBMIT button
  $( function() {
    const $button = $("#tweetAway");
    $button.on('click', function (event) {
      event.preventDefault();
      console.log('Button Click, performin ajax call');
      $.ajax({
        url: "/tweets",
        dataType: "json",
        type: "post",
        data: $(this).parent().serialize()
        success:
      })
    })
  })

});