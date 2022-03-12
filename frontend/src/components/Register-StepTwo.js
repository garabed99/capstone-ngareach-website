//contains PERSONAL Details
import {
  Button,
  // Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  // Grid,
  // InputLabel,
  makeStyles,
  // OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import {SendSharp } from "@material-ui/icons";

import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { useState } from "react";


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
  const [_firstName, setFirstName] = useState("");
  const [_lastName, setLastName] = useState("");
  const [_gender, setgender] = useState("");
  const [_phoneNum, setPhoneNum] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date("1999-01-14T11:11:11")
  );

  const classes = useStyles();

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
          />
          <TextField
            className={classes.inputField}
            required
            label="Last Name"
            variant="outlined"
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
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
          />

          <FormLabel>Phone Number</FormLabel>

          <IntlTelInput label="Phone" preferredCountries={["am"]} />
          <>
            <Button
              className={classes.btn}
              variant="contained"
              type="submit"
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
