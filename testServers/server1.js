const app = require('express')();

app.get('/', (req, res, next) => {
  console.log(`new request`, req.headers);
  console.log(`=================================`);
  res.json({ health: 'ok' });
  res.end();
});

app.listen(8888, () => {
  console.log('Application starts on port 8888');
});
