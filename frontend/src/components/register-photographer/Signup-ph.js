import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { Visibility, VisibilityOff, SendSharp } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";

import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles({
  mainContainer: {
    display: "grid",
    justifyContent: "center",
    position: "relative",
  },
  formContainer: {
    position: "relative",
    width: "60rem",
    // height: "auto",
    paddingTop: "2rem",
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
    width: "50%",
    height: "3rem",
    background: "#42a5f5",
    color: "white",
    marginTop: "25px",
  },
  paperStyle: {
    padding: 20,
    height: "95vh",
    maxHeight: "120vh",
    // maxWidth: ,
    width: 1200,
    margin: "40px auto",
  },
});

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email.")
    .required("Email is required."),
  password: yup
    .string()
    .required("Password is required.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character."
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match.")
    .required("Confirm password is required."),
  firstName: yup
    .string()
    .required("Enter your first name.")
    .matches(/^[A-Za-z'\- ]+$/, "Cannot contain numbers or special characters.")
    .min(3, "Must be 3 characters or more.")
    .max(15, "Must be 15 characters or less."),
  lastName: yup
    .string()
    .required("Enter your last name.")
    .matches(/^[A-Za-z'\- ]+$/, "Cannot contain numbers or special characters.")
    .min(3, "Must be 3 characters or more.")
    .max(15, "Must be 15 characters or less."),
  gender: yup.string().required("Gender is required."),
  dateOfBirth: yup.date().required("Date of birth is required."),
  phone: yup
    .string()
    .required("Enter your phone number.")
    .matches(/^[0-9 +]+$/, "Must be only digits.")
    .min(8, "Must be at least 8 digits.")
    .max(15, "Must be at most 15 digits."),
  yearsOfExperience: yup.string().required("Years of Experience is required."),
  biography: yup.string().required("Biography is required."),
  photographyTypes: yup
    .string()
    .required("Choose your photography types.")
    // .transform((value) => (typeof value === "string" ? [value] : value))
    .min(1, "Must choose at least 1 type."),
  facebookLink: yup.string(),
  instagramLink: yup.string().required("Instagram account link is required."),
  websiteLink: yup.string(),
});

export default function SignupPh() {
  const classes = useStyles();

  const [showPasswordValue, setPasswordValue] = useState({
    showPassword: false,
  });
  const [showConfirmPasswordValue, setConfirmPasswordValue] = useState({
    showConfirmPassword: false,
  });

  const handleClickShowPassword = () => setPasswordValue(!showPasswordValue);
  const handleClickShowConfirmPassword = () =>
    setConfirmPasswordValue(!showConfirmPasswordValue);

  async function handleSubmit(values) {
    // const isValid = await validationSchema.isValid(values);
    // console.log(isValid);
    // console.log(values);

    localStorage.setItem("values", JSON.stringify(values));
    const sessionData = localStorage.getItem("values");
    console.log(sessionData);

    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phone,
      yearsOfExperience,
      biography,
      photographyTypes,
      // imgFile,
      facebookLink,
      instagramLink,
      websiteLink,
    } = values;
    axios
      .post("http://localhost:4000/photographers", {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        phone,
        yearsOfExperience,
        biography,
        photographyTypes,
        // imgFile,
        facebookLink,
        instagramLink,
        websiteLink,
      })
      .then((res) => {
        alert("Successfully created an account!");
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      phone: "",
      yearsOfExperience: "",
      biography: "",
      photographyTypes: "",
      // imgFile: "",
      facebookLink: "",
      instagramLink: "",
      websiteLink: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  console.log(formik.initialValues.photographyTypes);
  console.log(formik.errors);
  console.log(formik.values);
  return (
    <>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid>
          <Grid align="center" style={{ marginBottom: 10 }}>
            <h2 style={{ marginBottom: "0px" }}>Register as Photographer</h2>
          </Grid>

          <div className={classes.formContainer}>
            <Grid container spacing={2}>
              <Grid container item xs={4} direction="column">
                <FormLabel style={{ marginBottom: "10px" }}>
                  Account Details
                </FormLabel>

                <TextField
                  className={classes.inputField}
                  required
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  variant="outlined"
                  autoFocus
                  onChange={(e) =>
                    formik.setFieldValue("email", e.target.value)
                  }
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  className={classes.inputField}
                  required
                  name="password"
                  label="Create Password"
                  variant="outlined"
                  type={showPasswordValue ? "password" : "text"}
                  onChange={(e) =>
                    formik.setFieldValue("password", e.target.value)
                  }
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPasswordValue ? (
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
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  type={showConfirmPasswordValue ? "password" : "text"}
                  onChange={(e) =>
                    formik.setFieldValue("confirmPassword", e.target.value)
                  }
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                        >
                          {showConfirmPasswordValue ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid container item xs={4} direction="column">
                <FormLabel style={{ marginBottom: "10px" }}>
                  Personal Details
                </FormLabel>

                <TextField
                  className={classes.inputField}
                  required
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
                <TextField
                  className={classes.inputField}
                  required
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />

                <FormControl
                  required
                  component="fieldset"
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                >
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label="position"
                    name="gender"
                    defaultValue="top"
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value="Female"
                      control={<Radio color="primary" />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="Male"
                      control={<Radio color="primary" />}
                      label="Male"
                    />
                  </RadioGroup>
                  <FormHelperText>
                    {formik.touched.gender && formik.errors.gender}
                  </FormHelperText>
                </FormControl>
                <br />
                <TextField
                  className={classes.inputField}
                  id="dob"
                  variant="outlined"
                  label="Date Of Birth"
                  type="date"
                  name="dateOfBirth"
                  // defaultValue="1999-01-14"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) =>
                    formik.setFieldValue("dateOfBirth", e.target.value)
                  }
                  error={
                    formik.touched.dateOfBirth &&
                    Boolean(formik.errors.dateOfBirth)
                  }
                  helperText={
                    formik.touched.dateOfBirth && formik.errors.dateOfBirth
                  }
                />
                <TextField
                  className={classes.inputField}
                  required
                  name="phone"
                  label="Phone Number"
                  placeholder="+374 77418529"
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
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
                  onChange={(e, v) =>
                    formik.setFieldValue("yearsOfExperience", v.year)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Years of Experience"
                      placeholder="Add Years"
                      error={
                        formik.touched.yearsOfExperience &&
                        Boolean(formik.errors.yearsOfExperience)
                      }
                      helperText={
                        formik.touched.yearsOfExperience &&
                        formik.errors.yearsOfExperience
                      }
                    />
                  )}
                />
                <TextField
                  className={classes.inputField}
                  fullWidth
                  multiline
                  rows={4}
                  label="Biography"
                  name="biography"
                  placeholder="Your career biography"
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.biography && Boolean(formik.errors.biography)
                  }
                  helperText={
                    formik.touched.biography && formik.errors.biography
                  }
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
                  onChange={(e, v) =>
                    formik.setFieldValue("photographyTypes", v.genre)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Photography Types"
                      placeholder="Add More"
                      name="photographyTypes"
                      error={
                        formik.touched.photographyTypes &&
                        Boolean(formik.errors.photographyTypes)
                      }
                      helperText={
                        formik.touched.photographyTypes &&
                        formik.errors.photographyTypes
                      }
                    />
                  )}
                />

                {/* </div> */}
                <TextField
                  className={classes.inputField}
                  required
                  label="Instagram link"
                  name="instagramLink"
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.instagramLink &&
                    Boolean(formik.errors.instagramLink)
                  }
                  helperText={
                    formik.touched.instagramLink && formik.errors.instagramLink
                  }
                />

                <TextField
                  className={classes.inputField}
                  label="Facebook link"
                  name="facebookLink"
                  placeholder="(Optional)"
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.facebookLink &&
                    Boolean(formik.errors.facebookLink)
                  }
                  helperText={
                    formik.touched.facebookLink && formik.errors.facebookLink
                  }
                />

                <TextField
                  className={classes.inputField}
                  label="Personal website"
                  name="websiteLink"
                  placeholder="(Optional)"
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.websiteLink &&
                    Boolean(formik.errors.websiteLink)
                  }
                  helperText={
                    formik.touched.websiteLink && formik.errors.websiteLink
                  }
                />
              </Grid>
            </Grid>
            <Button
              className={classes.btn}
              variant="contained"
              type="submit"
              onClick={formik.handleSubmit}
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
