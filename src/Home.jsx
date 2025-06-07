import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cards from './components/Cards';
import NavBar from './layouts/Components/NavBar';
import Table from 'react-bootstrap/Table';


function Home({ user }) {
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



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    type: "Goal Based Savings",
  });
  const [currentUserId, setCurrentUserId] = useState(null); // store user id from button click

  // Called when user clicks button, receives user id
  const createUserCategory = (id) => {
    console.log("Create user Categories with ID:", id);
    setCurrentUserId(id);      // save the id to use in submit
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUserId) {
      alert("User ID not found.");
      return;
    }

    try {
      const response = await axios.post(
        `https://wallet-friendly.fly.dev/rest/v1/category/savings/userid/${currentUserId}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Category created:", response.data);
      alert("Category created successfully!");
      setIsModalOpen(false);
      setFormData({ name: "", amount: "", type: "Goal Based Savings" });
      setCurrentUserId(null); // clear stored ID after submit
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category");
    }
  };

  const userDepositAmount = (id) => {
    console.log("Deposit amount for user ID:", id);
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
                <buttom className="btn btn-primary btn-sm" onClick={() => createUserCategory(user.id)}>
                  Create Category Deposit
                </buttom>
                <buttom className="btn btn-primary btn-sm" onClick={() => userDepositAmount(user.id)}>
                  Deposit
                </buttom>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Create Deposit Category</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsModalOpen(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                      name="amount"
                      type="number"
                      className="form-control"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <input
                      name="type"
                      type="text"
                      className="form-control"
                      value={formData.type}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
