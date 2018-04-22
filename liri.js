require("dotenv").config();

const argArr = process.argv;
const operation = argArr[2];
let searchTitle = "";
for (let i = 3; i < argArr.length; i++) {
  searchTitle += argArr[i];
}

// access keys in keys.js.
const keysFile = require("./keys.js");

// access the Twitter, Spotify, and OMDB APIs.
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const request = require("request");

// NPM module used to read the random.txt file.
const fs = require("fs");

//Object of possible operations entered through command line
const operations = {
  "my-tweets"() {
    const client = new Twitter(keysFile.twitter);

    const twitterParams = { q: "LiriTestAcct13", count: 20 };

    client.get("search/tweets", twitterParams, function(
      error,
      tweets,
      response
    ) {
      if (!error) {
        for (let i = 0; i < tweets.statuses.length; i++) {
          const tweetText = tweets.statuses[i].text;
          const createdDate = tweets.statuses[i].created_at;
          console.log(tweetText, "twitted on:", createdDate);
        }
      } else {
        console.log(error);
      }
    });
  },
  "spotify-this-song"() {
    let songTitle = 'I want it that way'
    if (searchTitle != ""){
      songTitle = searchTitle;
    }
    const spotify = new Spotify(keysFile.spotify)
    spotify.search({type: 'track', query: songTitle, limit: 1}, function(error, data){
      if(error){
        console.log(error);
      } else {
        console.log('Artist(s): ' + data.tracks.items[0].album.artists[0].name);
        console.log('Title: ' + data.tracks.items[0].name);
        console.log('Preview: ' + data.tracks.items[0].preview_url);
        console.log('Album: ' + data.tracks.items[0].album.name);

        // console.log(data.tracks.items.album.artists);
        // console.log(data.tracks.items.album.name);
      }
    });
  },
  "movie-this"() {
    var movieTitle = "Mr. Nobody";
    if (searchTitle != "") {
      movieTitle = searchTitle;
    }
    request(
      "http://www.omdbapi.com/?t=" +
        movieTitle +
        "&y=&plot=short&apikey=trilogy",
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          const movieInfo = JSON.parse(body);
          console.log("The movie's title is: " + movieInfo.Title);
          console.log("The movie's release year is: " + movieInfo.Year);
          console.log("The movie's IMDB rating is: " + movieInfo.imdbRating);
          console.log(
            "The movie's Rotten Tomatoe's rating is: " +
              movieInfo.RottenTomatoes
          );
          console.log("The movie was produced in: " + movieInfo.Country);
          console.log("The movie's language is: " + movieInfo.Language);
          console.log("The movie's plot summary is: " + movieInfo.Plot);
          console.log("The movie's actors are: " + movieInfo.Actors);
        }
      }
    );
  },
  "do-what-it-says"() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
      if (!error) {
        const args = data.split(',');
        operations[args[0]](args[1]);   
      }
    })
  }
};

operations[operation]();
