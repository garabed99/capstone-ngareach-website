import {
  Button,
  CardMedia,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
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
import blankProfile from "../../imgs/blank-profile.png";
import itemData from "./itemData";

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
    height: "140vh",
    maxHeight: "160vh",
    width: "80vw",
    margin: "40px auto",
  },
  portfolioRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
    marginTop: "150px",
    // backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  // title: {
  //   color: theme.palette.primary.light,
  // },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
});

export default function ProfilePh() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [photographerData, setPhotographerData] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const param = useParams();
  const id = param.id;
  // const portfolioObj = { ...portfolio };
  useEffect(() => {
    fetchPhotographerData();
  }, []);

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

    axios
      .get(`http://localhost:4000/photographers/profilepicture/${id}`, {
        responseType: "blob",
      })
      .then((res) => {
        for(let i =0; i < res.length; i++) {
          
        }
        const url = window.URL.createObjectURL(new Blob([res.data]));
        setProfilePicture(url);
        console.log(url);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:4000/photographers/portfolio/${id}`, {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        setPortfolio(url);
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
                className={classes.profilePic}
                image={profilePicture ? profilePicture : blankProfile}
                title={`${photographerData.firstName} ${photographerData.lastName}`}
              />
              {console.log(portfolio)}
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
            {/* <Grid container item xs={6} direction="column">

            </Grid> */}
          </Grid>
          <div className={classes.portfolioRoot}>
            <ImageList className={classes.imageList} cols={2.5} gap={3}>
              {/* {portfolio.map((item) => (
                <ImageListItem key={item.img}>
                  <img src={item.img} alt={item.title} />
                  <ImageListItemBar
                    title={item.title}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                    }}
                  />
                </ImageListItem>
              ))} */}
            </ImageList>
          </div>
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
