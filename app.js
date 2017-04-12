const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback) {
    let query = {
    part: "snippet",
    key: "AIzaSyDD8n-uCr_ls7qk7aSqEFeSH7scMdZrr1k",
    q: searchTerm,
    type: "video"
  }
  $.getJSON(YOUTUBE_BASE_URL, query, callback);
}


function displayYouTubeSearchData(data) {
  console.log(data);
  let resultElement = '';
  if (data.items) {
    data.items.forEach(function(item) {
     resultElement += `<li><a href = "https://www.youtube.com/watch?v=${item.id.videoId}"><img src='${item.snippet.thumbnails.medium.url}'/></a>`+
                        `<a href = "https://www.youtube.com/watch?v=${item.id.videoId}"><p>${item.snippet.title}</p></a>` +
                        `<a href = "https://www.youtube.com/channel/${item.snippet.channelId}"><p>Channel:${item.snippet.channelTitle}</p></li>`;
    });
  }
  else {
    resultElement+= `<p>No Results</p>`
  }

  $('.js-search-results ul').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    let query = $(this).find('.js-query').val();
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(function(){watchSubmit();});