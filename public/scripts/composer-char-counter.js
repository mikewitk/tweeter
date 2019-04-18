$(document).ready(function() {
  console.log("Composer Char Counter ready to use!")

  let text = 0;
  let textLength = 0;

  $(".tweetArea").on('input', function(event) {
    text = $(this).val();

    textLength = 140 - text.length;
    $('.counter').text(textLength);
    if (textLength < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
  });


});