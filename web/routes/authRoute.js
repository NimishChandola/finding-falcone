import express from 'express';
const router = express.Router();

router.get('/login', function (req, res, next) {
  res.send('Hello Nimish from login');
});

router.get('/login/:userName', function (req, res, next) {
  res.send(`Hello Nimish from ${req.params.userName}`);
});

router.get('/logout', function (req, res, next) {
  res.send('Hello Nimish from logout');
});

export default router;