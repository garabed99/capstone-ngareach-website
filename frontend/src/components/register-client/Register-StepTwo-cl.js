//contains PERSONAL Details
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { SendSharp } from "@material-ui/icons";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import axios from "axios";
import { useState } from "react";

import StepOne from "./Register-StepOne-cl";

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

export default function StepTwo() {
  const classes = useStyles();

  const [_firstName, setFirstName] = useState("");
  const [_lastName, setLastName] = useState("");
  const [_gender, setGender] = useState("");
  const [_dateOfBirth, setDateOfBirth] = useState(
    new Date("1999-01-14T11:11:11")
  );
  const [_phoneNum, setPhoneNum] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const personalData = {
      firstName: _firstName,
      lastName: _lastName,
      gender: _gender,
      dateOfBirth: _dateOfBirth,
      phoneNum: _phoneNum,
    };
    console.log(personalData);

    localStorage.setItem("clientData", JSON.stringify(personalData));
    const sessionData = localStorage.getItem("clientData");
    console.log(sessionData);

    axios
      .post("http://localhost:4000/clients", personalData)
      .then((res) => {
        alert("Successfully added Career Data");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={classes.mainContainer}>
      <Typography variant="h5" style={{ color: "#999", textAlign: "center" }}>
        Fill in your personal details
      </Typography>
      <div className={classes.formContainer}>
        <form>
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
          />
          <>
            <Button
              className={classes.btn}
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              endIcon={<SendSharp />}
            >
              Submit
            </Button>
          </>
        </form>
      </div>
    </div>
  );
}
