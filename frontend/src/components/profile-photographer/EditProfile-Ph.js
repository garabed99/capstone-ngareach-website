import {
  Button,
  FormLabel,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  CardMedia,
} from "@material-ui/core";
import { Visibility, VisibilityOff, SendSharp } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";

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

  function handleSubmit() {
    if (oldPassword === newPassword) {
      alert("Same Password!");
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
      profilePicture: newProfilePicture,
      portfolio: newPortfolio,
    };

    axios
      .patch(`http://localhost:4000/photographers/${id}`, data)
      .then(() => {
        alert("Updated profile successfully");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    alert("Successfully updated!");
    window.location.href = "/";
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
                    !existingPhotographerData.profilePicture
                      ? blankProfile
                      : existingPhotographerData.profilePicture
                  }
                  title={`${existingPhotographerData.firstName} ${existingPhotographerData.lastName}`}
                />
                [upload image button here]
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
                  onChange={(e) => setNewEmail(e.target.value)}
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
