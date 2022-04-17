import React from "react";
import {
  Grid,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [open, setOpen] = useState(false);

  const [_email, setEmail] = useState("");
  const [_password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const loginData = {
      email: _email,
      password: _password,
    };

    console.log(loginData);
    // axios
    //   .post("http://localhost:4000/auth/login", loginData)
    //   .then((res) => {
    //     console.log(res);
    //     alert("Successfully added Career Data");
    //   });
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClickClose() {
    setOpen(false);
  }

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 300,
    margin: "100px auto",
  };

  const btnstyle = { margin: "8px 0" };
  return (
    <>
      <form>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <h2>Login</h2>
            </Grid>

            <TextField
              label="Email"
              fullWidth
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              onClick={handleSubmit}
            >
              Sign in
            </Button>
            <Typography>
              {/* <Link href="#">Forgot password?</Link> */}
            </Typography>

            {/* DIALOG OF NEED ACCOUNT */}

            <Typography>Don't have an account?</Typography>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              onClick={handleClickOpen}
            >
              Register
            </Button>

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
                    to="/register-cl"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Client
                  </Link>
                </Button>
                <Button onClick={handleClickClose} color="primary" autoFocus>
                  <Link
                    to="/register-ph"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Photographer
                  </Link>
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Grid>
      </form>
    </>
  );
}
