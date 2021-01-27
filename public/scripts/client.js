const renderTweets = function (data) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  // create the HTML element
  for (let tweetData of data) {
    const newSingleTweet = createTweetElement(tweetData);

    // append each HTML element to the article container

    $('#tweets-container').prepend(newSingleTweet);

  }
}

const createTweetElement = function (tweet) {


  const htmlString = `
 <article class="tweetMods">
    <header class="tweet-info">
    <div class="flex-mods">
    <h1>
    <img class="image-placeholder" src="https://i.imgur.com/73hZDYK.png">${tweet.user.name}</h1>
    <h2 class="hide">${tweet.user.handle}</h2>
    </div>
    </header>

    <p class="flex-mods">${tweet.content.text}</p>
    <p class="content-mods"></p>
  
    <footer>
      <div class="flex-mods">
      <p>${tweet.created_at}</p>
      <p>
        <i class="fa fa-flag"></i>
        <i class="fa fa-retweet"></i>
        <i class="fa fa-heart"></i>
      </p>
    </div>
    </footer>
 </article>
 `
  return htmlString;
}


// const $tweet = createTweetElement(data);
// $('#tweets-container').append($tweet);


$(document).ready(function () {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
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
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  renderTweets(data);

});