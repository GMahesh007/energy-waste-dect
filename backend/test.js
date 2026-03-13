fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({})
})
.then(r => typeof r.text === 'function' ? r.text() : r)
.then(console.log)
.catch(console.error);
