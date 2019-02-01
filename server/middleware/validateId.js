const validateId = (req, res, next) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      error: 'id is not a number',
    });
  }
  next();
};

export default validateId;
