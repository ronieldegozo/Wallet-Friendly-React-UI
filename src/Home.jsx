import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

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

    return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
        <h1 className='text-center'>Savings</h1>
        <div className='d-flex justify-content-end w-100 shadow p-4'>
           <Link to="/create" className="btn btn-success">Add User</Link>
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
                        <button className='btn btn-success'>read</button>
                    </td>
                    <td>
                       <button className='btn btn-primary'>edit</button> 
                    </td>
                    <td>
                        <button className='btn btn-danger'>delete</button> 
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Home
