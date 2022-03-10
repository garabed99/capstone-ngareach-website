//contains PERSONAL Details
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  OutlinedInput,
  TextField,
  Typography,
} from "@material-ui/core";

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
});

export default function StepTwo() {
  const classes = useStyles();


  return (
    <div className={classes.mainContainer}>
      <Typography variant="h5" style={{ color: "#999", textAlign: "center" }}>
        Fill in your personal details
      </Typography>
      <div className={classes.formContainer}>

        <form>
          <TextField
            style={{ width: "100%", marginBottom: "1rem" }}
            label="Last Name"
            variant="outlined"
          />
          <IntlTelInput preferredCountries={["am"]} />
        </form>
      </div>
    </div>
  );
}
