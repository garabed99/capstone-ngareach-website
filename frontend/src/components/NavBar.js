import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/NavBar.css";
function NavBar() {
  return (
    <>
      <Navbar bg="info " variant="light" sticky="top" expand="sm">
        <Container>
          <Navbar.Brand className="navbar" href="/">
            Ngareach
          </Navbar.Brand>
          <Nav className="meta-details">
            <Nav.Link href="/Home">Home</Nav.Link>
            <Nav.Link href="/HowItWorks">How It Works</Nav.Link>
            <Nav.Link href="/Reviews">Reviews</Nav.Link>
            <Nav.Link href="/Pricing">Pricing</Nav.Link>
            <Nav.Link href="/PhotographersList">Our Photographers</Nav.Link>
          </Nav>
          <Navbar.Collapse className="login-register">
            <Nav.Link href="/Login">Login</Nav.Link>
            <Nav.Link href="/Register">Register</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
