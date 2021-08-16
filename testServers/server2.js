const app = require('express')();

app.get('/', (req, res, next) => {
  console.log(`new request`, req.headers);
  console.log(`=================================`);
  res.json({ health: 'ok' });
  res.end();
});

app.listen(7777, () => {
  console.log('Application starts on port 7777');
});
