$(document).ready(() => {
  $("#searchForm").on('submit', (e) => {
    e.preventDefault();
    let searchText = $("#searchText").val();
    getMovies(searchText);
  });
});

function getMovies(searchText){

  var x =1; //console.log(searchTest);
  axios.get("https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=" + searchText)
    .then(function (response) {
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        x +=1;
        if (x<12)
        {
        output+=`
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
              <h5>${movie.title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `};
      });
       output+= `
      <div class="loadmore">

        <hr>

        <a onclick=loadmore('${searchText}') href="index.html" class="btn btn-primary">Show More</a>
      </div>`;



      $('#movies').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function loadmore(searchText){
      //axios.get("http://www.omdbapi.com/?i="+movieId+"&&apikey=46779266&")
  axios.get("https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=" + searchText)
    .then(function (response) {
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output+=`
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
              <h5>${movie.title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });
      $('#movies').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}


function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
      //axios.get("http://www.omdbapi.com/?i="+movieId+"&&apikey=46779266&")
  axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=98325a9d3ed3ec225e41ccc4d360c817")
    .then(function (response) {
    let movie = response.data;
    console.log(movie);
    let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} min.</li>
              <li class="list-group-item"><strong>Revenue:</strong> $${movie.revenue}.</li>

            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">

            <hr>

            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>



        </div>
    `;
    $('#movie').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });

}
