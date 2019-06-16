import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute';
import requestInterceptor from './middlewares/request-interceptor';

const app = express();

//Instantiate router
const router = express.Router();

//added router to out app
app.use(router);

app.use(cookieParser());

/*Our browser needs to access assets through url like images/css/etc.
Node will restrict it's access so we need to use static middleware.
And tell node that they are our static assets and we want to access it directly.*/
app.use('/assets', express.static(path.join(__dirname, 'assets')));

/*If we only give static middleware as shown below, 
then it will run on default slash / */
//app.use(express.static(path.join(__dirname, 'assets')));

//Middleware function, it's like an interceptor for incoming request
app.use(function (req, res, next) {
  console.log('url ', req.url, 'Time: %d', Date.now());
  next();
});

// See how we are using middleware written in different file.
app.use(requestInterceptor('Request interceptor'));

//Running multiple middlewares one by one.
app.use(requestInterceptor('MW1'), requestInterceptor('MW2'), requestInterceptor('MW3'));

router.get('/', requestInterceptor('before get'), (req, res) => {
  //if we don't use cookie parser we will get cookie
  //in req.header.cookie as "key=value"
  //Here we are using cookie-parser so we can get it as req.cookies
  res.send('Hello Nimish');
});

//Implemented nested route
router.use('/auth', authRoute);

//post call using body parser
router.post('/postData', bodyParser.json(), function (req, res, next) {
  res.sendStatus(200);
});

// Below one is to catch error it has error as first parameter.
//Error handling is typically used across the whole application, 
//therefore it’s best to implement it as a middleware. 
//It has the same parameters plus one more, error
app.use(function (err, req, res, next) {
  //Error first approach.
  console.log('error caught here.', err);
});

app.listen(3000, () => {
  console.log("server is listening on port...")
});