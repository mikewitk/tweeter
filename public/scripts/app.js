/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log("App.js is ready to use!")


  // Page start with "Compose Tweet" hidden
  $('.new-tweet').hide();

  //Calculate the time difference for Time Stamp at bottom left part of the tweet
  // this function is called on "createTweetElement" function
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


  // Function that iterates through the array of tweets and post them on main page
  function renderTweets(tweetArr) {
    tweetArr.forEach ( (tweetObj) => {

      $('#tweets-Container').prepend(createTweetElement(tweetObj))

    } )
  }



  //Function to assemble the HTML element to be posted on main page
  function createTweetElement (tweetData) {

    // Storing each tweet information to a variable
    const tweetName = tweetData.user.name;
    const tweetHandle = tweetData.user.handle;
    const tweetContent = tweetData.content.text;
    const tweetCreation = timeDiff(Date.now(),tweetData.created_at);
    const tweetImgSml = tweetData.user.avatars.small;

    // Assembling each stored information with the correct HTML tag
    const $createImg = $('<img>').addClass("tw-header-image").attr("src", tweetImgSml);
    const $createName = $('<div>').addClass("tw-header-title").text(tweetName);
    const $createHandle = $('<div>').addClass("tw-header-tag").text(tweetHandle);
    const $createContent = $('<div>').addClass('containerTw-body').text(tweetContent);
    const $createCreation = $('<footer>').addClass('containerTw-footer').text(tweetCreation, " days ago");
    const $createFlag = $('<i>').addClass('fab fa-canadian-maple-leaf');
    const $createRetweet = $('<i>').addClass('fas fa-clone');
    const $createLove = $('<i>').addClass('fab fa-gratipay');


    // Assembling the final article element which will be returned by the function
    const $tweet = $('<article class="containerTw">').append($createImg)
                                                    .append($createName)
                                                    .append($createHandle)
                                                    .append($createContent)
                                                    .append($createCreation)
                                                    .append($createLove)
                                                    .append($createRetweet)
                                                    .append($createFlag);

   return $tweet

  }

// SUBMIT button
  $( function() {
    const $button = $("#tweetAway");

    // When submit button is clicked a sequence of checks happen
    $button.on('click', function (event) {
      event.preventDefault();

      // If the tweet being submitted have no characters an error message will be displayed
      if ( $(".tweetArea").val() === "" ) {
        $(".error").slideDown("slow");
          $('.error').text("If you are tweeting you gotta say something. Open your heart! (but not too much)");

      // If the tweet being submitted have more than 140 characters an error message will be displayed
      } else if ( $(".tweetArea").val().length > 140 ) {
        $(".error").slideDown("slow");
          $('.error').text("Now you opened your heart too much. No one likes to read long paragraphs. Cut some characters!")

      // If the input respect all requirements, the tweet will be submitted.
      // In case a error message is shown, it will retract before the new tweet is submitted.
      } else {
        $(".error").slideUp("fast");
        $.ajax({
          url: "/tweets",
          type: "post",
          data: $(this).parent().serialize(),
          success: function(dataS, status) {

            // After the submission, the page will be load the new tweet
            // The text input deleted
            // And the character count restored to 140
            loadTweets();
            $(".tweetArea").val("");
            $(".counter").text("140");
          },
          error: function (data, err) {
            console.log("Error data: ", data);
            console.log("Error error: ", err);
          }
        })
      }
    }
    )
  })



  // Function that loads pre-existing and recent submitted tweets
  function loadTweets () {
    $.ajax({
      type: 'GET',
      url: `/tweets`,
      dataType: 'JSON'
    })

    .done( (data) => {
      renderTweets(data);
    })
    .fail( (XHR) => {
        console.log(XHR)
    })
  }

  // When the page is loaded for the first time, all tweets on the DB are being loaded
  loadTweets();

  // Slide function for Compose button

  $(".HeadButt").click(function(){
    $(".new-tweet").slideToggle("slow");

    $('.tweetArea').focus();
  });


});