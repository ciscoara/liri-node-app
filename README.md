# liri-node-app

About
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

Motivation
This is an assignment for Week 10 of Coding Bootcamp.

What is does
LiriBot will search Spotify for songs, Bands in Town for concerts and OMDB for movies.

Songs
node liri.js spotify-this-song <insert song title>

This will show the following information about the song in your terminal/bash window:

Artist(s)
Song name
A preview link of the song from Spotify
Album song is from
If no song is provided, the program will default to "The Sign" by Ace of Base.

Concerts
node liri.js concert-this <artist/band name here>

This will show the following information about the band in your terminal/bash window:

Name of venue
Venue location
Date of the event (MM/DD/YYYY)
Movies
node liri.js movie-this <insert movie title>

This will show the following information about the movie in your terminal/bash window:

Movie title
Year movie was released
IMDB Rating
Rotten Tomatoes Rating
Country where movie was produced
Language of the movie
Movie plot
Actors in the movie
If no movie is provided, the program will output data for the movie "Tommy Boy."

Do What it Says
node liri.js do-what-it-says

Using the fs node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
