import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Cards() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0); // ✅ New state for count

  useEffect(() => {
    axios.get('https://wallet-friendly.fly.dev/rest/v1/savings')
      .then(response => {
        const usersSavings = response.data.data;
        console.log("Fetched data:", usersSavings);

        setData(usersSavings);              // Set data
        setTotalCount(usersSavings.length); // ✅ Set total count
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);


    const [totalSalary, setTotalSalary] = useState(0);

  useEffect(() => {
    axios.get('https://wallet-friendly.fly.dev/rest/v1/savings')
      .then(response => {
        const usersSavings = response.data.data;
        console.log("Fetched data:", usersSavings);

        setData(usersSavings);

        // Calculate total monthly salary
        const salarySum = usersSavings.reduce((sum, user) => {
          const salary = parseFloat(user.monthlySalary || 0);
          return sum + (isNaN(salary) ? 0 : salary);
        }, 0);

        setTotalSalary(salarySum);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  return (
    <Container className='mt-5'>
      <Row  className="justify-content-md-center">
        <Col sm>
          <Card border="primary" style={{ width: '18rem' }}>
              <Card.Header>Total No. of Users</Card.Header>
              <Card.Body>
                <Card.Title>
                  <h2>{totalCount}</h2>
                </Card.Title>
              </Card.Body>
            </Card>
        </Col>
        <Col sm>
          <Card border="primary" style={{ width: '18rem' }}>
              <Card.Header>Total Combine Salary</Card.Header>
              <Card.Body>
                <Card.Title>
                  <h2>₱{totalSalary.toLocaleString()}</h2>
                </Card.Title>
              </Card.Body>
            </Card>
        </Col>
        <Col sm>
          <Card border="primary" style={{ width: '18rem' }}>
              <Card.Header>Total Savings Deposited</Card.Header>
              <Card.Body>
                <Card.Title>
                  <h1>50000</h1>
                </Card.Title>
              </Card.Body>
            </Card>
        </Col>
      </Row>
  </Container>
  )
}

export default Cards