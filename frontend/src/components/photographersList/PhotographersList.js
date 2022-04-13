import NavBar from "../NavBar";
import Footer from "../Footer";
import PhotographerCard from "./PhotographerCard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { positions } from "@material-ui/system";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    // paddingRight: "40px",
  },
});

export default function PhotographersList() {
  const classes = useStyles();

  return (
    <>
      <div>
        <NavBar />
        <h1>this is PhotographersList</h1>
      </div>

      <Grid
        container
        spacing={3}
        className={classes.gridContainer}
        justify="center"
      >
        <Grid item xs={12} sm={6} md={3}>
          <PhotographerCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PhotographerCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PhotographerCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PhotographerCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PhotographerCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PhotographerCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PhotographerCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PhotographerCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PhotographerCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PhotographerCard />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}
