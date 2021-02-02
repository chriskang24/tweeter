// Add each HTML element to the top of the article container:
const renderTweets = function(data) {
  
  $('#tweets-container').empty();

  for (let tweetData of data) {
    const newSingleTweet = createTweetElement(tweetData);
    $('#tweets-container').prepend(newSingleTweet);
  }
};

// Function to stop Cross-site Scripting:
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Create new user message as an object stored in HTML format:
const createTweetElement = function(tweet) {
  
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


// Ajax Requests to Load once form is ready:
$(document).ready(function() {

  // Load all tweet messages for user once form is ready:
  const loadTweets = function() {
    $.ajax({
      url: `http://localhost:8080/tweets`,
      method: 'GET',
    })
      .done((tweets) => renderTweets(tweets))
      .fail(() => console.log('Error'))
      .always(() => console.log('Request Completed'));
  };
  

  // Error Handling for User Form:
  $('#load-new-tweet').submit(function(event) {

    event.preventDefault();

    const lengthCheck = $('#tweet-text').val().length;
    
    if (lengthCheck > 140) {
      $('.error-message').html(`<p>You have more than 140 characters!</p>`);
      $('.error-message').slideDown('slow');
      return;
    }
  
    if (lengthCheck === 0) {
      $('.error-message').html(`<p>Please enter text!</p>`);
      $('.error-message').slideDown('slow');
      return;
    }
  
    const formContent = $(this).serialize();

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

