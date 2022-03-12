//contains CAREER Details
import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SendSharp } from "@material-ui/icons";

import { useState } from "react";

const useStyles = makeStyles((theme) => ({
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
  chip: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  btn: {
    width: "100%",
    height: "3rem",
    background: "#42a5f5",
    color: "white",
  },
}));

export default function StepThree() {
  const [_photographyTypes, setPhotographyTypes] = useState([]);
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <Typography variant="h5" style={{ color: "#999", textAlign: "center" }}>
        Fill in your career details
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
          <div className={classes.root}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={photographyTypes}
              getOptionLabel={(option) => option.title}
              defaultValue={[photographyTypes[2]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  required
                  label="Photography Types"
                  placeholder="Add More"
                />
              )}
            />
          </div>

          <br />

          {/* <TextField
              className={classes.inputField}
              id="dob"
              label="Date Of Birth"
              type="date"
              defaultValue="1999-01-14"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            /> */}

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
const photographyTypes = [
  { title: "Pet" },
  { title: "Wildlife" },
  { title: "Fashion" },
  { title: "Sports" },
  { title: "Architecture" },
  { title: "Real estate" },
  { title: "Food" },
  { title: "Vehicle" },
  { title: "Advertising" },
  { title: "Aerial" },
  { title: "Landscape" },
  { title: "Panoramic" },
  { title: "Underwater" },
  { title: "Family" },
  { title: "Baby and child" },
  { title: "Newborn" },
  { title: "Portrait" },
  { title: "Branding" },
  { title: "Erotic" },
  { title: "Concert" },
  { title: "Fine art" },
  { title: "Street" },
  { title: "Wedding" },
  { title: "Birthday" },
  { title: "Baptism " },
  { title: "Travel " },
  { title: "Photojournalism" },
  { title: "Press" },
  { title: "Stock" },
  { title: "Paparazzi" },
  { title: "Macro" },
  { title: "Micro" },
  { title: "Film" },
  { title: "Astrophotography" },
];
