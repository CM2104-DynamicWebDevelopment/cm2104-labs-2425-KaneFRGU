var express = require('express');
var app = express();
var SpotifyWebApi = require('spotify-web-api-node')
var searchterm = "love";
app.use(express.static('public'))

var spotifyApi = new SpotifyWebApi({
    clientId: '1e65070733a347318ee1b593b700a5f9',
    clientSecret: '8536df9e4be84b92b5a127a672835baf'
})

// Retrieve an access token
spotifyApi.clientCredentialsGrant().then( 
    function (data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']); 

        console.log('The access token is :) ')
    },
    function (err) {
        console.log(
            'Something went wrong when retrieving an access token',
            err.message 
        );
    }
);



spotifyApi.searchTracks(searchterm)
   .then(function (data) {
   var tracks = data.body.tracks.items 
   //lets set up a empty string to act as the response
   var HTMLResponse = "";
   //now lets run through all the items
   //this is a for loop 
   for(var i=0; i<tracks.length;i++){
   
   var track = tracks[i];
   console.log(track.name);
   HTMLResponse = HTMLResponse +
   "<div>" +
   "<h2>"+track.name+"</h2>"+
   "<h4>"+track.artists[0].name+"</h4>"+
   "<img src='"+track.album.images[0].url +"'>"+
   "<a href='"+track.external_urls.spotify+"'> Track Details </a>"+ "</div>";
   console.log(HTMLResponse);
   }
   res.send(HTMLResponse)
   }, function (err) {
    console.error(err);
   });
  
   


app.get('/', function(req, res){
    res.send("Hello world! by express");
});
app.listen(8080);
