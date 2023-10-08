import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/context';

const CardsMonth = () => {

  const navigate = useNavigate();
  const { months, setShowSearch } = useGlobalContext();

  const handleCardMonth = (value) => {
    navigate(`/month/${value}`)
    setShowSearch(false)
  }

  return (
    <Container>
      <Row className='mt-3'>
        {months.map((el, index) => {
          return (
            <Col key={index} md={4} sm={4}>
              <Card className='shadow-lg rounded text-bg-light mt-3 text-center align-items-center'>
                <Card.Body>
                  <Card.Title>{el.name}</Card.Title>
                  <Card.Text>Spese totali : </Card.Text>
                  <Card.Text>Risparmio totali : </Card.Text>
                  <button
                    type='button'
                    className='btn btn-sm btn-outline-info'
                    onClick={() => handleCardMonth(el.name)}
                  >
                    Accedi
                  </button>
                </Card.Body>
              </Card>
            </Col>
          )
        })
        }
      </Row>
    </Container>
  )
}

export default CardsMonth;
