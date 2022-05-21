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
    axios
      .get("http://localhost:4000/photographers")
      .then((res) => {
        console.log("array of photographers", res.data);
        setPhotographers(res.data);
        Promise.all(
          res.data.map((value) => {
            return fetchPhotographers(value);
          })
        ).then((values) => setProfilePicture(values));
        // const imagesData = Promise.all(responses.map((r) => r.json()));
        // console.log(imagesData);
        // return axios.get();
        // console.log("..", );
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function fetchPhotographers(value) {
    const imageres = await fetch(
      `http://localhost:4000/photographers/profilepicture/${value._id}`
    );
    const blob = await imageres.blob();
    const url = URL.createObjectURL(blob);
    return url;
  }

  // axios
  //   .get(
  //     `http://localhost:4000/photographers/profilepicture/${photographers.id}`
  //   )
  //   .then((res) => {
  //     const url = window.URL.createObjectURL(new Blob([res.data]));
  //     setProfilePicture(url);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }

  function handlePageClick({ selected: selectedPage }) {
    console.log("selectedPage: ", selectedPage);
    setCurrentPage(selectedPage);
  }
  console.log("proofff", profilePicture);
  const offset = currentPage * PER_PAGE;
  const currentPagePhotographers = photographers
    .slice(offset, offset + PER_PAGE)
    .map((photographer, index) => {
      return (
        <Grid item xs={12} sm={6} md={3} key={photographer._id}>
          <Card className={classes.root}>
            <CardMedia
              // component="img"
              className={classes.profilePic}
              image={profilePicture[index]}
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
