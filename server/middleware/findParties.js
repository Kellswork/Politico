import parties from '../models/parties';

const findParty = (req, res) => {
  if (parties.length <= 0) {
    return res.status(404).json({
      status: 404,
      error: 'No political party has been created',
    });
  }
};

export default findParty;
