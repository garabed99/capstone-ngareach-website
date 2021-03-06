import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Snackbar,
} from "@material-ui/core";
import { Visibility, VisibilityOff, SendSharp } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

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
    width: "27.125rem",
    height: "auto",
    padding: "2rem",
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
    marginTop: "10px",
  },
  paperStyle: {
    padding: 20,
    height: "80vh",
    // maxWidth: ,
    width: 500,
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
});

export default function SignupCl() {
  const classes = useStyles();
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

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
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phone,
    } = values;

    axios
      .post("http://localhost:4000/clients", {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        phone,
      })
      .then(() => {
        setSuccessAlert(true);
        setTimeout(() => {
          window.location.href = "/login";
        }, 800);
      })
      .catch((err) => {
        console.log(err);
        setErrorAlert(true);
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
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid>
          <Grid align="center">
            <h2 style={{ marginBottom: "0px" }}>Register as Client</h2>
          </Grid>

          <div className={classes.formContainer}>
            <Grid container spacing={3}>
              <Grid container item xs={6} direction="column">
                <FormLabel style={{ marginBottom: "10px" }}>
                  Account Details
                </FormLabel>
                <TextField
                  className={classes.inputField}
                  required
                  label="Email"
                  name="email"
                  value={formik.values.email.toLowerCase()}
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

              <Grid container item xs={6} direction="column">
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
                      control={<Radio required color="primary" />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="Male"
                      control={<Radio required color="primary" />}
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
            <div>
              {successAlert ? (
                <Snackbar open={successAlert} autoHideDuration={2000}>
                  <Alert severity="success">
                    Successfully created an account! Try to login now.
                  </Alert>
                </Snackbar>
              ) : (
                <Snackbar open={errorAlert} autoHideDuration={2000}>
                  <Alert severity="error">Something went wrong!</Alert>
                </Snackbar>
              )}
            </div>
          </div>
        </Grid>
      </Paper>
    </>
  );
}
