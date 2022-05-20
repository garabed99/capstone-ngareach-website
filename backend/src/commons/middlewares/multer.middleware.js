const multer = require("multer");
const path = require("path");

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const clientProfileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "images", "clients", "profile"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--profilePicture--${file.originalname}`);
  },
});

const photographerProfileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "images", "photographers", "profile"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--profilePicture--${file.originalname}`);
  },
});

const photographerPortfolioStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(__dirname, "..", "images", "photographers", "portfolio")
    );
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--portfolio--${file.originalname}`);
  },
});

const uploadClientProfile = multer({
  storage: clientProfileStorageEngine,
  fileFilter: filefilter,
});
const uploadPhotographerProfile = multer({
  storage: photographerProfileStorageEngine,
  fileFilter: filefilter,
});
const uploadPhotographerPortfolio = multer({
  storage: photographerPortfolioStorageEngine,
  fileFilter: filefilter,
});

module.exports = {
  uploadClientProfile,
  uploadPhotographerProfile,
  uploadPhotographerPortfolio,
};
