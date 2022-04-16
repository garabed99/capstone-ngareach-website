import { Container, Grid, Box, Link } from "@material-ui/core";
import { Link as LinkRouter } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 12, sm: 6 }}
        py={{ xs: 12, sm: 6 }}
        bgcolor="rgba(33, 150, 243, 0.9)"
        color="white"
        position="bottom"
        bottom="0"
        left="0"
        right="0"
        paddingBottom="0"
        paddingTop="0"
        paddingRight="0"
        paddingLight="0"
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
          <Box textAlign="center" pt={{ xs: 3, sm: 4 }}>
            Ngareach &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
