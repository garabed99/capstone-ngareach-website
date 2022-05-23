import {
  Box,
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
    width: "500px",
  },
  imageList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  "& MuiImageList-root-makeStyles-imageList-11": {
    width: "600px",
    height: "600px",
  },
});

export default function ProfilePh() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [photographerData, setPhotographerData] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [portfolio, setPortfolio] = useState(null);
  const param = useParams();
  const id = param.id;
  let images;

  useEffect(() => {
    fetchPhotographerData();
  }, []);

  useEffect(() => {}, [portfolio]);

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
        const url = window.URL.createObjectURL(new Blob([res.data]));
        setProfilePicture(url);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:4000/photographers/portfolio/${id}`)
      .then((res) => {
        console.log(res);
        let newURL = res.data.split("*");
        let filenames = newURL.map(
          (cur) => "./" + cur.substring(cur.indexOf("portfolio") + 10)
        );

        function importAll(r) {
          let images = {};
          r.keys().map((item, index) => {
            if (filenames.includes(item)) {
              images[item.replace("./", "")] = r(item);
            }
          });
          return images;
        }

        images = importAll(
          require.context(
            "../../../../backend/src/commons/images/photographers/portfolio",
            false,
            /\.(png|jpe?g|svg)$/
          )
        );
        setPortfolio(images);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function generateElements() {
    let photos = [];
    for (let key in portfolio) {
      photos.push(
        <ImageListItem key={key}>
          <img src={portfolio[key]} alt={"portfolio"} />
        </ImageListItem>
      );
    }
    return photos;
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
              <Box className={classes.portfolioRoot}>
                <ImageList className={classes.imageList} cols={3}>
                  {generateElements()}
                </ImageList>
              </Box>
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
