//contains CAREER Details
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SendSharp } from "@material-ui/icons";

import axios from "axios";
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
  const classes = useStyles();

  const [_yearsOfExp, setYearsOfExp] = useState("");
  const [_bio, setBio] = useState("");
  const [_photographyTypes, setPhotographyTypes] = useState([]);
  const [_imgFile, setImgFile] = useState("");
  const [_instagramLink, setInstagramLink] = useState("");
  const [_facebookLink, setFacebookLink] = useState("");
  const [_websiteLink, setWebsiteLink] = useState("");

  const handleDelete = (chipToDelete) => () => {
    setPhotographyTypes((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  function handleSubmit(e) {
    e.preventDefault();

    const careerData = {
      yearsOfExp: _yearsOfExp,
      bio: _bio,
      photographyTypes: _photographyTypes,
      imgFile: _imgFile,
      facebookLink: _facebookLink,
      instagramLink: _instagramLink,
      websiteLink: _websiteLink,
    };
    console.log(careerData);
    // axios
    //   .post("http://localhost:4000/photographers", careerData)
    //   .then((res) => {
    //     alert("Successfully added Career Data");
    //   });
  }
  return (
    <div className={classes.mainContainer}>
      <Typography variant="h5" style={{ color: "#999", textAlign: "center" }}>
        Fill in your career details
      </Typography>
      <div className={classes.formContainer}>
        <form>
          {/* <div className={classes.inputField}> */}
          <Autocomplete
            className={classes.inputField}
            id="tags-standard"
            options={yearsOfExperience}
            getOptionLabel={(option) => option.year}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Years of Experience"
                placeholder="Add Years"
              />
            )}
            onChange={(e, v) => setYearsOfExp(v.year)}
          />
          {/* </div> */}

          <TextField
            className={classes.inputField}
            multiline
            label="Biography"
            variant="outlined"
            onChange={(e) => setBio(e.target.value)}
          />

          <div className={classes.root}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={photographyTypes}
              getOptionLabel={(option) => option.genre}
              defaultValue={[photographyTypes[2]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Photography Types"
                  placeholder="Add More"
                />
              )}
              onChange={(e, v) => setPhotographyTypes(v)}
            />
          </div>

          <br />

          <TextField
            className={classes.inputField}
            label="Instagram link"
            variant="outlined"
            onChange={(e) => setInstagramLink(e.target.value)}
          />

          <TextField
            className={classes.inputField}
            label="Facebook link"
            variant="outlined"
            onChange={(e) => setFacebookLink(e.target.value)}
          />

          <TextField
            className={classes.inputField}
            label="Personal website link"
            variant="outlined"
            onChange={(e) => setWebsiteLink(e.target.value)}
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
const yearsOfExperience = [
  { year: "Less than a year" },
  { year: "One to three years" },
  { year: "Three to five years" },
  { year: "More than five years" },
];

const photographyTypes = [
  { genre: "Pet" },
  { genre: "Wildlife" },
  { genre: "Fashion" },
  { genre: "Sports" },
  { genre: "Architecture" },
  { genre: "Real estate" },
  { genre: "Food" },
  { genre: "Vehicle" },
  { genre: "Advertising" },
  { genre: "Aerial" },
  { genre: "Landscape" },
  { genre: "Panoramic" },
  { genre: "Underwater" },
  { genre: "Family" },
  { genre: "Baby and child" },
  { genre: "Newborn" },
  { genre: "Portrait" },
  { genre: "Branding" },
  { genre: "Erotic" },
  { genre: "Concert" },
  { genre: "Fine art" },
  { genre: "Street" },
  { genre: "Wedding" },
  { genre: "Birthday" },
  { genre: "Baptism" },
  { genre: "Travel" },
  { genre: "Photojournalism" },
  { genre: "Press" },
  { genre: "Stock" },
  { genre: "Paparazzi" },
  { genre: "Macro" },
  { genre: "Micro" },
  { genre: "Film" },
  { genre: "Astrophotography" },
  { genre: "Graduation" },
];
