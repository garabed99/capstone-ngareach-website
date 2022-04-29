import {
  makeStyles,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";

import { useState, useEffect } from "react";
import axios from "axios";
import background from "../../imgs/background.jpg";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  },
  gridContainer: {
    marginLeft: "10px",
    marginBottom: "50px",
  },
  media: {
    width: 350,
    height: 200,
  },
  btn: {
    backgroundColor: "white",
    color: "primary",
    "&:hover": {
      backgroundColor: "blue",
      color: "white",
    },
  },
});

export default function PhotographerCard() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [photographers, setPhotographers] = useState([]);
  const [dialogData, setDialogData] = useState(null);
  //state for dialog

  useEffect(() => {
    fetchPhotographers();
  }, []);

  function fetchPhotographers() {
    axios
      .get("http://localhost:4000/photographers")
      .then((res) => {
        console.log("array of photographers", res.data);
        setPhotographers(res.data);
        // setDialogData(res.data);
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
      <Grid>
        <Grid
          container
          spacing={3}
          className={classes.gridContainer}
          justifyContent="center"
        >
          {photographers.map((photographer) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={photographer._id}>
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image={background}
                    title={`${photographer.firstName} ${photographer.lastName}`}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {photographer.firstName} {photographer.lastName}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      component="p"
                      noWrap
                    >
                      {photographer.biography}
                    </Typography>
                    <br />
                    <Typography>
                      <b>Photography type:</b> {photographer.photographyTypes}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button fullWidth size="large" color="primary">
                      <Link
                        to={`/photographer/${photographer._id}`}
                        style={{ color: "primary", textDecoration: "inherit" }}
                      >
                        Visit Portfolio
                      </Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      {/* <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{"Contact Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>Email:</b> some email
            <br />
            <b>Phone number:</b> +374684351
            <br />
            <b>Instagram:</b> @instagram
          </DialogContentText>
        </DialogContent>
      </Dialog> */}
    </>
  );
}
