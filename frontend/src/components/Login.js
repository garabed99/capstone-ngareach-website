import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Paper,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

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
});

export default function Login() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
    localStorage.setItem("values", JSON.stringify(values));
    const sessionData = localStorage.getItem("values");
    console.log(sessionData);

    const { email, password } = values;

    axios
      .post("http://localhost:4000/auth/login", { email, password })
      .then((res) => {
        alert("Successfully logged in account!");
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  const clientFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  console.log(clientFormik.errors);
  console.log(clientFormik.values);

  return (
    <>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid>
          <Grid align="center">
            <h2>Login</h2>
          </Grid>

          <div className={classes.formContainer}>
            <Grid container spacing={3}>
              <TextField
                className={classes.inputField}
                required
                label="Email"
                name="email"
                value={clientFormik.values.email}
                variant="outlined"
                autoFocus
                onChange={(e) =>
                  clientFormik.setFieldValue("email", e.target.value)
                }
                error={
                  clientFormik.touched.email &&
                  Boolean(clientFormik.errors.email)
                }
                helperText={
                  clientFormik.touched.email && clientFormik.errors.email
                }
              />
              <TextField
                className={classes.inputField}
                required
                name="password"
                label="Create Password"
                variant="outlined"
                type={showPasswordValue ? "password" : "text"}
                onChange={(e) =>
                  clientFormik.setFieldValue("password", e.target.value)
                }
                error={
                  clientFormik.touched.password &&
                  Boolean(clientFormik.errors.password)
                }
                helperText={
                  clientFormik.touched.password && clientFormik.errors.password
                }
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
                onClick={clientFormik.handleSubmit}
              >
                Sign in
              </Button>

              {/* DIALOG OF NEED ACCOUNT */}
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
