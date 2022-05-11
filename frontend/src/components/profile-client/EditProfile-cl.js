import {
  Button,
  FormLabel,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  CardMedia,
} from "@material-ui/core";
import { Visibility, VisibilityOff, SendSharp } from "@material-ui/icons";

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import blankProfile from "../../imgs/blank-profile.png";

const useStyles = makeStyles({
  mainContainer: {
    display: "grid",
    justifyContent: "center",
    position: "relative",
  },
  formContainer: {
    position: "relative",
    width: "60rem",
    paddingTop: "2rem",
    marginLeft: "100px",
    marginRight: "100px",
  },
  inputField: {
    position: "relative",
    width: "100%",
    marginBottom: "10px",
  },
  btn: {
    width: "30%",
    height: "3rem",
    background: "#42a5f5",
    color: "white",
    marginTop: "25px",
    float: "right",
  },
  profilePic: {
    width: 250,
    height: 250,
  },
  paperStyle: {
    padding: 20,
    height: "95vh",
    maxHeight: "120vh",
    width: 1200,
    margin: "40px auto",
  },
});

export default function EditProfileCl() {
  const classes = useStyles();

  const param = useParams();
  const id = param.id;

  const [existingClientData, setExistingClientData] = useState([]);
  const [newEmail, setNewEmail] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newFirstName, setNewFirstName] = useState();
  const [newLastName, setNewLastName] = useState();
  const [newPhone, setNewPhone] = useState();
  const [newProfilePicture, setNewProfilePicture] = useState();

  useEffect(() => {
    fetchClientData();
  }, []);

  function fetchClientData() {
    axios
      .get(`http://localhost:4000/clients/${id}`)
      .then((res) => {
        console.log("array of client Data", res.data);

        if (res.data._id === id) {
          setExistingClientData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [showOldPasswordValue, setOldPasswordValue] = useState({
    showOldPassword: false,
  });
  const [showNewPasswordValue, setNewPasswordValue] = useState({
    showNewPassword: false,
  });

  const handleClickShowOldPassword = () =>
    setOldPasswordValue(!showOldPasswordValue);
  const handleClickShowNewPassword = () =>
    setNewPasswordValue(!showNewPasswordValue);

  function handleSubmit(e) {
    e.preventDefault();
    if (oldPassword === newPassword) {
      alert("Same Password!");
      throw new Error("Same Password!");
    }

    const data = {
      email: newEmail,
      password: newPassword,
      firstName: newFirstName,
      lastName: newLastName,
      phone: newPhone,
      profilePicture: newProfilePicture,
    };
    console.log(data);
    axios
      .patch(`http://localhost:4000/clients/${id}`, data)
      .then(() => {
        alert("Updated profile successfully");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  return (
    <>
      <div key={existingClientData._id}>
        <Paper elevation={10} className={classes.paperStyle}>
          <Grid>
            <Grid align="center" style={{ marginBottom: 10 }}>
              <h2 style={{ marginBottom: "0px" }}>Edit Profile</h2>
              <h1 style={{ marginBottom: "20px" }}>
                {existingClientData.firstName} {existingClientData.lastName}
              </h1>
            </Grid>

            <div className={classes.formContainer}>
              <Grid container spacing={3}>
                <Grid container item xs={4} direction="column">
                  <FormLabel style={{ marginBottom: "10px" }}>
                    Profile Picture
                  </FormLabel>
                  <CardMedia
                    className={classes.profilePic}
                    image={
                      !existingClientData.profilePicture
                        ? blankProfile
                        : existingClientData.profilePicture
                    }
                    title={`${existingClientData.firstName} ${existingClientData.lastName}`}
                  />
                  [upload image button here]
                </Grid>

                <Grid container item xs={4} direction="column">
                  <FormLabel style={{ marginBottom: "10px" }}>
                    Account Details
                  </FormLabel>
                  <TextField
                    className={classes.inputField}
                    required
                    label="Change Email"
                    name="email"
                    variant="outlined"
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                  <TextField
                    className={classes.inputField}
                    required
                    name="password"
                    label="Old Password"
                    variant="outlined"
                    type={showOldPasswordValue ? "password" : "text"}
                    onChange={(e) => setOldPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowOldPassword}
                          >
                            {showOldPasswordValue ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    className={classes.inputField}
                    required
                    name="newPassword"
                    label="New Password"
                    variant="outlined"
                    type={showNewPasswordValue ? "password" : "text"}
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                          >
                            {showNewPasswordValue ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <br />
                </Grid>

                <Grid container item xs={4} direction="column">
                  <FormLabel style={{ marginBottom: "10px" }}>
                    Personal Details
                  </FormLabel>
                  <TextField
                    className={classes.inputField}
                    required
                    name="firstName"
                    label="Change First Name"
                    variant="outlined"
                    onChange={(e) => setNewFirstName(e.target.value)}
                  />
                  <TextField
                    className={classes.inputField}
                    required
                    name="lastName"
                    label="Change Last Name"
                    variant="outlined"
                    onChange={(e) => setNewLastName(e.target.value)}
                  />
                  <TextField
                    className={classes.inputField}
                    required
                    name="phone"
                    label="Change Phone Number"
                    placeholder="+374 77418529"
                    variant="outlined"
                    onChange={(e) => setNewPhone(e.target.value)}
                  />
                </Grid>
                <div style={{ width: "100%" }}>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                    endIcon={<SendSharp />}
                  >
                    Update
                  </Button>
                </div>
              </Grid>
            </div>
          </Grid>
        </Paper>
      </div>
    </>
  );
}
