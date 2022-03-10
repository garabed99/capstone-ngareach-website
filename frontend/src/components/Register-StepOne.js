//contains ACCOUNT Details

import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  TextField,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff, SendSharp } from "@material-ui/icons";

import { useState, useEffect } from "react";

const useStyles = makeStyles({
  mainContainer: {
    display: "grid",
    justifyContent: "center",
    position: "relative",
    zIndex: 5,
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

export default function StepOne() {
  const [_firstName, setFirstName] = useState("");
  const [_lasttName, setLastName] = useState("");
  const [_email, setEmail] = useState("");
  const [_password, setPassword] = useState("");
  const [_confirmPassword, setconfirmPassword] = useState("");

  const registerData = {
    firstName: _firstName,
    lastName: _lasttName,
    email: _email,
    password: _password,
    confirmPassword: _confirmPassword,
  };

  useEffect(() => {

  }, [registerData])
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

  const classes = useStyles();

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
            label="First Name"
            variant="outlined"
          />
          <TextField
            className={classes.inputField}
            required
            label="Last Name"
            variant="outlined"
          />
          <TextField
            className={classes.inputField}
            required
            label="Email"
            variant="outlined"
          />
          <FormControl className={classes.inputField} variant="outlined">
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
          <FormControl className={classes.inputField} variant="outlined">
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
