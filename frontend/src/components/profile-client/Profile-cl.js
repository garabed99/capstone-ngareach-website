import {
  CardMedia,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import blankProfile from "../../imgs/blank-profile.png";

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
  profilePic: {
    width: 250,
    height: 250,
  },
  paperStyle: {
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 20,
    height: "80vh",
    maxHeight: "130vh",
    width: "40vw",
    margin: "40px auto",
  },
});

export default function ProfileCl() {
  const classes = useStyles();

  const [clientData, setClientData] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const param = useParams();
  const id = param.id;

  useEffect(() => {
    fetchClientData();
  }, []);

  function fetchClientData() {
    axios
      .get(`http://localhost:4000/clients/${id}`)
      .then((res) => {
        console.log("array of clients Data", res.data);

        if (res.data._id === id) {
          setClientData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:4000/clients/profilepicture/${id}`, {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        setProfilePicture(url);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  return (
    <>
      <div key={clientData._id}>
        <Paper elevation={10} className={classes.paperStyle}>
          <h1 style={{ marginBottom: "20px" }}>
            {clientData.firstName} {clientData.lastName}
          </h1>
          <Grid container spacing={3} item xs={12} direction="row">
            <Grid container item xs={6} direction="column">
              <CardMedia
                className={classes.profilePic}
                image={profilePicture ? profilePicture : blankProfile}
                title={`${clientData.firstName} ${clientData.lastName}`}
              />
            </Grid>
            <Grid container item xs={6} direction="column">
              <Typography style={{ marginBottom: "15px", fontSize: "24px" }}>
                <b>Contact Info</b>
              </Typography>
              <div>
                <EmailIcon fontSize="medium" />
                &nbsp;
                <b>Email:</b> {clientData.email}
              </div>
              <div>
                <PhoneIcon fontSize="medium" />
                &nbsp;
                <b>Phone number:</b> {clientData.phone}
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}
