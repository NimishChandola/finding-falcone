// To write middleware we need to create a function which is returning a function
// with req, res, next
//never forget to call next() in middlewares  otherwise code will stay there.
export default function requestInterceptor(option) {
  return function (req, res, next) {
    console.log("===================Middleware Start========");
    console.log(`Middleware data: ${option}`)
    console.log("request url", req.url);
    console.log("===================Middleware End========\n\n\n");
    next();
  }
};