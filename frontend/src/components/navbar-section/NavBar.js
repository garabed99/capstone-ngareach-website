import {
  AppBar,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import background from "../../imgs/background.jpg";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { useState } from "react";

export default function NavBar() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const loggedUser = JSON.parse(sessionStorage.getItem("loggedUserInfo"));
  let isLogged = false;

  if (loggedUser) {
    isLogged = true;
  }

  function handleLogout() {
    sessionStorage.clear();
    navigate("/");
  }

  function handleProfileOpen() {
    setOpenProfile(true);
  }
  
  function handleProfileClose() {
    setOpenProfile(false);
  }

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

              <div className="registration-container">
                {isLogged ? (
                  <>
                    <Avatar src={background} />
                    <Button
                      style={{ color: "white" }}
                      onClick={handleProfileOpen}
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                    >
                      {loggedUser.userInfo.firstName}
                    </Button>
                    <Menu
                      open={Boolean(openProfile)}
                      onClose={handleProfileClose}
                      anchorEl={openProfile}
                      getContentAnchorEl={null}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <MenuItem>Profile</MenuItem>
                      <MenuItem>My account</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    style={{ color: "white", textDecoration: "inherit" }}
                    onClick={handleClickOpen}
                  >
                    Register
                  </Button>
                )}

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
            </Hidden>
            <Hidden smUp>
              <IconButton>
                <MenuIcon
                  style={{ color: "white" }}
                  onClick={() => setOpenDrawer(true)}
                />
              </IconButton>
            </Hidden>
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
            <Divider />
            <br />
            {isLogged ? (
              <Tooltip title="user">
                <Avatar style={{ alignSelf: "center" }} src={background} />
              </Tooltip>
            ) : (
              <Button
                style={{ color: "blue", textDecoration: "inherit" }}
                onClick={handleClickOpen}
              >
                Register
              </Button>
            )}
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
          </SwipeableDrawer>
        </AppBar>
      </div>
    </>
  );
}
