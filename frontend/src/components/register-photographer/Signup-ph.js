import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff, SendSharp } from "@material-ui/icons";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import axios from "axios";
import { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles({
  mainContainer: {
    display: "grid",
    justifyContent: "center",
    position: "relative",
  },
  formContainer: {
    position: "relative",
    width: "30rem",
    height: "auto",
    // paddingTop: "1rem",
    // paddingLeft: "2rem",
    // paddingRight: "2rem",
    // paddingBottom: "2rem",
    marginLeft: "100px",
    marginRight: "100px",
  },
  inputField: {
    position: "relative",
    width: "100%",
    marginBottom: "10px",
  },
  btn: {
    width: "100%",
    height: "3rem",
    background: "#42a5f5",
    color: "white",
    marginTop: "25px"
  },
  paperStyle: {
    padding: 20,
    height: "130vh",
    // maxWidth: ,
    width: 700,
    margin: "40px auto",
  },
});

export default function SignPh() {
  const classes = useStyles();

  const [_email, setEmail] = useState("");
  const [_password, setPassword] = useState("");
  const [_confirmPassword, setConfirmPassword] = useState("");

  const [_firstName, setFirstName] = useState("");
  const [_lastName, setLastName] = useState("");
  const [_gender, setGender] = useState("");
  const [_dateOfBirth, setDateOfBirth] = useState(
    new Date("1999-01-14T11:11:11")
  );
  const [_phoneNum, setPhoneNum] = useState("");

  const [_yearsOfExp, setYearsOfExp] = useState("");
  const [_bio, setBio] = useState("");
  const [_photographyTypes, setPhotographyTypes] = useState([]);
  const [_imgFile, setImgFile] = useState("");
  const [_instagramLink, setInstagramLink] = useState("");
  const [_facebookLink, setFacebookLink] = useState("");
  const [_websiteLink, setWebsiteLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const photographerData = {
      email: _email,
      password: _password,
      confirmPassword: _confirmPassword,
      firstName: _firstName,
      lastName: _lastName,
      gender: _gender,
      dateOfBirth: _dateOfBirth,
      phoneNum: _phoneNum,
      yearsOfExperience: _yearsOfExp,
      bio: _bio,
      photographyTypes: _photographyTypes,
      imgFile: _imgFile,
      facebookLink: _facebookLink,
      instagramLink: _instagramLink,
      websiteLink: _websiteLink,
    };

    localStorage.setItem("photographerData", JSON.stringify(photographerData));
    const sessionData = localStorage.getItem("photographerData");
    console.log(sessionData);

    axios
      .post("http://localhost:4000/photographers", photographerData)
      .then((res) => {
        alert("Successfully created an account!");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  const [showCreatePasswordValue, setCreatePasswordValue] = useState({
    showCreatePassword: false,
  });

  const [showConfirmPasswordValue, setConfirmPasswordValue] = useState({
    showConfirmPassword: false,
  });

  const handleClickShowCreatePassword = () => {
    setCreatePasswordValue({
      showCreatePassword: !showCreatePasswordValue.showCreatePassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setConfirmPasswordValue({
      showConfirmPassword: !showConfirmPasswordValue.showConfirmPassword,
    });
  };
  return (
    <>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid>
          <Grid align="center" style={{ marginBottom: 10 }}>
            <h2>Register as Photographer</h2>
          </Grid>

          <div className={classes.formContainer}>
            <Grid container spacing={2}>
              <Grid container item xs={6} direction="column">
                <FormLabel style={{ marginBottom: "10px" }}>
                  Account Details
                </FormLabel>

                <TextField
                  className={classes.inputField}
                  required
                  label="Email"
                  variant="outlined"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl
                  className={classes.inputField}
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                >
                  <InputLabel required>Create Password</InputLabel>
                  <OutlinedInput
                    labelWidth={125}
                    type={
                      showCreatePasswordValue.showCreatePassword
                        ? "text"
                        : "password"
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowCreatePassword}
                        >
                          {showCreatePasswordValue.showCreatePassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl
                  className={classes.inputField}
                  variant="outlined"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                >
                  <InputLabel required>Confirm Password</InputLabel>
                  <OutlinedInput
                    labelWidth={135}
                    type={
                      showConfirmPasswordValue.showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowConfirmPassword}
                        >
                          {showConfirmPasswordValue.showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid container item xs={6} direction="column">
                <FormLabel style={{ marginBottom: "10px" }}>
                  Personal Details
                </FormLabel>

                <TextField
                  className={classes.inputField}
                  required
                  label="First Name"
                  variant="outlined"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  className={classes.inputField}
                  required
                  label="Last Name"
                  variant="outlined"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  className={classes.inputField}
                  id="dob"
                  label="Date Of Birth"
                  type="date"
                  defaultValue="1999-01-14"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />

                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue="top"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio color="primary" />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio color="primary" />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>

                <FormLabel>Phone Number</FormLabel>
                <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry="AM"
                  value={_phoneNum}
                  onChange={setPhoneNum}
                  style={{ fontSize: "16px" }}
                />
              </Grid>

              <Grid container item xs={12} direction="column">
                <FormLabel style={{ marginBottom: "10px" }}>
                  Career Details
                </FormLabel>

                <Autocomplete
                  className={classes.inputField}
                  id="tags-standard"
                  options={yearsOfExperience}
                  getOptionLabel={(option) => option.year}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Years of Experience"
                      placeholder="Add Years"
                    />
                  )}
                  onChange={(e, v) => setYearsOfExp(v.year)}
                />
                <TextField
                  className={classes.inputField}
                  fullWidth
                  multiline
                  rows={4}
                  label="Biography"
                  variant="outlined"
                  onChange={(e) => setBio(e.target.value)}
                />
                <div className={classes.inputField}>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={photographyTypes}
                    getOptionLabel={(option) => option.genre}
                    defaultValue={[photographyTypes[0]]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Photography Types"
                        placeholder="Add More"
                      />
                    )}
                    onChange={(e, v) => setPhotographyTypes(v.genre)}
                  />
                </div>
                <TextField
                  className={classes.inputField}
                  label="Instagram link"
                  variant="outlined"
                  onChange={(e) => setInstagramLink(e.target.value)}
                />

                <TextField
                  className={classes.inputField}
                  label="Facebook link"
                  variant="outlined"
                  onChange={(e) => setFacebookLink(e.target.value)}
                />

                <TextField
                  className={classes.inputField}
                  label="Personal website"
                  variant="outlined"
                  onChange={(e) => setWebsiteLink(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              className={classes.btn}
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              endIcon={<SendSharp />}
            >
              Submit
            </Button>
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
