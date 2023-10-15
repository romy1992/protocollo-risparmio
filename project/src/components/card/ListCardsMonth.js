import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CardMonth from './CardMonth';
import { useGlobalContext } from '../../context/context';

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
