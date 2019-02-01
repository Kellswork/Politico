import offices from '../models/offices';

const findOffice = (req, res) => {
  if (offices.length <= 0) {
    return res.status(404).json({
      status: 404,
      error: 'No political office has been created yet',
    });
  }
};

export default findOffice;
