import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  Paper,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
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
    width: "20rem",
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
    marginTop: "25px",
  },
  regBtn: {
    width: "100%",
    height: "3rem",
    background: "#42a5f5",
    color: "white",
    marginTop: "5px",
  },
  paperStyle: {
    padding: 20,
    height: "70vh",
    // maxWidth: ,
    width: 400,
    margin: "40px auto",
  },
  // alert: {
  //   width: "100%",
  //   "& > * + *": {},
  // },
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
  role: yup.string().required("Role is required."),
});

export default function Login() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const [showPasswordValue, setPasswordValue] = useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => setPasswordValue(!showPasswordValue);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClickClose() {
    setOpen(false);
  }
  async function handleSubmit(values) {
    const { email, password, role } = values;

    axios
      .post("http://localhost:4000/auth/login", { email, password, role })
      .then((res) => {
        const test = localStorage.setItem(
          "loggedUserInfo",
          JSON.stringify(res.data)
        );
        console.log("the res", res);
        console.log(test);
        setSuccessAlert(true);

        setTimeout(() => {
          window.location.href = "/";
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
      role: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid>
          <Grid align="center">
            <h2>Login</h2>
          </Grid>
          <FormControl
            required
            component="fieldset"
            error={formik.touched.role && Boolean(formik.errors.role)}
          >
            <FormLabel component="legend">You Are:</FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="role"
              defaultValue="top"
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="Client"
                control={<Radio color="primary" />}
                label="Client"
              />
              <FormControlLabel
                value="Photographer"
                control={<Radio color="primary" />}
                label="Photographer"
              />
            </RadioGroup>
            <FormHelperText>
              {formik.touched.role && formik.errors.role}
            </FormHelperText>
          </FormControl>
          <div className={classes.formContainer}>
            <Grid container spacing={3}>
              <TextField
                className={classes.inputField}
                required
                label="Email"
                name="email"
                value={formik.values.email}
                variant="outlined"
                autoFocus
                onChange={(e) => formik.setFieldValue("email", e.target.value)}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                className={classes.inputField}
                required
                name="password"
                label="Password"
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
                        {showPasswordValue ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                className={classes.btn}
                type="submit"
                variant="contained"
                fullWidth
                onClick={formik.handleSubmit}
              >
                Sign in
              </Button>

              <Grid style={{ marginTop: "25px" }}>
                <Typography>Don't have an account?</Typography>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.regBtn}
                  onClick={handleClickOpen}
                >
                  Register
                </Button>
                <div>
                  {successAlert ? (
                    <Snackbar open={successAlert} autoHideDuration={2000}>
                      <Alert severity="success">Successfully logged in!</Alert>
                    </Snackbar>
                  ) : (
                    <Snackbar open={errorAlert} autoHideDuration={2000}>
                      <Alert severity="error">Wrong email or password!</Alert>
                    </Snackbar>
                  )}
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Register as Client or Photographer?"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Button onClick={handleClickClose} color="primary">
            <Link
              to="/signup-cl"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Client
            </Link>
          </Button>
          <Button onClick={handleClickClose} color="primary" autoFocus>
            <Link
              to="/signup-ph"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Photographer
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
