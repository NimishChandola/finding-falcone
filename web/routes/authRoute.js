import express from 'express';
const router = express.Router();

router.get('/login', function (req, res, next) {
  res.send('Hello Nimish from login');
});

router.get('/logout', function (req, res, next) {
  res.send('Hello Nimish from logout');
});

export default router;