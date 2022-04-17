import React from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  OutlinedInput,
  Paper,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";

import { Visibility, VisibilityOff, SendSharp } from "@material-ui/icons";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

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

export default function Login() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [_email, setEmail] = useState("");
  const [_password, setPassword] = useState("");

  const [showPasswordValue, setPasswordValue] = useState({
    showPassword: false,
  });

  function handleSubmit(e) {
    e.preventDefault();

    const loginData = {
      email: _email,
      password: _password,
    };

    console.log(loginData);
    axios
      .post("http://localhost:4000/auth/login", loginData)
      .then((res) => {
        console.log(res);
        window.location.href = "/";
        alert("Successfully added Career Data");
      })
      .catch((error) => {
        alert("wrong details", error.message);
        console.log(error.message);
      });
  }
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClickClose() {
    setOpen(false);
  }

  const handleClickShowPassword = () => {
    setPasswordValue({
      showPassword: !showPasswordValue.showPassword,
    });
  };
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
                variant="outlined"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormControl
                className={classes.inputField}
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              >
                <InputLabel required>Password</InputLabel>
                <OutlinedInput
                  labelWidth={85}
                  type={showPasswordValue.showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={handleClickShowPassword}>
                        {showPasswordValue.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.btn}
                fullWidth
                onClick={handleSubmit}
              >
                Sign in
              </Button>

              {/* DIALOG OF NEED ACCOUNT */}
              <Grid style={{marginTop: "25px"}}>
                <Typography>Don't have an account?</Typography>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.regBtn}
                  onClick={handleClickOpen}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
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
          </div>
        </Grid>
      </Paper>
    </>
  );
}
