let appState = {
	videos: [];
};



//functions

function getDataFromApi(searchTerm, callback) {
    let query = {
    part: "snippet",
    key: 'AIzaSyDD8n-uCr_ls7qk7aSqEFeSH7scMdZrr1k',
    q: searchTerm,

  }
  $.getJSON(YOUTUBE_BASE_URL, query, callback);
}

function getVideos(state, video){
state.videos.push(video);
}

getDataFrom