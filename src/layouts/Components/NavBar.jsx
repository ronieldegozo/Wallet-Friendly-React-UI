import React, { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import '../css/NavBar.css';
import CreateUserModal from '../../components/CreateUserModal'; // Import the modal component


function NavBar() {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleCreateUserModal = () => setShowModal(true);

  return (
    <div>
      <Navbar expand="lg" className="bg-primary navbar-dark">
        <Container>
          <Navbar.Brand href="#">User Savings Dashboard</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={() => setShow(true)}
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={show}
            onHide={() => setShow(false)}
            className="animate-slide"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">User Savings Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/">About</Nav.Link>
                <Nav.Link onClick={handleCreateUserModal}>Create User</Nav.Link>
                <Nav.Link href="/">Contact</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/* Modal for creating a new user */}
      <CreateUserModal showCreateUser={showModal} handleClose={handleClose} />
    </div>
  )
}

export default NavBar
