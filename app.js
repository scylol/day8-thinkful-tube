const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
    let query = {
    part: "snippet",
    key: 'AIzaSyDD8n-uCr_ls7qk7aSqEFeSH7scMdZrr1k',
    q: searchTerm,

  }
  $.getJSON(YOUTUBE_BASE_URL, query, callback);
}


function displayYouTubeSearchData(data) {
  console.log(data);
  let resultElement = '';
  if (data.items) {
    data.items.forEach(function(item) {
     resultElement += `<li><img src='${item.snippet.thumbnails.medium.url}'/></li>`
    });
  }
  else {
    resultElement += '<p>No results</p>';
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