import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useGlobalContext } from '../../context/context';
import CardMonth from './CardMonth';
import ErrorMode from '../ErrorMode';

const ListCardsMonth = ({ email }) => {
  const { stateContainer, globalSearchContainer } = useGlobalContext();
  const { errorContainer, isLoading, container } = stateContainer;

  useEffect(() => {
    globalSearchContainer(email)
  }, [email])

  return (
    <>
      {
        (!isLoading && !errorContainer.isError) ?
          (
            <Row className='mt-3'>
              {container &&
                container.months.length > 0 ?
                (
                  container.months.slice().reverse().map((el, index) => {
                    return <Col key={index} md={4}>
                      <CardMonth {...el} container={container} />
                    </Col>
                  })
                ) :
                (
                  <>
                    <ContentContainer>
                      <h1>La tua lista è vuota ... </h1>
                      <h4>Inizia ad aggiungere le tue note !!</h4>
                    </ContentContainer>
                  </>
                )
              }
            </Row>
          ) :
          (isLoading && errorContainer && !errorContainer.isError &&
            <ContentContainer>
              <h4>Loading</h4>
            </ContentContainer>
          )
      }
      {
        errorContainer.isError &&
        <ErrorMode>
          <ContentContainer>
            {errorContainer.message}
          </ContentContainer>
        </ErrorMode>
      }

    </>
  )
}

const ContentContainer = ({ children }) => {
  return <Container
    className='container-fluid m-auto text-center'>
    {children}
  </Container>
}

export default ListCardsMonth;
