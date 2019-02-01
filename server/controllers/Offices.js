import offices from '../models/offices';

const createOffice = (req, res) => {
  const { type, name } = req.body;
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

const getAllOffices = (req, res) => res.status(200).json({
  status: 200,
  data: offices,
});

const getOnePoliticalOffice = (req, res) => {
  const { id } = req.params;
  const oneOffice = offices.find(office => office.id === parseInt(id, 10));
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
