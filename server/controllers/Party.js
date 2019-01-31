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

const getAllParties = (req, res) => {
  if (parties.length <= 0) {
    return res.status(404).json({
      status: 404,
      error: 'No political party has been created',
    });
  }
  return res.status(200).json({
    status: 200,
    data: parties,
  });
};

const getAParty = (req, res) => {
  const { id } = req.params;
  const oneParty = parties.find(party => party.id === parseInt(id, 10));
  if (!oneParty) {
    return res.status(404).json({
      status: 404,
      error: 'Could not find political party',
    });
  }
  return res.status(200).json({
    status: 200,
    data: oneParty,
  });
};

const editAParty = (req, res) => {
  const { id } = req.params;
  const { error } = validateParty(req.body);
  let oneParty = parties.find(party => party.id === parseInt(id, 10));
  if (!oneParty) {
    return res.status(404).json({
      status: 404,
      error: 'Could not find political party',
    });
  }
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
  }
  oneParty = {
    id,
    name: req.body.name,
  };

  res.status(200).json({
    status: 200,
    data: oneParty,
  });
};

const deleteAParty = (req, res) => {
  const { id } = req.params;
  const oneParty = parties.find(party => party.id === parseInt(id, 10));
  if (!oneParty) {
    return res.status(404).json({
      status: 404,
      error: 'Could not find political party',
    });
  }
  parties.splice(parties.indexOf(oneParty), 1);
  res.status(200).json({
    status: 200,
    data: {
      message: 'Political party has been deleted successfully',
    },
  });
};

export {
  createParty,
  getAllParties,
  getAParty,
  editAParty,
  deleteAParty,
};
