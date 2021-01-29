const renderTweets = function(data) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  // create the HTML element

  $('#tweets-container').empty();

  for (let tweetData of data) {

    const newSingleTweet = createTweetElement(tweetData);

    // append each HTML element to the article container

    $('#tweets-container').prepend(newSingleTweet);

  }
};

const createTweetElement = function(tweet) {
  
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const htmlString = ` 
  
 <article class="tweetMods">
    <header class="tweet-info">
    <div class="flex-mods">
    <h1>
    <img class="image-placeholder" src=${tweet.user.avatars}>${tweet.user.name}</h1>
    <h2 class="hide">${tweet.user.handle}</h2>
    </div>
    </header>

    <p class="flex-mods">${escape(tweet.content.text)}</p>
    <p class="content-mods"></p>
  
    <footer>
      <div class="flex-mods">
      <p>${moment(tweet.created_at).fromNow()}</p>
      <p>
        <i class="fa fa-flag"></i>
        <i class="fa fa-retweet"></i>
        <i class="fa fa-heart"></i>
      </p>
    </div>
    </footer>
 </article>
 `;
  return htmlString;
};

// <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js">${moment(timestamp).fromNow()}</script>
// <p>${tweet.created_at}</p>

// const $tweet = createTweetElement(data);
// $('#tweets-container').append($tweet);

$(document).ready(function() {

  const loadTweets = function() {

    $.ajax({
      url: `http://localhost:8080/tweets`,
      method: 'GET',
    })
      .done((tweets) => renderTweets(tweets))
      .fail(() => console.log('Error'))
      .always(() => console.log('Request Completed'));

  };
  

  $('#load-new-tweet').on('submit', function(event) {


    event.preventDefault();


    const lengthCheck = $('#tweet-text').val().length;
    
    if (lengthCheck > 140) {
      // alert user form too long
      $('.error-message').html(`<p>You have more than 140 characters!</p>`);
      $('.error-message').slideDown('slow');
      return;

    }
  
    if (lengthCheck === 0) {
      // alert user to put text in form before submission
      $('.error-message').html(`<p>Please enter text!</p>`);
      $('.error-message').slideDown('slow');
      return;
    }
    
    
    // extract the info from the form => serialize

    const formContent = $(this).serialize();

    // console.log(formContent);

    $.ajax({
      url: `http://localhost:8080/tweets`,
      method: 'POST',
      data: formContent,
    })
      .done(() => loadTweets())
      .fail(() => console.log('Error'))
      .always(() => console.log('Request Completed'));

      
    $('#tweet-text').val('');
    $('.counter').val(140);
    $('.error-message').hide();
  });

  loadTweets();

});

