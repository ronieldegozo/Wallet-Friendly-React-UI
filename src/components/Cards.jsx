import React from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Cards() {
  return (
    <Container className='mt-5'>
      <Row  className="justify-content-md-center">
        <Col sm>
          <Card border="primary" style={{ width: '18rem' }}>
              <Card.Header>Total No. of Users</Card.Header>
              <Card.Body>
                <Card.Title>
                  <h1>2</h1>
                </Card.Title>
              </Card.Body>
            </Card>
        </Col>
        <Col sm>
          <Card border="primary" style={{ width: '18rem' }}>
              <Card.Header>Total Combine Salary</Card.Header>
              <Card.Body>
                <Card.Title>
                  <h1>100000</h1>
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