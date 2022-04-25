import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Hidden,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import { useState } from "react";

export default function NavBar() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  function handleClickOpen() {
    setOpenDialog(true);
  }

  function handleClickClose() {
    setOpenDialog(false);
  }

  return (
    <>
      <div className="main-container">
        <AppBar position="sticky">
          <Toolbar>
            <div className="logo-container">
              <Typography variant="h5" style={{ color: "black" }}>
                Նկաreach
              </Typography>
            </div>
            <Hidden xsDown>
              <div className="metaData-container">
                <div className="page-route">
                  <Button>
                    <Link
                      to="/home"
                      style={{ color: "white", textDecoration: "inherit" }}
                    >
                      Home
                    </Link>
                  </Button>
                </div>
                <div className="page-route">
                  <Button>
                    <Link
                      to="/howitworks"
                      style={{ color: "white", textDecoration: "inherit" }}
                    >
                      How It Works
                    </Link>
                  </Button>
                </div>
                <div className="page-route">
                  <Button>
                    <Link
                      to="/reviews"
                      style={{ color: "white", textDecoration: "inherit" }}
                    >
                      Reviews
                    </Link>
                  </Button>
                </div>
                <div className="page-route">
                  <Button>
                    <Link
                      to="/pricing"
                      style={{ color: "white", textDecoration: "inherit" }}
                    >
                      Pricing
                    </Link>
                  </Button>
                </div>
                <div className="page-route">
                  <Button>
                    <Link
                      to="/photographerslist"
                      style={{ color: "white", textDecoration: "inherit" }}
                    >
                      Our Photographers
                    </Link>
                  </Button>
                </div>
              </div>
            </Hidden>
            <Hidden smUp>
              <IconButton>
                <MenuIcon
                  style={{ color: "white" }}
                  onClick={() => setOpenDrawer(true)}
                />
              </IconButton>
            </Hidden>

            <div className="registration-container">
              <Button
                style={{ color: "white", textDecoration: "inherit" }}
                onClick={handleClickOpen}
              >
                Register
              </Button>
              <Dialog
                open={openDialog}
                onClose={handleClickClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Register as Client or Photographer?"}
                </DialogTitle>
                <DialogContent></DialogContent>
                <DialogActions
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Button onClick={handleClickClose} color="primary">
                    <Link
                      to="/signup-cl"
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      Client
                    </Link>
                  </Button>
                  <Button onClick={handleClickClose} color="primary">
                    <Link
                      to="/signup-ph"
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      Photographer
                    </Link>
                  </Button>
                  <Button onClick={handleClickClose} color="primary">
                    <Link
                      to="/login"
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      Already Have Account
                    </Link>
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Toolbar>
          <SwipeableDrawer
            anchor="left"
            open={openDrawer}
            onOpen={() => setOpenDrawer(true)}
            onClose={() => setOpenDrawer(false)}
          >
            <div>
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>
            </div>

            <Divider />
            <Button>
              <Link
                to="/home"
                style={{ color: "blue", textDecoration: "inherit" }}
              >
                Home
              </Link>
            </Button>
            <Button>
              <Link
                to="/howitworks"
                style={{ color: "blue", textDecoration: "inherit" }}
              >
                How It Works
              </Link>
            </Button>
            <Button>
              <Link
                to="/reviews"
                style={{ color: "blue", textDecoration: "inherit" }}
              >
                Reviews
              </Link>
            </Button>
            <Button>
              <Link
                to="/pricing"
                style={{ color: "blue", textDecoration: "inherit" }}
              >
                Pricing
              </Link>
            </Button>
            <Button>
              <Link
                to="/photographerslist"
                style={{ color: "blue", textDecoration: "inherit" }}
              >
                Our Photographers
              </Link>
            </Button>
          </SwipeableDrawer>
        </AppBar>
      </div>
    </>
  );
}
