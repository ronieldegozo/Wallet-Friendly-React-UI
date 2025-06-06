import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Home() {
    const [data, setData] = useState([]);

useEffect(() => {
    console.log("Home component mounted");
    axios.get('https://wallet-friendly.fly.dev/rest/v1/savings')
        .then(response => {
            const users = response.data.data;
            console.log("Raw responsess:", users);
                setData(users);

        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}, []);

    return (
    <div className='container mt-5'>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Body</th>
                </tr>                
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.monthlySalary}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}

export default Home
