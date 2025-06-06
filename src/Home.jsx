import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
