// src/components/Home.jsx
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="text-center py-5">
      <h1 className="mb-3">🚛 FleetLink</h1>
      <p className="lead">Manage your fleet and book vehicles for logistics operations.</p>

      <Row className="mt-4">
        <Col>
          <Link to="/add-vehicle">
            <Button variant="primary" size="lg" className="m-2">Add Vehicle</Button>
          </Link>
          <Link to="/search-book">
            <Button variant="success" size="lg" className="m-2">Search & Book</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;