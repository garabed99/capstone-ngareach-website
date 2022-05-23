import "./styles/Home.css";
import background from "../imgs/background.jpg";
import axios from "axios";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    flexGrow: 1,
    // display: "flex",
  },
  gridContainer: {
    marginLeft: "10px",
    marginBottom: "50px",
    display: "flex",
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
export default function Home() {
  const classes = useStyles();

  const [photographers, setPhotographers] = useState([]);
  const [currentType, setCurrentType] = useState();
  const [firstName, setFirstName] = useState();
  const [pricePerHour, setPricePerHour] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  window.onunload = function () {
    sessionStorage.clear();
  };

  const fetchPhotographers = () => {
    if (currentType || firstName || pricePerHour) {
      axios
        .get("http://localhost:4000/photographers", {
          params: {
            photographyTypes: currentType,
            firstName: firstName,
            pricePerHour: pricePerHour,
          },
        })
        .then((res) => {
          console.log("array of photographers", res.data);
          sessionStorage.setItem("searchedData", JSON.stringify(res.data));

          setPhotographers(res.data);
          console.log("successsssss", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const searchedData = JSON.parse(sessionStorage.getItem("searchedData"));

  function handleSubmit(e) {
    e.preventDefault();

    let fd = new FormData(e.currentTarget);
    let getPhotographer = fd.get("photographer");
    let getEventType = fd.get("eventType");
    let getPricePerHour = fd.get("pricePerHour");
    // if (!getPhotographer || !getEventType || !getPricePerHour) return;
    if (getEventType === "Event Type") {
      getEventType = "";
    }
    if (pricePerHour === "") {
      getPricePerHour = "";
    }
    setSearchParams({
      photographer: getPhotographer,
      eventType: getEventType,
      pricePerHour: getPricePerHour,
    });
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          opacity: 0.9,
        }}
      >
        <div className="header">
          <h1>Welcome to Նկաreach!</h1>
          <h2>Reach out to your photographer today!</h2>
        </div>

        <div className="container">
          <form onSubmit={handleSubmit}>
            {/* <form> */}
            <div className="wrapper">
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="search-containter"
              >
                <Tooltip title="Only first letter Capital" placement="bottom">
                  <input
                    name="photographer"
                    type="search"
                    className="photographer-firstname"
                    placeholder="Photographer's First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    // onSubmit={(e) => setFirstName(e.target.value)}
                  />
                </Tooltip>

                <Tooltip title="Price in AMD with colon" placement="bottom">
                  <input
                    name="pricePerHour"
                    type="search"
                    className="pricePerHour"
                    placeholder="Price Per Hour"
                    value={pricePerHour}
                    onChange={(e) => setPricePerHour(e.target.value)}
                    // onSubmit={(e) => setFirstName(e.target.value)}
                  />
                </Tooltip>
                <select
                  name="eventType"
                  onChange={(e) => setCurrentType(e.target.value)}
                >
                  {photographyTypes.map((event) => (
                    <option value={event.genre}>{event.genre}</option>
                  ))}
                </select>

                <button id={"btn"} onClick={fetchPhotographers}>
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* <h1>{firstName}</h1> */}

        <Grid>
          <Grid
            container
            spacing={3}
            className={classes.gridContainer}
            justifyContent="center"
          >
            {searchedData
              ? searchedData.map((photographer) => {
                  return (
                    <Grid item xs={12} sm={6} md={3} key={photographer._id}>
                      <Card className={classes.root}>
                        <CardContent>
                          <Typography gutterBottom variant="h5">
                            {photographer.firstName} {photographer.lastName}
                          </Typography>

                          <br />
                          <Typography>
                            <b>Photography type: </b>
                            {photographer.photographyTypes}
                          </Typography>
                        </CardContent>

                        <CardActions>
                          <Button fullWidth size="large" color="primary">
                            <Link
                              to={`/photographer/${photographer._id}`}
                              style={{
                                color: "primary",
                                textDecoration: "inherit",
                              }}
                            >
                              Visit Portfolio
                            </Link>
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })
              : ""}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

const photographyTypes = [
  { genre: "Event Type" },
  { genre: "Advertising" },
  { genre: "Architecture" },
  { genre: "Astrophotography" },
  { genre: "Baby and child" },
  { genre: "Baptism" },
  { genre: "Birthday" },
  { genre: "Branding" },
  { genre: "Concert" },
  { genre: "Documentary" },
  { genre: "Erotic" },
  { genre: "Family" },
  { genre: "Fashion" },
  { genre: "Film" },
  { genre: "Fine art" },
  { genre: "Food" },
  { genre: "Graduation" },
  { genre: "Landscape" },
  { genre: "Macro" },
  { genre: "Micro" },
  { genre: "Panoramic" },
  { genre: "Paparazzi" },
  { genre: "Pet" },
  { genre: "Photojournalism" },
  { genre: "Portrait" },
  { genre: "Real Estate" },
  { genre: "Sports" },
  { genre: "Stock" },
  { genre: "Street" },
  { genre: "Travel" },
  { genre: "Underwater" },
  { genre: "Vehicle" },
  { genre: "Wedding" },
  { genre: "Wildlife" },
];
