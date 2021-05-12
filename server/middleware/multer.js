/* eslint-disable no-shadow */
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dir = '../../data/';

module.exports.upload = multer({
  storage: multer.diskStorage({

    destination(req, file, callback) {
      console.log(file);
      if (!req.pathFiles) {
        req.pathFiles = `${dir}photos/${uuidv4()}`;
      }
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      if (!fs.existsSync(req.pathFiles)) {
        fs.mkdirSync(req.pathFiles);
      }
      if (!fs.existsSync(req.pathFiles)) {
        fs.mkdirSync(req.pathFiles);
      }
      callback(null, req.pathFiles);
    },
    filename(req, file, callback) {
      const name = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
      if (req.nameFiles) {
        req.nameFiles.push({
          path: `${req.pathFiles}/${name}`,
          name: file.originalname,
        });
      } else {
        req.nameFiles = [{
          path: `${req.pathFiles}/${name}`,
          name: file.originalname,
        }];
      }

      callback(null, name);
    },

  }),

  // eslint-disable-next-line consistent-return
  fileFilter(req, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.bmp') {
      return callback('не тот тип', false);
    }
    callback(null, true);
  },
});

