import {
  Button,
  CardMedia,
  FormLabel,
  Grid,
  Paper,
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
  TextField,
  Snackbar,
} from "@material-ui/core";
import { Visibility, VisibilityOff, SendSharp } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Alert } from "@material-ui/lab";

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import blankProfile from "../../imgs/blank-profile.png";

const useStyles = makeStyles({
  mainContainer: {
    display: "grid",
    justifyContent: "center",
    position: "relative",
  },
  formContainer: {
    position: "relative",
    width: "60rem",
    paddingTop: "2rem",
    marginLeft: "100px",
    marginRight: "100px",
  },
  inputField: {
    position: "relative",
    width: "100%",
    marginBottom: "10px",
  },
  btn: {
    width: "30%",
    height: "3rem",
    background: "#42a5f5",
    color: "white",
    marginTop: "25px",
    float: "right",
  },
  profilePic: {
    width: 250,
    height: 250,
  },
  paperStyle: {
    padding: 20,
    height: "95vh",
    maxHeight: "120vh",
    width: 1200,
    margin: "40px auto",
  },
});

export default function EditProfilePh() {
  const classes = useStyles();

  const param = useParams();
  const id = param.id;

  const [existingPhotographerData, setExistingPhotographerData] = useState([]);
  const [existingProfilePicture, setExistingProfilePicture] = useState("");
  const [newEmail, setNewEmail] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newFirstName, setNewFirstName] = useState();
  const [newLastName, setNewLastName] = useState();
  const [newPhone, setNewPhone] = useState();
  const [newYearsOfExperience, setNewYearsOfExperience] = useState();
  const [newBiography, setNewBiography] = useState();
  const [newPhotographyTypes, setNewPhotographyTypes] = useState();
  const [newPricePerHour, setNewPricePerHour] = useState();
  const [newWebsiteLink, setNewWebsiteLink] = useState();

  const [newProfilePicture, setNewProfilePicture] = useState();
  const [newPortfolio, setNewPortfolio] = useState([]);
  const [successUpdateAlert, setSuccessUpdateAlert] = useState(false);
  const [errorUpdateAlert, setErrorUpdateAlert] = useState(false);

  const [successUploadAlert, setSuccessUploadAlert] = useState(false);
  const [errorUploadAlert, setErrorUploadAlert] = useState(false);

  useEffect(() => {
    fetchPhotographerData();
  }, []);

  function fetchPhotographerData() {
    axios
      .get(`http://localhost:4000/photographers/${id}`)
      .then((res) => {
        console.log("array of photographer Data", res.data);

        if (res.data._id === id) {
          setExistingPhotographerData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:4000/photographers/profilepicture/${id}`, {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        setExistingProfilePicture(url);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [showOldPasswordValue, setOldPasswordValue] = useState({
    showOldPassword: false,
  });
  const [showNewPasswordValue, setNewPasswordValue] = useState({
    showNewPassword: false,
  });

  const handleClickShowOldPassword = () =>
    setOldPasswordValue(!showOldPasswordValue);

  const handleClickShowNewPassword = () =>
    setNewPasswordValue(!showNewPasswordValue);

  function handlePictureUpload() {
    const fd = new FormData();
    fd.append("profilePicture", newProfilePicture);
    const photographerProfilePicture = {};
    fd.forEach((value, key) => {
      photographerProfilePicture[key] = value;
    });

    axios
      .patch(`http://localhost:4000/photographers/profilepicture/${id}`, fd, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.headers);
        console.log(res.data);
        // console.log(data.profilePicture);
        setSuccessUploadAlert(true);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setErrorUploadAlert(true);
      });
  }

  function handlePortfolioUpload() {
    const fd = new FormData();
    for (let i = 0; i < newPortfolio.length; i++) {
      fd.append("portfolio", newPortfolio[i]);
    }

    axios
      .patch(`http://localhost:4000/photographers/portfolio/${id}`, fd, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.headers);
        console.log(res.data);
        // console.log(data.profilePicture);
        setSuccessUploadAlert(true);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setErrorUploadAlert(true);
      });
  }

  function handleSubmit() {
    if (oldPassword === newPassword && oldPassword !== undefined) {
      setErrorUpdateAlert(true);
      // alert("Same Password!");
      throw new Error("Same Password!");
    }
    const data = {
      email: newEmail,
      newPassword: newPassword,
      firstName: newFirstName,
      lastName: newLastName,
      phone: newPhone,
      yearsOfExperience: newYearsOfExperience,
      biography: newBiography,
      photographyTyes: newPhotographyTypes,
      pricePerHour: newPricePerHour,
      websiteLink: newWebsiteLink,
    };

    axios
      .patch(`http://localhost:4000/photographers/${id}`, data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(() => {
        setSuccessUpdateAlert(true);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setErrorUpdateAlert(true);
      });
  }

  return (
    <>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid>
          <Grid align="center" style={{ marginBottom: 10 }}>
            <h2 style={{ marginBottom: "0px" }}>Edit Profile</h2>
            <h1 style={{ marginBottom: "20px" }}>
              {existingPhotographerData.firstName}{" "}
              {existingPhotographerData.lastName}
            </h1>
          </Grid>

          <div className={classes.formContainer}>
            <Grid container spacing={3}>
              <Grid container item xs={4} direction="column">
                <FormLabel style={{ marginBottom: "10px" }}>
                  Profile Picture
                </FormLabel>
                <CardMedia
                  className={classes.profilePic}
                  image={
                    existingProfilePicture
                      ? existingProfilePicture
                      : blankProfile
                  }
                  title={`${existingPhotographerData.firstName} ${existingPhotographerData.lastName}`}
                />
                <div style={{ marginTop: "20px" }}>
                  Upload New Profile Picture
                  <Input
                    accept="image/*"
                    type="file"
                    name="profilePicture"
                    onChange={(e) => setNewProfilePicture(e.target.files[0])}
                  />
                  <Button
                    component="label"
                    style={{ width: "250px" }}
                    onClick={handlePictureUpload}
                  >
                    upload
                  </Button>
                </div>

                <div style={{ marginTop: "20px" }}>
                  Upload Your Portfolio (max 15)
                  <Input
                    // accept=".png, .jpg, .jpeg"
                    type="file"
                    inputProps={{
                      accept: "image/*",
                      multiple: true,
                    }}
                    name="portfolio"
                    onChange={(e) => setNewPortfolio(e.target.files)}
                  />
                  <Button
                    component="label"
                    style={{ width: "250px" }}
                    onClick={handlePortfolioUpload}
                  >
                    upload
                  </Button>
                </div>
              </Grid>

              <Grid container item xs={4} direction="column">
                <FormLabel style={{ marginBottom: "10px" }}>
                  Account Details
                </FormLabel>
                <TextField
                  className={classes.inputField}
                  required
                  label="Change Email"
                  name="email"
                  variant="outlined"
                  onChange={(e) => setNewEmail(e.target.value.toLowerCase())}
                />
                <TextField
                  className={classes.inputField}
                  required
                  name="password"
                  label="Old Password"
                  variant="outlined"
                  type={showOldPasswordValue ? "password" : "text"}
                  onChange={(e) => setOldPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowOldPassword}
                        >
                          {showOldPasswordValue ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className={classes.inputField}
                  required
                  name="newPassword"
                  label="New Password"
                  variant="outlined"
                  type={showNewPasswordValue ? "password" : "text"}
                  onChange={(e) => setNewPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                        >
                          {showNewPasswordValue ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <br />

                <FormLabel style={{ marginBottom: "10px" }}>
                  Personal Details
                </FormLabel>
                <TextField
                  className={classes.inputField}
                  required
                  name="firstName"
                  label="Change First Name"
                  variant="outlined"
                  onChange={(e) => setNewFirstName(e.target.value)}
                />
                <TextField
                  className={classes.inputField}
                  required
                  name="lastName"
                  label="Change Last Name"
                  variant="outlined"
                  onChange={(e) => setNewLastName(e.target.value)}
                />
                <TextField
                  className={classes.inputField}
                  required
                  name="phone"
                  label="Change Phone Number"
                  placeholder="+374 77418529"
                  variant="outlined"
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </Grid>

              <Grid container item xs={4} direction="column">
                <FormLabel style={{ marginBottom: "10px" }}>
                  Career Details
                </FormLabel>

                <Autocomplete
                  className={classes.inputField}
                  id="years-of-experience"
                  name="yearsOfExperience"
                  options={yearsOfExperience}
                  getOptionLabel={(option) => option.year}
                  onChange={(e, v) => setNewYearsOfExperience(v.year)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Update Years of Experience"
                      placeholder="Add Years"
                    />
                  )}
                />
                <TextField
                  className={classes.inputField}
                  fullWidth
                  multiline
                  rows={4}
                  label="Update Biography"
                  name="biography"
                  placeholder="Your career biography"
                  variant="outlined"
                  onChange={(e) => setNewBiography(e.target.value)}
                />

                {/* <div > */}
                <Autocomplete
                  className={classes.inputField}
                  // multiple
                  id="photographyTypes"
                  name="photographyTypes"
                  options={photographyTypes}
                  getOptionLabel={(option) => option.genre}
                  getOptionSelected={(option) => option.genre}
                  // getOptionSelected={(option, value) =>
                  //   option.genre === value.genre
                  // }
                  onChange={(e, v) => setNewPhotographyTypes(v.genre)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Update Photography Types"
                      placeholder="Add More"
                      name="photographyTypes"
                    />
                  )}
                />
                <TextField
                  className={classes.inputField}
                  required
                  label="Change price per hour rate"
                  name="pricePerHour"
                  variant="outlined"
                  placeholder="Price per hour in AMD"
                  onChange={(e) => setNewPricePerHour(e.target.value)}
                />

                <TextField
                  className={classes.inputField}
                  required
                  label="Change Website link"
                  name="websiteLink"
                  variant="outlined"
                  placeholder="Facebook / Instagram / Portfolio site"
                  onChange={(e) => setNewWebsiteLink(e.target.value)}
                />
              </Grid>
              <div style={{ width: "100%" }}>
                <Button
                  className={classes.btn}
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                  endIcon={<SendSharp />}
                >
                  Update
                </Button>
              </div>

              <div>
                {successUpdateAlert ? (
                  <Snackbar open={successUpdateAlert} autoHideDuration={2000}>
                    <Alert severity="success">Successfully Updated!</Alert>
                  </Snackbar>
                ) : (
                  <Snackbar open={errorUpdateAlert} autoHideDuration={2000}>
                    <Alert severity="error">Something went wrong!</Alert>
                  </Snackbar>
                )}
              </div>
              <div>
                {successUploadAlert ? (
                  <Snackbar open={successUploadAlert} autoHideDuration={2000}>
                    <Alert severity="success">Successfully Uploaded!</Alert>
                  </Snackbar>
                ) : (
                  <Snackbar open={errorUploadAlert} autoHideDuration={2000}>
                    <Alert severity="error">Something went wrong!</Alert>
                  </Snackbar>
                )}
              </div>
            </Grid>
          </div>
        </Grid>
      </Paper>
    </>
  );
}

const yearsOfExperience = [
  { year: "Less than a year" },
  { year: "One to three years" },
  { year: "Three to five years" },
  { year: "More than five years" },
];

const photographyTypes = [
  { genre: "Advertising" },
  { genre: "Architecture" },
  { genre: "Astrophotography" },
  { genre: "Baby and child" },
  { genre: "Baptism" },
  { genre: "Birthday" },
  { genre: "Branding" },
  { genre: "Concert" },
  { genre: "Documentary" },
  { genre: "Erotic" },
  { genre: "Family" },
  { genre: "Fashion" },
  { genre: "Film" },
  { genre: "Fine art" },
  { genre: "Food" },
  { genre: "Graduation" },
  { genre: "Landscape" },
  { genre: "Macro" },
  { genre: "Micro" },
  { genre: "Panoramic" },
  { genre: "Paparazzi" },
  { genre: "Pet" },
  { genre: "Photojournalism" },
  { genre: "Portrait" },
  { genre: "Real Estate" },
  { genre: "Sports" },
  { genre: "Stock" },
  { genre: "Street" },
  { genre: "Travel" },
  { genre: "Underwater" },
  { genre: "Vehicle" },
  { genre: "Wedding" },
  { genre: "Wildlife" },
];
