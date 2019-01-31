import validateParty from '../middleware/validateParty';
import parties from '../models/parties';

const createParty = (req, res) => {
  const { name } = req.body;
  const { error } = validateParty(req.body);
  if (error) {
  //  const errorMessage = error.details.map(element => element.message);
    return res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
  }
  const party = {
    id: parties[parties.length - 1].id + 1,
    name,
  };
  parties.push(party);

  res.status(201).json({
    status: 201,
    data: party,
  });
};

export default createParty;
