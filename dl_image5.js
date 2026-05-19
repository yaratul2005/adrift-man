const https = require('https');

// The image is available under https://images.unsplash.com/photo-{id}
// Since we have the ID F_zec7P_OwA... wait, Unsplash IDs are typically 11 characters like F_zec7P_OwA
// So the URL would just be https://images.unsplash.com/photo-[something related to this id]. Actually, images.unsplash.com accepts the id as part of the query or url?
// Usually, it's https://source.unsplash.com/{id} which redirects. But source is down.
// Another way: Unsplash API.
const options = {
  hostname: 'api.unsplash.com',
  path: '/photos/F_zec7P_OwA?client_id=Lh0B0Z7-h7-nS-h0B0Z7-h7-nS-h0B0Z7-h7-nS',
};
https.get(options, (res) => {
  console.log(res.statusCode);
});
