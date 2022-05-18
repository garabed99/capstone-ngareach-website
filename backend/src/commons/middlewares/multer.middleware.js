const multer = require("multer");

const clientProfileStorageEngine = multer.diskStorage({
  destination: "../images/clients/profile",
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const photographerProfileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../images/photographers/profile");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--profilePicture--${file.originalname}`);
  },
});

const photographerPortfolioStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../images/photographers/portfolio");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--portfolio--${file.originalname}`);
  },
});

const uploadClientProfile = multer({ storage: clientProfileStorageEngine });
const uploadPhotographerProfile = multer({
  storage: photographerProfileStorageEngine,
});
const uploadPhotographerPortfolio = multer({
  storage: photographerPortfolioStorageEngine,
});

module.exports = {
  uploadClientProfile,
  uploadPhotographerProfile,
  uploadPhotographerPortfolio,
};
