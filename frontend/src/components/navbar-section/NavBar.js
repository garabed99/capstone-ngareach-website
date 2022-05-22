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
  makeStyles,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import blankProfile from "../../imgs/blank-profile.png";

import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { useEffect, useState } from "react";
import axios from "axios";

const useStyles = makeStyles({
  clientLogo: {
    borderRadius: "4px",
    variant: "square",
  },
  photographerLogo: {
    borderRadius: "4px",
    variant: "square",
  },
});

export default function NavBar() {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [clientProfPic, setClientProfPic] = useState("");
  const [photographerProfPic, setPhotographerProfPic] = useState("");

  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("loggedUserInfo"));
  let isLogged = false;

  if (loggedUser) {
    isLogged = true;
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  function fetchUserData() {
    if (isLogged) {
      if (loggedUser.userInfo.role === "Client") {
        axios
          .get(
            `http://localhost:4000/clients/profilepicture/${loggedUser.userInfo.id}`,
            {
              responseType: "blob",
            }
          )
          .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            setClientProfPic(url);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .get(
            `http://localhost:4000/photographers/profilepicture/${loggedUser.userInfo.id}`,
            {
              responseType: "blob",
            }
          )
          .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            setPhotographerProfPic(url);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  function handleProfileOpen() {
    setOpenMenu(true);
  }

  function handleProfileClose() {
    setOpenMenu(false);
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
                      style={{
                        color: "white",
                        textDecoration: "inherit",
                      }}
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
                  <Button style={{}}>
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
                    <Button
                      style={{
                        color: "white",
                        fontSize: "16px",
                        textTransform: "unset",
                      }}
                      onClick={handleProfileOpen}
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      startIcon={
                        isLogged ? (
                          loggedUser.userInfo.role === "Client" ? (
                            <Avatar
                              className={classes.photographerLogo}
                              src={clientProfPic}
                            />
                          ) : (
                            <Avatar
                              className={classes.photographerLogo}
                              src={photographerProfPic}
                            />
                          )
                        ) : (
                          <Avatar src={blankProfile} />
                        )
                      }
                    >
                      {loggedUser.userInfo.firstName}
                    </Button>

                    <Menu
                      open={Boolean(openMenu)}
                      onClose={handleProfileClose}
                      anchorEl={openMenu}
                      getContentAnchorEl={null}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem
                        component={Link}
                        to={
                          loggedUser.userInfo.role === "Client"
                            ? `/client/${loggedUser.userInfo.id}`
                            : `/photographer/${loggedUser.userInfo.id}`
                        }
                        style={{ textDecoration: "none" }}
                      >
                        Profile
                      </MenuItem>

                      <MenuItem
                        component={Link}
                        to={
                          loggedUser.userInfo.role === "Client"
                            ? `/client/editprofile-cl/${loggedUser.userInfo.id}`
                            : `/photographer/editprofile-ph/${loggedUser.userInfo.id}`
                        }
                        style={{ textDecoration: "none" }}
                      >
                        My account
                      </MenuItem>

                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    style={{
                      color: "white",
                      textDecoration: "inherit",
                    }}
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
                        style={{
                          color: "inherit",
                          textDecoration: "inherit",
                        }}
                      >
                        Client
                      </Link>
                    </Button>
                    <Button onClick={handleClickClose} color="primary">
                      <Link
                        to="/signup-ph"
                        style={{
                          color: "inherit",
                          textDecoration: "inherit",
                        }}
                      >
                        Photographer
                      </Link>
                    </Button>
                    <Button onClick={handleClickClose} color="primary">
                      <Link
                        to="/login"
                        style={{
                          color: "inherit",
                          textDecoration: "inherit",
                        }}
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
                style={{
                  color: "blue",
                  textDecoration: "inherit",
                }}
              >
                How It Works
              </Link>
            </Button>
            <Button>
              <Link
                to="/pricing"
                style={{
                  color: "blue",
                  textDecoration: "inherit",
                }}
              >
                Pricing
              </Link>
            </Button>
            <Button>
              <Link
                to="/photographerslist"
                style={{
                  color: "blue",
                  textDecoration: "inherit",
                }}
              >
                Our Photographers
              </Link>
            </Button>
            <Divider />
            <br />
            {isLogged ? (
              <>
                <Button
                  style={{
                    color: "blue",
                    textTransform: "unset",
                    fontSize: "16px",
                  }}
                  onClick={handleProfileOpen}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  startIcon={
                    isLogged ? (
                      loggedUser.userInfo.role === "Client" ? (
                        <Avatar
                          className={classes.photographerLogo}
                          src={clientProfPic}
                        />
                      ) : (
                        <Avatar
                          className={classes.photographerLogo}
                          src={photographerProfPic}
                        />
                      )
                    ) : (
                      <Avatar src={blankProfile} />
                    )
                  }
                >
                  {loggedUser.userInfo.firstName}
                </Button>
                <Menu
                  open={Boolean(openMenu)}
                  anchorEl={openMenu}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <Link
                    to={`/client/${loggedUser.userInfo.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <Link
                    to={`/client/${loggedUser.userInfo.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem>My account</MenuItem>
                  </Link>
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
          </SwipeableDrawer>
        </AppBar>
      </div>
    </>
  );
}
