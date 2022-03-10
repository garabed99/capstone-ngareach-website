import { Container, Grid, Box, Link } from "@material-ui/core";
import { Link as LinkRouter } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <Box
        marginTop="30px"
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.disabled"
        color="white"
        // position="fixed"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Information</Box>
              <Box>
                <Link href="/AboutUs" color="inherit">
                  About Us
                </Link>
              </Box>
              <Box>
                <Link href="/ContactUs" color="inherit">
                  Contact Us
                </Link>
              </Box>
              <Box>
                <Link href="/FAQ" color="inherit">
                  FAQ
                </Link>
              </Box>
              <Box>
                <Link href="/TermsAndConditions" color="inherit">
                  Terms & Condictions
                </Link>
              </Box>
              <Box>
                <Link href="/PrivacyPolicy" color="inherit">
                  Privacy Policy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* <Box borderBottom={1}>Account</Box>
              <Box>
                <Link href="/" color="inherit">
                  Login
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Register
                </Link>
              </Box> */}
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
