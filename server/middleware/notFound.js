const notFound = value => (req, res, next) => {
  if (value.length <= 0) {
    return res.status(404).json({
      status: 404,
      error: 'No data found',
    });
  }
  next();
};

export default notFound;
