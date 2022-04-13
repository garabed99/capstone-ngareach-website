import {
  makeStyles,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";

import { useState } from "react";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function PhotographerCard() {
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClickClose() {
    setOpen(false);
  }
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Profile Picture"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Photographer Name
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Description
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClickOpen}>
            Contact Details
          </Button>
          <Dialog
            open={open}
            onClose={handleClickClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Contact Details"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Email:
                <br />
                Phone number:
                <br />
                Website:
              </DialogContentText>
            </DialogContent>
            <DialogActions
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Button onClick={handleClickClose} color="primary"></Button>
              <Button
                onClick={handleClickClose}
                color="primary"
                autoFocus
              ></Button>
            </DialogActions>
          </Dialog>
          <Button size="small" color="primary">
            Visit Portfolio
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
