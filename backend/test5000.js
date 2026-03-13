const http = require('http');

http.get('http://localhost:5000/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response from 5000:', data.substring(0, 200)));
}).on('error', (err) => {
  console.log('Error hitting 5000:', err.message);
});
