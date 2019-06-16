import express from 'express';

const app = express();

app.use(function (req, res, next) {
  console.log('Time: %d', Date.now())
  next()
})

app.get('/', (req, res) => {
  res.send('Hello Nimish');
});

app.listen(3000, () => {
  console.log("server is listening on port...")
});