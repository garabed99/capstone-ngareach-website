//contains ACCOUNT Details
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  TextField,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff, SendSharp } from "@material-ui/icons";

import axios from "axios";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  mainContainer: {
    display: "grid",
    justifyContent: "center",
    position: "relative",
    zIndex: 9,
  },
  formContainer: {
    position: "relative",
    width: "28.125rem",
    height: "auto",
    padding: "2rem",
  },
  inputField: { position: "relative", width: "100%", marginBottom: "1rem" },
  btn: {
    width: "100%",
    height: "3rem",
    background: "#42a5f5",
    color: "white",
  },
});

export default function StepOne(props) {
  const classes = useStyles();

  const [_email, setEmail] = useState("");
  const [_password, setPassword] = useState("");
  const [_confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const accountData = {
      email: _email,
      password: _password,
      confirmPassword: _confirmPassword,
    };
    // console.log(accountData);

    localStorage.setItem("clientData", JSON.stringify(accountData));
    const sessionData = localStorage.getItem("clientData");
    console.log(sessionData);

    axios
      .post("http://localhost:4000/clients", accountData)
      .then((res) => {
        alert("Successfully added Account Data");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkValidation(e) {
    setConfirmPassword(e.target.value);

    if (_password === _confirmPassword) {
    }
  }

  // useEffect(() => {}, [registerData]);

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
    <div className={classes.mainContainer}>
      <Typography variant="h5" style={{ color: "#999", textAlign: "center" }}>
        Register with Email
      </Typography>
      <div className={classes.formContainer}>
        <form>
          <TextField
            className={classes.inputField}
            required
            label="Email"
            variant="outlined"
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
                showCreatePasswordValue.showCreatePassword ? "text" : "password"
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
          <>
            <Button
              className={classes.btn}
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              endIcon={<SendSharp />}
            >
              REGISTER
            </Button>
          </>
        </form>
      </div>
    </div>
  );
}
