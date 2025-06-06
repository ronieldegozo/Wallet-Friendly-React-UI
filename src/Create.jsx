import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {
  const [values, setValues] = React.useState({
    firstName: '',
    middleName: '',
    lastName: '',
    occupation: '',
    monthlySalary: ''
  });

  const navigate = useNavigate();

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
      })
      .catch(error => {
        console.error("Error creating user:", error);
      });
  }
  
  return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
      <div className='w-50 shadow p-4 bg-white'>
          <h1>Create a new User</h1>
          <form onSubmit={handleSumit}>
              <div className="mb-2">
                <label htmlFor="FirstName">FirstName: </label>
                <input type="text" name="First Name" className='form-control' placeholder='Enter First Name' onChange={
                  (e) => setValues({ ...values, firstName: e.target.value })
                }/>
              </div>
              <div className="mb-2">
                <label htmlFor="MiddleName">MiddleName: </label>
                <input type="text" name="Middle Name" className='form-control' placeholder='Enter Middle Name' onChange={
                  (e) => setValues({ ...values, middleName: e.target.value })
                }/>
              </div>
              <div className="mb-2">
                <label htmlFor="LastName">LastName: </label>
                <input type="text" name="Last Name" className='form-control' placeholder='Enter Last Name' onChange={
                  (e) => setValues({ ...values, lastName: e.target.value })
                }/>
              </div>
              <div className="mb-2">
                <label htmlFor="Occupation">Occupation: </label>
                <input type="text" name="Occupation" className='form-control' placeholder='Enter Occupation' onChange={
                  (e) => setValues({ ...values, occupation: e.target.value })
                }/>
              </div>
              <div className="mb-2">
                <label htmlFor="MonthlySalary">Monthly Salary: </label>
                <input type="number" name="Monthly Salary" className='form-control' placeholder='Enter Monthly Salary' onChange={
                  (e) => setValues({ ...values, monthlySalary: e.target.value })
                }/>
              </div>
              <button className='btn btn-success w-100 mt-3 mb-2' type="submit">
                Create User
              </button>
              <Link to="/" className="btn btn-primary ms-3">Back</Link>
          </form>
      </div>      
    </div>
  )
}

export default Create
