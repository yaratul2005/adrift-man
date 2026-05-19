const https = require('https');
const options = {
  hostname: 'unsplash.com',
  path: '/photos/red-and-white-lighthouse-near-body-of-water-F_zec7P_OwA',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
  }
};
https.get(options, (res) => {
  if (res.statusCode === 301 || res.statusCode === 302) {
    console.log('Redirect:', res.headers.location);
    return;
  }
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^"'\\]*/);
    console.log(match ? match[0] : 'not found');
  });
});
