const globalErrorHandler = async (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err.name === "CastError") {
    console.log(err);
    statusCode = 400;
    message = `Invalid ${err.path} : ${err.value}`;
  }
  if (err.name === "ValidationError") {
    console.log(err);
    statusCode = 400;

    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(" ,");
  }

  if (err.code === 11000) {
    console.log(err);
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value for field ${field}`;
  }
  res.status(statusCode).json({
    status: `${statusCode}`.startsWith("4") ? "fail" : "error",
    message,
  });
};

module.exports = globalErrorHandler;
