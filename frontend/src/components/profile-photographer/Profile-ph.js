import {
  Button,
  CardMedia,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import HttpIcon from "@material-ui/icons/Http";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import background from "../../imgs/background.jpg";

const useStyles = makeStyles({
  mainContainer: {
    display: "grid",
    justifyContent: "center",
    position: "relative",
  },
  formContainer: {
    position: "relative",
    width: "20rem",
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
    marginTop: "25px",
  },
  regBtn: {
    width: "100%",
    height: "3rem",
    background: "#42a5f5",
    color: "white",
    marginTop: "5px",
  },
  media: {
    width: 350,
    height: 200,
  },
  paperStyle: {
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 20,
    height: "140vh",
    maxHeight: "160vh",
    // maxWidth: ,
    width: "80vw",
    margin: "40px auto",
  },
});

export default function ProfilePh() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [photographerData, setPhotographerData] = useState([]);
  const param = useParams();
  const id = param.id;

  useEffect(() => {
    fetchPhotographerData();
  });

  function fetchPhotographerData() {
    axios
      .get(`http://localhost:4000/photographers/${id}`)
      .then((res) => {
        // console.log("array of photographer Data", res.data);

        if (res.data._id === id) {
          setPhotographerData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClickClose() {
    setOpen(false);
  }

  return (
    <>
      <div key={photographerData._id}>
        <Paper elevation={10} className={classes.paperStyle}>
          <h1 style={{ marginBottom: "20px" }}>
            {photographerData.firstName} {photographerData.lastName}
          </h1>
          <Grid container spacing={3} item xs={12} direction="row">
            <Grid container item xs={6} direction="column">
              <CardMedia
                className={classes.media}
                image={background}
                title={`${photographerData.firstName} ${photographerData.lastName}`}
              />

              <Button
                style={{
                  marginTop: "10px",
                  background: "#42a5f5",
                  color: "white",
                  textDecoration: "inherit",
                  width: "25%",
                  variant: "contained",
                }}
                onClick={handleClickOpen}
              >
                Contact Info
              </Button>
              <h3>Years Of Experience:</h3>
              <Typography variant="body2">
                {photographerData.yearsOfExperience}
              </Typography>
              <h3>Price per hour:</h3>
              <Typography variant="body2">
                {photographerData.pricePerHour} AMD
              </Typography>
            </Grid>
            <Grid container item xs={6} direction="column">
              <h3>Biography</h3>
              <Typography variant="overline">
                {photographerData.biography}
              </Typography>
            </Grid>
            <Grid container item xs={6} direction="column">
              <h3>Biography</h3>
              <Typography variant="overline">
                {photographerData.biography}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Dialog
          open={open}
          onClose={handleClickClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>{"Contact Info"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <EmailIcon fontSize="medium" />
              &nbsp;
              <b>Email:</b> {photographerData.email}
              <br />
              <PhoneIcon fontSize="medium" />
              &nbsp;
              <b>Phone number:</b> {photographerData.phone}
              <br />
              <HttpIcon fontSize="medium" />
              &nbsp;
              <b>Website: </b>
              <a href={`${photographerData.websiteLink}`}>
                {photographerData.websiteLink}
              </a>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
