export function notFound(req, res, next) {
  const error = new Error(`Not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(error, req, res, next) {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({
    message: error.message || "Server error"
  });
}
