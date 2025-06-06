import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://wallet-friendly.fly.dev/rest/v1/savings')
            .then(response => {
            const usersSavings = response.data.data;
                console.log("Fetched data:", usersSavings);
                setData(usersSavings); // Now this is the array you can map over
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const navigate = useNavigate();

    const handleDelete = (id) => {
    console.log("Deleting user with ID:", id);
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) {
        console.log("Delete cancelled");
        return;
    }
        axios.delete(`https://wallet-friendly.fly.dev/rest/v1/savings/user/${id}`)
            .then(response => {
                console.log("Delete response:", response);
                navigate('/'); // Redirect to home after deletion   
                setData(data.filter(user => user.id !== id)); // Update state to remove deleted user
                alert("User deleted successfully!");
            })
            .catch(error => {
                console.error("Error deleting user:", error);
            });
    }

      const [show, setShow] = React.useState(false);
    
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

  const [values, setValues] = React.useState({
    firstName: '',
    middleName: '',
    lastName: '',
    occupation: '',
    monthlySalary: ''
  });


  const handleSumit = (event) => {
    event.preventDefault();
    console.log("Form submitted with values:", values);

  const payload = {
    ...values,
    monthlySalary: values.monthlySalary.toString() // Send as string for backend BigDecimal
  };

  axios.post('https://wallet-friendly.fly.dev/rest/v1/savings', payload)
      .then(response => {
        console.log("User created successfully:", response.data);
        navigate('/'); // Redirect to home page after successful creation
        alert("User created successfully!");
        window.location.reload();
      })
      .catch(error => {
        console.error("Error creating user:", error);
      });
  }



    return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
        <h1 className='text-center'>Savings</h1>
        <div className='d-flex justify-content-end w-100 shadow p-4'>
        <Button variant="primary" onClick={handleShow}>
           Create User
        </Button>
        
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form  id="createUserForm"  onSubmit={handleSumit}>
              <div className="mb-2">
                <label htmlFor="FirstName">FirstName: </label>
                <input type="text" name="First Name" className='form-control' placeholder='Enter First Name' onChange={
                  (e) => setValues({ ...values, firstName: e.target.value })
                } required/>
              </div>
              <div className="mb-2">
                <label htmlFor="MiddleName">MiddleName: </label>
                <input type="text" name="Middle Name" className='form-control' placeholder='Enter Middle Name' onChange={
                  (e) => setValues({ ...values, middleName: e.target.value })
                } required/>
              </div>
              <div className="mb-2">
                <label htmlFor="LastName">LastName: </label>
                <input type="text" name="Last Name" className='form-control' placeholder='Enter Last Name' onChange={
                  (e) => setValues({ ...values, lastName: e.target.value })
                } required/>
              </div>
              <div className="mb-2">
                <label htmlFor="Occupation">Occupation: </label>
                <input type="text" name="Occupation" className='form-control' placeholder='Enter Occupation' onChange={
                  (e) => setValues({ ...values, occupation: e.target.value })
                } required/>
              </div>
              <div className="mb-2">
                <label htmlFor="MonthlySalary">Monthly Salary: </label>
                <input type="number" name="Monthly Salary" className='form-control' placeholder='Enter Monthly Salary' onChange={
                  (e) => setValues({ ...values, monthlySalary: e.target.value })
                }required />
              </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
            <Button variant="primary"  type="submit" form="createUserForm">
            Save Changes
            </Button>
        </Modal.Footer>
      </Modal>
        </div>
        <table className='table tavle-striped table-bordered'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Middle Name</th>
                    <th>Occupation</th>
                    <th>Monthly Salary</th>
                </tr>                
            </thead>
            <tbody>
                {data.map((user, index) => (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.middleName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.occupation}</td>
                    <td>{user.monthlySalary}</td>
                    <td>
                        <Link to={`/read/${user.id}`} className='btn btn-success'>read</Link>
                    </td>
                    <td>
                        <Link to={`/update/${user.id}`} className='btn btn-warning'>update</Link>
                    </td>
                    <td>
                        <button onClick={event => handleDelete(user.id)} className='btn btn-danger'>delete</button> 
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Home
