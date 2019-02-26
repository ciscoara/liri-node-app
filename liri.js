
// * spotify-this-song
// * movie-this
// * concert-this

//these add other programs to this one
require("dotenv").config();
let keys = require("./keys.js");
let axios = require("axios");
let fs = require('fs'); //file system
let Spotify = require('node-spotify-api');



//input
let request = require('request');
var inquirer = require('inquirer');
var queryUrl = "https://rest.bandsintown.com/artists/" + inquirer.answers + "/events?app_id=codingbootcamp";

let space = "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
let header = "================= Extraordinary Liri found this ...==================";


// Function that writes all the data from output to the logfile
function writeToLog(data) {
    fs.appendFile("log.txt", '\r\n\r\n', function (err) {
        if (err) {
            return console.log(err);
        }
    });

    fs.appendFile("log.txt", (data), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(space + "log.txt was updated!");
    });
}

// =================================================================
// Spotify function, Spotify api
function getMeSpotify(songName) {
    let spotify = new Spotify(keys.spotify);
    // If there is no song name, set the song to The Sign, from Ace of Base
    if (!songName) {
        songName = "The Sign";
    }
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            output =
                "================= LIRI FOUND THIS FOR YOU...==================" +
                space + "Song Name: " + "'" + songName.toUpperCase() + "'" +
                space + "Album Name: " + data.tracks.items[0].album.name +
                space + "Artist Name: " + data.tracks.items[0].album.artists[0].name +
                space + "URL: " + data.tracks.items[0].album.external_urls.spotify;
            console.log(output);
            writeToLog(output);
        }
    });

}
    let getMovie = function (movieName) {

        if (!movieName) {
            movieName = "Mr Nobody";
        }
        //Get your OMDb API key creds here http://www.omdbapi.com/apikey.aspx
        // t = movietitle, y = year, plot is short, then the API key
        let urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=33981212";

        request(urlHit, function (err, res, body) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            } else {
                let jsonData = JSON.parse(body);
                output = space + header +
                    space + 'Title: ' + jsonData.Title +
                    space + 'Year: ' + jsonData.Year +
                    space + 'Rated: ' + jsonData.Rated +
                    space + 'Country: ' + jsonData.Country +
                    space + 'Language: ' + jsonData.Language +
                    space + 'Plot: ' + jsonData.Plot +
                    space + 'Actors: ' + jsonData.Actors +
                    space + 'IMDb Rating: ' + jsonData.imdbRating + "\n";

                console.log(output);
                writeToLog(output);
            }
        });
    };

    function getConcerts() {
        axios.get(queryUrl).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var tourArr = response.data[i];
                console.log("Venue: " + tourArr.venue.name);
                console.log("City: " + tourArr.venue.city);
                // console.log("Date of Tour: " + time);
                console.log(tourArr.datetime);
                //  console.log(response)

            }
            if (!response.data.length) {
                console.log("Sorry no tour for this artist");
            }
        }
        )
    }
    
    function doWhatItSays() {
        // Reads the random text file and passes it to the spotify function
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                return console.log(err);
            } else {
            getMeSpotify(data);
        }});
    };


    let questions = [{
        type: 'list',
        name: 'programs',
        message: 'What would you like to do?',
        choices: ['Spotify', 'Movie', 'Concert', 'Do What It Says']
    },
    {
        type: 'input',
        name: 'movieChoice',
        message: 'What\'s the name of the movie you would like?',
        when: function (answers) {
            return answers.programs == 'Movie';
        }
    },
    {
        type: 'input',
        name: 'songChoice',
        message: 'What\'s the name of the song you would like?',
        when: function (answers) {
            return answers.programs == 'Spotify';
        }
    },
    {
        type: 'input',
        name: 'concertChoice',
        message: 'Would you like to search for concerts near by?',
        when: function (answers) {
            return answers.programs == 'Concert';
        }
    },
    {
        type: 'input',
        name: 'doWhatItSaysChoice',
        message: 'Want liri to do a trick?',
        when: function (answers) {
            return answers.programs == 'Do What It Says';
        }
    },
    ];

    inquirer
        .prompt(questions)
        .then(answers => {
            // Depending on which program the user chose to run it will do the function for that program
            switch (answers.programs) {

                case 'Spotify':
                    getMeSpotify(answers.songChoice);
                    break;
                case 'Movie':
                    getMovie(answers.movieChoice);
                    break;
                case 'Concert':
                    getConcerts();
                    break;
                case 'Do What It Says':
                doWhatItSays();
                    break;
                default:
                    console.log('You broke LIRI...');
            }
        });
    