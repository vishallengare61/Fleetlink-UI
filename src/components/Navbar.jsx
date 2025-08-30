
import React from "react";
import { Container, Nav, Navbar as BSNavbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = ()=> {
  return (
    <BSNavbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <BSNavbar.Brand as={Link} to="/">FleetLink</BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/add-vehicle">Add Vehicle</Nav.Link>
            <Nav.Link as={Link} to="/search-book">Search & Book</Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
