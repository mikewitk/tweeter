/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log("App.js is ready to use!")


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

      $('#tweets-Container').prepend(createTweetElement(tweetObj))

    } )

  }



  //Function to create tweet based on DB
  function createTweetElement (tweetData) {

    console.log(tweetData)
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
// renderTweets(data);

// Dealing with the SUBMIT button
  $( function() {
    const $button = $("#tweetAway");


    $button.on('click', function (event) {
      event.preventDefault();
      console.log('Button Click, performin ajax call');
      var comment = $(".tweetArea").val();


      console.log("This: ",$(".tweetArea").val().length );

      if ( $(".tweetArea").val() === "" ) {
        $(".error").slideDown("slow");
          $('.error').text("If you are tweeting you gotta say something. Open your heart! (but not too much)");

      } else if ( $(".tweetArea").val().length > 140 ) {
        $(".error").slideDown("slow");
          $('.error').text("Now you opened your heart too much. No one like to read long paragraphs. Cut some characters!")

      } else {
        $(".error").slideUp("fast");
        $.ajax({
          url: "/tweets",
          // dataType: "json",
          type: "post",
          data: $(this).parent().serialize(),
          success: function(dataS, status) {
            console.log("Success status: ", status);
            loadTweets();
            $(".tweetArea").val("");

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



  // GET request for submitted tweets
  function loadTweets () {
    $.ajax({
      type: 'GET',
      url: `/tweets`,
      dataType: 'JSON'
    })

    .done( (data) => {
      // console.log("GET Done data: ", data);
      renderTweets(data);
    })
    .fail( (XHR) => {
        console.log(XHR)
    })
  }

  loadTweets();

  // Slide function for Compose button

  $(".HeadButt").click(function(){
    $(".new-tweet").slideToggle("slow");

    $('.tweetArea').focus();
  });


});