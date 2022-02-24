import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./styles/NavBar.css";

export default function NavBar() {
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
                    to="/Home"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Home
                  </Link>
                </Button>
              </div>
              <div className="page-route">
                <Button>
                  <Link
                    to="/HowItWorks"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    HowItWorks
                  </Link>
                </Button>
              </div>
              <div className="page-route">
                <Button>
                  <Link
                    to="/Reviews"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Reviews
                  </Link>
                </Button>
              </div>
              <div className="page-route">
                <Button>
                  <Link
                    to="/Pricing"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Pricing
                  </Link>
                </Button>
              </div>
              <div className="page-route">
                <Button>
                  <Link
                    to="/PhotographersList"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Our Photographers
                  </Link>
                </Button>
              </div>
            </div>

            <div className="registration-container">
              <Button>Login</Button>
              <Button>Register</Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

// import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.css";
// import "./styles/NavBar.css";
// function NavBar() {
//   return (
//     <>
//       <Navbar bg="info " variant="light" sticky="top" expand="sm">
//         <Container >
//           <Navbar.Brand className="navbar" href="/" >
//             Ngareach
//           </Navbar.Brand>
//           <Nav className="meta-details">
//             <Nav.Link href="/Home">Home</Nav.Link>
//             <Nav.Link href="/HowItWorks">How It Works</Nav.Link>
//             <Nav.Link href="/Reviews">Reviews</Nav.Link>
//             <Nav.Link href="/Pricing">Pricing</Nav.Link>
//             <Nav.Link href="/PhotographersList">Our Photographers</Nav.Link>
//           </Nav>
//           <Navbar.Collapse className="login-register">
//             <Nav.Link href="/Login">Login</Nav.Link>
//             <Nav.Link href="/Register">Register</Nav.Link>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default NavBar;
