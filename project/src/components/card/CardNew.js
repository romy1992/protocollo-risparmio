import React, { useState } from 'react';
import { Card, Col, Form, FormControl, FormGroup, Row } from 'react-bootstrap';
import { BiReset } from 'react-icons/bi';
import { IoIosAdd } from 'react-icons/io';
import { useGlobalContext } from '../../context/context';

const CardNew = ({ setIsOpenNew }) => {
    const { addnewCard } = useGlobalContext();
    const [newCard, setNewCard] = useState
        (
            {
                name: "", year: null, des: "", leisure: [], fixedMonthlyCredit: []
            }
        )

    const handleNewCard = (e) => {
        const { name, value } = e.target;
        setNewCard({ ...newCard, [name]: value })
    }

    const handleReset = () => {
        setNewCard({ ...newCard, name: "", year: 0, des: "" })
    };

    const addClickCard = () => {
        if (newCard.name) {
            addnewCard(newCard)
            handleReset();
            setIsOpenNew(false)
        } else
            return alert("In nome del raccoglitore è obbligatorio")
    }


    return (
        <Card className='shadow-lg rounded text-bg-light mt-3'>
            <Form className='align-items-center'>
                <Card.Header>
                    <FormGroup>
                        <FormControl
                            className='mt-2'
                            name='name'
                            type='text'
                            placeholder='Nome Raccoglitore *'
                            value={newCard.name}
                            onChange={handleNewCard}
                        />
                        <FormControl
                            className='mt-2'
                            name='year'
                            type='number'
                            placeholder='Valore numerale tipo : anno'
                            value={newCard.year}
                            onChange={handleNewCard}
                        />
                    </FormGroup>
                </Card.Header>
                <Card.Body>
                    <FormControl
                        name='des'
                        type='text'
                        placeholder='Descrizione Raccoglitore'
                        value={newCard.des}
                        onChange={handleNewCard}
                    />

                </Card.Body>
                <Row className='m-auto mb-3'>
                    <Col className='mt-2'>
                        <button
                            type='button'
                            onClick={addClickCard}
                            className='btn btn-sm btn-success'>
                            <IoIosAdd />
                        </button>
                    </Col>
                    <Col className='mt-2'>
                        <button
                            onClick={handleReset}
                            type='reset'
                            className='btn btn-sm btn-warning'>
                            <BiReset />
                        </button>
                    </Col>
                </Row>
            </Form>
        </Card>
    )
}

export default CardNew;
