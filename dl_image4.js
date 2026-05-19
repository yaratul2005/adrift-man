const https = require('https');

// This uses Unsplash oEmbed endpoint which usually returns the thumbnail
https.get('https://unsplash.com/oembed?url=https://unsplash.com/photos/red-and-white-lighthouse-near-body-of-water-F_zec7P_OwA', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(data);
  });
});
