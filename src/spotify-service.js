// Request token from Spotify API
const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(process.env.Client_ID + ':' + process.env.Client_Secret).toString('base64')
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
  
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      console.log('OAuth token:', access_token);
      // use the access_token to make API calls
    } else {
      console.log('Error:', error);
    }
  });

// Make an API request
export default class SpotifyService {
    static playTrack(access_token) {
      const playlistId = '0sCbiYB4EZavMKH9gcbh8S';
  
      // make API request to get playlist tracks
      fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        // get preview_url of the first track
        const previewUrl = data.items[0].track.preview_url;
  
        // create a new audio element and set the preview_url as the source
        const audio = new Audio(previewUrl);
  
        // play the audio
        audio.play();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }
  
  
  

