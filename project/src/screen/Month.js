import React, { useEffect, useState } from 'react';
import { Col, Form, FormControl, Row } from 'react-bootstrap';
import { AiFillEdit, AiOutlineCheckCircle } from 'react-icons/ai';
import { useParams } from "react-router-dom";
import TableMonth from '../components/TableMonth';
import { useGlobalContext } from '../context/context';
import useTitle from '../hooks/useTitle';
import { TABELLA_ACCREDITI, TABELLA_SPESE } from '../context/state';

const Month = () => {
  const { name } = useParams();

  useTitle(`Mese di ${name}`)
  const { months, setShowSearch } = useGlobalContext();
  const [month, setMonth] = useState({});
  const [isDisabilited, setIsDisabilited] = useState(true)

  useEffect(() => {
    const m = months.filter((el) => el.name === name)[0];
    setMonth(m)
    // setLeisure(m.leisure);
    setShowSearch(false)
  }, [name])



  // const deleteRow = (item) => {
  //   console.log(item)
  //   setLeisure((old) => { return old.filter(l => l.note !== item.note) })
  // }


  return (

    <div className='container' >
      <h1 className='mt-3 text-center'>{month.name}</h1>
      <h4 className='mt-3 text-center'>Spese : {month.cost}</h4>
      <hr />
      <Form>
        <Row className='mt-5 text-center'>
          <Col md={2} className='mt-1'>
            <h5 className='text-center'>Stipendio : {month.salary}</h5>
          </Col>
          <Col className='mt-1'>
            <button
              disabled={!isDisabilited}
              onClick={() => setIsDisabilited(!isDisabilited)}
              type='button'
              className='btn btn-sm btn-outline-warning'>
              <AiFillEdit />
            </button>
          </Col>

          <Col>
            <FormControl
              disabled={isDisabilited}
              className='form-control'
              type='number'
              placeholder={month.salary} />
          </Col>
          <Col md={1} className='mt-1'>
            <button
              disabled={isDisabilited}
              onClick={() => setIsDisabilited(!isDisabilited)}
              type='button'
              className='btn btn-sm btn-outline-success'>
              <AiOutlineCheckCircle />
            </button>
          </Col>
        </Row>

        {/* Tabelle per le spese */}
        <TableMonth
          // deleteRow={deleteRow}
          nameMonth={name}
          title={TABELLA_SPESE}
          obj={month.leisure}
          arrayHeader={["Nota Spesa", "Costo Spesa"]}
          buttons={true}
        />

        {/* Tabelle per gli accrediti */}
        <TableMonth
          nameMonth={name}
          title={TABELLA_ACCREDITI}
          obj={month.fixedMonthlyCredit}
          arrayHeader={["Nota Accredito", "Costo Accredito"]}
          buttons={true}
        />

      </Form>
    </div>
  )
}

export default Month
