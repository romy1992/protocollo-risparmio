import React, { useEffect, useState } from 'react';
import { Col, FormControl, Row } from 'react-bootstrap';
import { useGlobalContext } from '../../context/context';
import { AiFillEdit, AiOutlineCheckCircle } from 'react-icons/ai';

const Salary = ({ idUMonth, salary }) => {
    const { editSalary } = useGlobalContext();
    const [isDisabilited, setIsDisabilited] = useState(true)
    const [changeSalary, editChangeSalary] = useState()

    // Salva e disabilita il bottone
    const updateSalary = () => {
        setIsDisabilited(!isDisabilited)
    }

    // Handle Per l'onChange dello stipendio mensile
    const handelSalary = (e) => {
        const { value } = e.target;
        editChangeSalary(value)
        editSalary(idUMonth, value);
    }

    useEffect(() => {
        editChangeSalary(salary ? salary : 0)
    }, [])

    return (
        <Row className='mt-5 text-center'>
            <Col md={2} className='mt-1'>
                <h5 className='text-center'>Stipendio : {changeSalary ? changeSalary : salary} €</h5>
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
                    name='salary'
                    id='salary'
                    className='form-control'
                    type='number'
                    placeholder={changeSalary | salary}
                    value={changeSalary | salary}
                    onChange={handelSalary}
                />
            </Col>
            <Col md={1} className='mt-1'>
                <button
                    disabled={isDisabilited}
                    onClick={updateSalary}
                    type='button'
                    className='btn btn-sm btn-outline-success'>
                    <AiOutlineCheckCircle />
                </button>
            </Col>
        </Row>
    )
}

export default Salary
