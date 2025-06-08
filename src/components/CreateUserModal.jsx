import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

export default function CreateUserModal({ showCreateUser, handleClose }) {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [values, setValues] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    occupation: '',
    monthlySalary: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...values,
      monthlySalary: values.monthlySalary.toString()
    };

    axios.post('https://wallet-friendly.fly.dev/rest/v1/savings', payload)
      .then(response => {
        console.log("User created successfully:", response.data);
        setShowSuccessAlert(true);
                setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(error => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <>
      {/* Floating Success Alert */}
      {showSuccessAlert && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1055, // above modal (zIndex 1050 in Bootstrap)
          minWidth: '300px'
        }}>
          <Alert variant="success" onClose={() => setShowSuccessAlert(false)} >
            <Alert.Heading>User Created Successfully!</Alert.Heading>
            <p>The page will reload shortly.</p>
          </Alert>
        </div>
      )}

      {/* Modal */}
      <Modal show={showCreateUser} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="createUserForm" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label>First Name:</label>
              <input type="text" className='form-control' placeholder='Enter First Name' onChange={
                (e) => setValues({ ...values, firstName: e.target.value })
              } required />
            </div>
            <div className="mb-2">
              <label>Middle Name:</label>
              <input type="text" className='form-control' placeholder='Enter Middle Name' onChange={
                (e) => setValues({ ...values, middleName: e.target.value })
              } required />
            </div>
            <div className="mb-2">
              <label>Last Name:</label>
              <input type="text" className='form-control' placeholder='Enter Last Name' onChange={
                (e) => setValues({ ...values, lastName: e.target.value })
              } required />
            </div>
            <div className="mb-2">
              <label>Occupation:</label>
              <input type="text" className='form-control' placeholder='Enter Occupation' onChange={
                (e) => setValues({ ...values, occupation: e.target.value })
              } required />
            </div>
            <div className="mb-2">
              <label>Monthly Salary:</label>
              <input type="number" className='form-control' placeholder='Enter Monthly Salary' onChange={
                (e) => setValues({ ...values, monthlySalary: e.target.value })
              } required />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="createUserForm">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
