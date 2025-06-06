import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Read() {
      const [data, setData] = useState([]);
      const {userId} = useParams(); // Assuming you're using react-router-dom to get the user ID from the URL
      
        useEffect(() => {
            axios.get(`https://wallet-friendly.fly.dev/rest/v1/savings/user/${userId}`)
                .then(response => {
                    const usersSavings = response.data.data;
                    console.log("Fetched data:", usersSavings);
                    setData(usersSavings); // Now this is the array you can map over
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }, [userId]); // Dependency array to run effect when userId changes


  return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
        <div className='w-50 border bg-white shadow p-4 px-5 pt-3 pb-5 rounded'>
            <h3>User Details</h3>
            <div className='mb-2'>
                <strong>ID:</strong> {data.id}
            </div>
            <div className='mb-2'>
                <strong>First Name:</strong> {data.firstName}
              </div>
            <div className='mb-2'>
                <strong>Middle Name:</strong> {data.middleName}
            </div>
            <div className='mb-2'>
                <strong>Last Name:</strong> {data.lastName}
            </div>
            <div className='mb-2'>
                <strong>Occupation:</strong> {data.occupation}
              </div>
            <div className='mb-2'>
                <strong>Monthly Salary:</strong> {data.monthlySalary}
            </div>
            <div className='d-flex justify-content-end'>
                <button className='btn btn-primary me-2'>Edit</button>
                <button className='btn btn-danger'>Delete</button>
            </div>
            <div className='d-flex justify-content-end mt-3'>
                <Link to="/" className='btn btn-success'>Back to Home</Link>
            </div>
        </div>
    </div>
  )
}

export default Read
