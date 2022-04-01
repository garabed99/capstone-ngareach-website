import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./styles/NavBar.css";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <div className="main-container">
        <AppBar position="sticky">
          <Toolbar>
            <div className="logo-container">
              <Typography variant="h6">Ngareach</Typography>
            </div>
            <div className="metaData-container">
              <div className="page-route">
                <Button>
                  <Link
                    to="/home"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Home
                  </Link>
                </Button>
              </div>
              <div className="page-route">
                <Button>
                  <Link
                    to="/howitworks"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    How It Works
                  </Link>
                </Button>
              </div>
              <div className="page-route">
                <Button>
                  <Link
                    to="/reviews"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Reviews
                  </Link>
                </Button>
              </div>
              <div className="page-route">
                <Button>
                  <Link
                    to="/pricing"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Pricing
                  </Link>
                </Button>
              </div>
              <div className="page-route">
                <Button>
                  <Link
                    to="/photographerslist"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Our Photographers
                  </Link>
                </Button>
              </div>
            </div>

            <div className="registration-container">
              <Button>
                <Link
                  to="/login"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  Login
                </Link>
              </Button>

              <Button
                style={{ color: "inherit", textDecoration: "inherit" }}
                onClick={handleClickOpen}
              >
                Register
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Register as Client or Photographer?"}
                </DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions style={{justifyContent: "center", alignItems: "center"}}>
                  <Button onClick={handleClose} color="primary">
                  <Link
                  to="/register-cl"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  Client
                </Link>
                  </Button>
                  <Button onClick={handleClose} color="primary" autoFocus>
                  <Link
                  to="/register-ph"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  Photographer
                </Link>
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
