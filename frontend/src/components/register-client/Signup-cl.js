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
    marginTop: "25px"
  },
  paperStyle: {
    padding: 20,
    height: "70vh",
    // maxWidth: ,
    width: 500,
    margin: "40px auto",
  },
});

export default function Login() {
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

  function handleSubmit(e) {
    e.preventDefault();

    const clientData = {
      email: _email,
      password: _password,
      confirmPassword: _confirmPassword,
      firstName: _firstName,
      lastName: _lastName,
      gender: _gender,
      dateOfBirth: _dateOfBirth,
      phoneNum: _phoneNum,
    };

    localStorage.setItem("clientData", JSON.stringify(clientData));
    const sessionData = localStorage.getItem("clientData");
    console.log(sessionData);

    axios
      .post("http://localhost:4000/clients", clientData)
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
            <h2>Register as Client</h2>
          </Grid>

          <div className={classes.formContainer}>
            <Grid container spacing={3}>
              <Grid container item xs={6} direction="column">
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

                <br />

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

                <FormLabel>Phone Number</FormLabel>

                <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry="AM"
                  value={_phoneNum}
                  onChange={setPhoneNum}
                  style={{ width: "200px", font: "20px" }}
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
