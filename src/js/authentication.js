const request = require('request');

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
