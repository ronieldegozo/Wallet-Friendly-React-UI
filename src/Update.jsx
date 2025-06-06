import React, { useEffect} from 'react'
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Update() {

  const {userId} = useParams(); // Assuming you're using react-router-dom to get the user ID from the URL
  const [values, setValues] = React.useState({
      firstName: '',
      middleName: '',
      lastName: '',
      occupation: '',
      monthlySalary: ''
  });

  // Fetch user data when the component mounts or when userId changes
  useEffect(() => {
    axios.get(`https://wallet-friendly.fly.dev/rest/v1/savings/user/${userId}`)
      .then(response => {
          console.log("Fetched data:", response.data.data);
          setValues(response.data.data);// Now this is the array you can map over
      })
      .catch(error => {
          console.error("Error fetching data:", error);
      });
  }, [userId]); // Dependency array to run effect when userId changes

        
  const navigate = useNavigate();
  // Set initial values from fetched data
  const handleUpdateUser = (event) => {
    event.preventDefault();
    console.log("Form submitted with values:", values);

    const payload = {
      ...values,
      monthlySalary: values.monthlySalary.toString() // Send as string for backend BigDecimal
    };

    axios.put(`https://wallet-friendly.fly.dev/rest/v1/savings/user/${userId}`, payload)
      .then(response => {
        console.log("User updated successfully:", response.data);
        alert("User updated successfully!");
        navigate('/'); // Redirect to home page after successful update
      })
      .catch(error => {
        console.error("Error updating user:", error);
      });
  }

 return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
      <div className='w-50 shadow p-4 bg-white'>
          <h1>Update User</h1>
          <form onSubmit={handleUpdateUser}>
              <div className="mb-2">
                <label htmlFor="FirstName">FirstName: </label>
                <input type="text" name="First Name" className='form-control' placeholder='Enter First Name' value={values.firstName} onChange={
                  (e) => setValues({ ...values, firstName: e.target.value })
                }/>
              </div>
              <div className="mb-2">
                <label htmlFor="MiddleName">MiddleName: </label>
                <input type="text" name="Middle Name" className='form-control' placeholder='Enter Middle Name' value={values.middleName} onChange={
                  (e) => setValues({ ...values, middleName: e.target.value })
                }/>
              </div>
              <div className="mb-2">
                <label htmlFor="LastName">LastName: </label>
                <input type="text" name="Last Name" className='form-control' placeholder='Enter Last Name' value={values.lastName} onChange={
                  (e) => setValues({ ...values, lastName: e.target.value })
                }/>
              </div>
              <div className="mb-2">
                <label htmlFor="Occupation">Occupation: </label>
                <input type="text" name="Occupation" className='form-control' placeholder='Enter Occupation' value={values.occupation} onChange={
                  (e) => setValues({ ...values, occupation: e.target.value })
                }/>
              </div>
              <div className="mb-2">
                <label htmlFor="MonthlySalary">Monthly Salary: </label>
                <input type="number" name="Monthly Salary" className='form-control' placeholder='Enter Monthly Salary' value={values.monthlySalary} onChange={
                  (e) => setValues({ ...values, monthlySalary: e.target.value })
                }/>
              </div>
              <button className='btn btn-warning w-100 mt-3 mb-2' type="submit">
                Update User
              </button>
              <Link to="/" className="btn btn-primary ms-3">Back</Link>
          </form>
      </div>      
    </div>
  )
}

export default Update
