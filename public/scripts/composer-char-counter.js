$(document).ready(function() {
  $('textarea').on('input', function() {
   
    const currentLength = $(this).val().length;
    const charCount = 140 - currentLength;
    const counterValue = $(this).parent().siblings().children(".counter");
    
    counterValue.html(charCount);

    if (charCount < 0) {
      counterValue.addClass("modifyRed");
    } else if (charCount >= 0) {
      counterValue.removeClass("modifyRed");
    }
  });
});


