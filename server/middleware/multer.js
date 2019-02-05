import multer from 'multer';
import Datauri from 'datauri';
import path from 'path';

const storage = multer.memoryStorage({
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('only jpeg, png, jpg files are accepted'), false);
    }
  },
});

const multerUploads = multer({ storage }).single('passportUrl');
const dUri = new Datauri();

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export { multerUploads, dataUri };
