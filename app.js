const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";
let nextPageToken;
let prevPageToken;
let prevPageChecker;

function getDataFromApi(query, callback) {
    query.part = "snippet";
    query.key = "AIzaSyDD8n-uCr_ls7qk7aSqEFeSH7scMdZrr1k";
    query.type = "video";
    query.maxResults = 20;
 
 $.getJSON(YOUTUBE_BASE_URL, query, callback);
}

function displayYouTubeSearchData(data) {
  console.log(data);
  let resultElement = "";
  nextPageToken = data.nextPageToken;
  prevPageToken = data.prevPageToken;
  prevPageChecker = data.hasOwnProperty("prevPageToken");
  
  if(prevPageChecker === false) {
      $("#prev-btn").addClass("hidden");
    }
  
  if (data.items) {
    data.items.forEach(function(item) {
        resultElement += `<li><a href = "#${item.id.videoId}"><img class ="thumbnail-image" src="${item.snippet.thumbnails.medium.url}"/></a>
                          <a href = "#_" class="lightbox" id="${item.id.videoId}"><iframe width="640" height="480" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe></a>
                          <a href = "https://www.youtube.com/watch?v=${item.id.videoId}"><p class="title">${item.snippet.title}</p></a>
                          <a href = "https://www.youtube.com/channel/${item.snippet.channelId}"><p class="channel">Channel: ${item.snippet.channelTitle}</p></li>`;
                        });
  }
  else {
    resultElement+= `<p>No Results</p>`;
  }
    $('.js-search-results ul').html(resultElement);
  }

$(function(){
  
  $(".js-search-form").submit(function(e) {
    e.preventDefault();
    let query = $(this).find(".js-query").val();
    getDataFromApi({q: query}, displayYouTubeSearchData);
    $("#next-btn").removeClass("hidden");
   });


  $(".js-search-results").on("click", "#next-btn", function(){
    let query = $(".js-query").val();
    getDataFromApi({q: query, pageToken: nextPageToken}, displayYouTubeSearchData);
    $("#prev-btn").removeClass("hidden");
  });

  $(".js-search-results").on("click", "#prev-btn", function(){
    let query = $('.js-query').val();
    getDataFromApi({q: query, pageToken: prevPageToken}, displayYouTubeSearchData);
  });
  
});

