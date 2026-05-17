const https = require('https');
const options = {
  hostname: 'unsplash.com',
  path: '/photos/F_zec7P_OwA',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
};
https.get(options, (res) => {
  console.log("Status Code:", res.statusCode);
});
