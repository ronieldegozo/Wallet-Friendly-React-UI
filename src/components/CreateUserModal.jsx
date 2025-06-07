import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateUserModal({ showCreateUser, handleClose }) {
  const navigate = useNavigate();
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
        navigate('/');
        alert("User created successfully!");
        window.location.reload();
      })
      .catch(error => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <>
      <Modal show={showCreateUser} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="createUserForm" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="FirstName">FirstName:</label>
              <input type="text" name="First Name" className='form-control' placeholder='Enter First Name' onChange={
                (e) => setValues({ ...values, firstName: e.target.value })
              } required />
            </div>
            <div className="mb-2">
              <label htmlFor="MiddleName">MiddleName:</label>
              <input type="text" name="Middle Name" className='form-control' placeholder='Enter Middle Name' onChange={
                (e) => setValues({ ...values, middleName: e.target.value })
              } required />
            </div>
            <div className="mb-2">
              <label htmlFor="LastName">LastName:</label>
              <input type="text" name="Last Name" className='form-control' placeholder='Enter Last Name' onChange={
                (e) => setValues({ ...values, lastName: e.target.value })
              } required />
            </div>
            <div className="mb-2">
              <label htmlFor="Occupation">Occupation:</label>
              <input type="text" name="Occupation" className='form-control' placeholder='Enter Occupation' onChange={
                (e) => setValues({ ...values, occupation: e.target.value })
              } required />
            </div>
            <div className="mb-2">
              <label htmlFor="MonthlySalary">Monthly Salary:</label>
              <input type="number" name="Monthly Salary" className='form-control' placeholder='Enter Monthly Salary' onChange={
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
