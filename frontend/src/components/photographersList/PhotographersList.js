import PhotographerCard from "./PhotographerCard";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    marginBottom: "50px"
    
  },
});

export default function PhotographersList() {
  const classes = useStyles();

  return (
    <>
      <div>
        <h1>this is PhotographersList</h1>
      </div>

      <Grid
        container
        spacing={3}
        className={classes.gridContainer}
        justify="center"
      >
        {/* users.map((user) => {
          <Grid item xs={12} sm={6} md={3}>
          <PhotographerCard photographer={user}/>}
        </Grid>
          ) */}
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
    </>
  );
}
