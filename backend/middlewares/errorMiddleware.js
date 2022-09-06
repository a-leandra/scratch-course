const nodeEnv = require("../config/globalVariables").nodeEnv;
// when the route doesn't exists
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// converting thrown error into a structured form
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: nodeEnv === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
