import { Container, Grid, Box, Link } from "@material-ui/core";
import { Link as LinkRouter } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <Box
        marginTop="50px"
        px={{ xs: 12, sm: 6 }}
        py={{ xs: 12, sm: 6 }}
        bgcolor="rgba(33, 150, 243, 0.9)"
        color="white"
        position="relative"
        bottom="0"
        left="0"
        width="94%"
        padding="0"
      >
        <Container maxWidth="lg">
          <Grid container spacing={10}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Information</Box>
              <Box>
                <Link href="/aboutus" color="inherit">
                  About Us
                </Link>
              </Box>
              <Box>
                <Link href="/contactus" color="inherit">
                  Contact Us
                </Link>
              </Box>
              <Box>
                <Link href="/faq" color="inherit">
                  FAQ
                </Link>
              </Box>
              <Box>
                <Link href="/termsandconditions" color="inherit">
                  Terms & Condictions
                </Link>
              </Box>
              <Box>
                <Link href="/privacypolicy" color="inherit">
                  Privacy Policy
                </Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Follow Us</Box>
              <Box>
                <Link href="https://www.facebook.com/garabed99" color="inherit">
                  Facebook
                </Link>
              </Box>
              <Box>
                <Link
                  href="https://www.instagram.com/garabed99"
                  color="inherit"
                >
                  Intagram
                </Link>
              </Box>
              <Box>
                <Link href="https://www.twitter.com/cnn" color="inherit">
                  Twitter
                </Link>
              </Box>
              <Box>
                <Link
                  href="https://www.pinterest.com/garabed99"
                  color="inherit"
                >
                  Pinterest
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Ngareach &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}

// import React from "react";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import Link from "@material-ui/core/Link";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary">
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     minHeight: "100vh",
//   },
//   main: {
//     marginTop: theme.spacing(8),
//     marginBottom: theme.spacing(2),
//   },
//   footer: {
//     padding: theme.spacing(3, 2),
//     // marginTop: 'auto',
//     backgroundColor:
//       theme.palette.type === "light"
//         ? theme.palette.grey[200]
//         : theme.palette.grey[800],
//     bottom: "0",
//     position: "bottom",
//   },
// }));

// export default function Footer() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <footer className={classes.footer}>
//         <Container maxWidth="sm">
//           <Typography variant="body1">
//             My sticky footer can be found here.
//           </Typography>
//           <Copyright />
//         </Container>
//       </footer>
//     </div>
//   );
// }
