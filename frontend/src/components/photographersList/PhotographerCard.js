import "./PhotographerCard.css";
import {
  makeStyles,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";

import { useState, useEffect } from "react";
import axios from "axios";
import blankProfile from "../../imgs/blank-profile.png";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  },
  gridContainer: {
    marginLeft: "10px",
    marginBottom: "50px",
  },
  profilePic: {
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

const PER_PAGE = 8;

export default function PhotographerCard() {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(0);
  const [photographers, setPhotographers] = useState([]);
  const [profilePicture, setProfilePicture] = useState([]);

  useEffect(() => {
    fetchPhotographers();
  }, []);

  function fetchPhotographers() {
    axios
      .get("http://localhost:4000/photographers")
      .then((res) => {
        console.log("array of photographers", res.data);
        setPhotographers(res.data);
        return axios.get()
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        `http://localhost:4000/photographers/profilepicture/${photographers.id}`,
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        setProfilePicture(url);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePageClick({ selected: selectedPage }) {
    console.log("selectedPage: ", selectedPage);
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;
  const currentPagePhotographers = photographers
    .slice(offset, offset + PER_PAGE)
    .map((photographer) => {
      return (
        <Grid item xs={12} sm={6} md={3} key={photographer._id}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.profilePic}
              image={photographer.profilePicture ? photographer.profilePicture : blankProfile}
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
    });
  const pageCount = Math.ceil(photographers.length / PER_PAGE);
  return (
    <>
      <Grid>
        <Grid
          container
          spacing={3}
          className={classes.gridContainer}
          justifyContent="center"
        >
          {currentPagePhotographers}
          <ReactPaginate
            previousLabel={"← PREVIOUS"}
            nextLabel={"NEXT →"}
            pageCount={pageCount}
            breakLabel={"..."}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"paginationBtns"}
            previousLinkClassName={"previousBtn"}
            nextLinkClassName={"nextBtn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"activeBtn"}
          />
        </Grid>
      </Grid>
    </>
  );
}
