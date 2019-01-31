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
    id: offices[offices.length - 1].id + 1,
    type,
    name,
  };
  offices.push(newOffice);

  res.status(201).json({
    status: 201,
    data: newOffice,
  });
};

const getAllOffices = (req, res) => {
  if (offices.length <= 0) {
    return res.status(404).json({
      status: 404,
      error: 'No political office has been created yet',
    });
  }
  return res.status(200).json({
    status: 200,
    data: offices,
  });
};

const getOnePoliticalOffice = (req, res) => {
  const { id } = req.params;
  const oneOffice = offices.find(office => office.id === parseInt(id, 10));
  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      error: 'id is not a number',
    });
  }
  if (!oneOffice) {
    return res.status(404).json({
      status: 404,
      error: 'This political office does not exist',
    });
  }
  return res.status(200).json({
    status: 200,
    data: oneOffice,
  });
};

export {
  createOffice,
  getAllOffices,
  getOnePoliticalOffice,
};
