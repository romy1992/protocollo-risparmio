import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useGlobalContext } from '../../context/context';
import CardMonth from './CardMonth';

const ListCardsMonth = () => {
  const { months } = useGlobalContext();

  return (
    <Row className='mt-3'>
      {months && months.slice().reverse().map((el, index) => {
        return <Col key={index} md={6}>
          <CardMonth {...el} months={months} />
        </Col>
      })
      }
    </Row>
  )
}

export default ListCardsMonth;
