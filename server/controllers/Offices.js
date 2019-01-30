import offices from '../models/offices';
import validateOffice from '../middleware/validateOffice';

const createOffice = (req, res) => {
  const { type, name } = req.body;
  const { error } = validateOffice(req.body);
  if (error) {
    const errorMessage = error.details.map(element => element.message);
    return res.status(400).json({
      status: 400,
      error: errorMessage,
    });
  }
  const newOffice = {
    id: offices.length + 1,
    type,
    name,
  };
  offices.push(newOffice);

  res.status(201).json({
    status: 201,
    data: newOffice,
  });
};

export default createOffice;
