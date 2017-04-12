const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";
let nextPageToken;

// getDataFromApi({q: "cats"}, callback)
// getDataFromApi({q: "cats", pageToken: nextPageToken}, callback)

function getDataFromApi(searchTerm, callback) {

    let query = {
    part: "snippet",
    key: "AIzaSyDD8n-uCr_ls7qk7aSqEFeSH7scMdZrr1k",
    q: searchTerm,
    type: "video"
  }
  $.getJSON(YOUTUBE_BASE_URL, query, callback);
}

function getNext(searchTerm, callback) {
    let query = {
    pageToken:nextPageToken,
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
  nextPageToken = data.nextPageToken;

  
  if (data.items) {
    data.items.forEach(function(item) {
      
     // resultElement += `<li><a href = "https://www.youtube.com/watch?v=${item.id.videoId}"><img src='${item.snippet.thumbnails.medium.url}'/></a>`+
     //                    `<a href = "https://www.youtube.com/watch?v=${item.id.videoId}"><p>${item.snippet.title}</p></a>` +
     //                    `<a href = "https://www.youtube.com/channel/${item.snippet.channelId}"><p>Channel:${item.snippet.channelTitle}</p></li>`;
        resultElement += `<li><a href = "#${item.id.videoId}"><img src="${item.snippet.thumbnails.medium.url}"/></a>
                          <a href = "#_" class="lightbox" id="${item.id.videoId}"><iframe width="640" height="480" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe></a>`+
                           `<a href = "https://www.youtube.com/channel/${item.snippet.channelId}"><p>Channel:${item.snippet.channelTitle}</p></li>`;

                          

    });
  }
  else {
    resultElement+= `<p>No Results</p>`
  }

  $('.js-search-results ul').html(resultElement);


}

$(function(){
  
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    let query = $(this).find('.js-query').val();
    getDataFromApi(query, displayYouTubeSearchData);
  });


  $('#next-btn').on('click',function(){
    let query = $('.js-query').val();
    console.log(query);
    getNext(query, displayYouTubeSearchData);
  });
    

});

