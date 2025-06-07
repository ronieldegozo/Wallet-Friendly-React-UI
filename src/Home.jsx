import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cards from './components/Cards';
import NavBar from './layouts/Components/NavBar';
import Table from 'react-bootstrap/Table';


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
    <div className='table-responsive'>
      <NavBar />
      <Cards/>

      <Table striped bordered hover variant="dark" className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Occupation</th>
            <th>Monthly Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.middleName}</td>
              <td>{user.lastName}</td>
              <td>{user.occupation}</td>
              <td>{user.monthlySalary}</td>
              <td className="d-flex gap-2 flex-wrap">
                <Link to={`/read/${user.id}`} className="btn btn-success btn-sm">Read</Link>
                <Link to={`/update/${user.id}`} className="btn btn-warning btn-sm">Update</Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Home
