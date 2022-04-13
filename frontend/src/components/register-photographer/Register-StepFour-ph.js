import {
  Button,
  // Checkbox,
  FormControl,
  // Grid,
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
import { Link, useNavigate } from "react-router-dom";

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

export default function StepFour() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <div className={classes.mainContainer}>
        <Typography
          variant="h5"
          style={{ color: "black", textAlign: "center" }}
        >
          Registeration Completed!
        </Typography>
        <div className={classes.formContainer}>
          <Button
            className={classes.btn}
            variant="contained"
            // onClick={handleRedirect}
            onClick={() => navigate(`/home`)}
            endIcon={<SendSharp />}
          >
            DONE
          </Button>
        </div>
      </div>
    </>
  );
}
