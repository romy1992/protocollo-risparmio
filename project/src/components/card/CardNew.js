import React, { useState } from 'react';
import { Card, Col, Form, FormControl, FormGroup, Row } from 'react-bootstrap';
import { BiReset } from 'react-icons/bi';
import { IoIosAdd } from 'react-icons/io';
import { useGlobalContext } from '../../context/context';
import { month } from '../../model/containerModel';

const CardNew = ({ setIsOpenNew }) => {
    const { stateContainer, globalUpdateContainer } = useGlobalContext();
    const { container } = stateContainer;
    const [newCard, setNewCard] = useState(month)

    const handleNewCard = (e) => {
        const { name, value } = e.target;
        setNewCard({ ...newCard, [name]: value })
    }

    const handleReset = () => {
        setNewCard({ ...newCard, title: "", note: "", des: "" })
    };

    const addClickCard = () => {
        const o = container.months.filter(el => el.title === newCard.title &&
            el.note === newCard.note)
        if (newCard.title && o.length === 0) {
            // Creo un nuovo array dall'originale
            const array = Array.from(container.months);
            // Aggiungo la nuova card
            array.push(newCard)
            // Creo il nuovo contenitore
            const newContainer = { ...container, months: array }
            // Aggiorno
            globalUpdateContainer(newContainer)
            handleReset();
            setIsOpenNew(false)
        } else
            return alert("In nome del raccoglitore è obbligatorio o è già esistente. Riprova!")
    }


    return (
        <Card className='shadow-lg rounded text-bg-light mt-3'>
            <Form className='align-items-center'>
                <Card.Header>
                    <FormGroup>
                        <FormControl
                            className='mt-2'
                            name='title'
                            type='text'
                            placeholder='Nome Raccoglitore *'
                            value={newCard.title}
                            onChange={handleNewCard}
                        />
                        <FormControl
                            className='mt-2'
                            name='note'
                            type='text'
                            placeholder='Valore numerale tipo : anno'
                            value={newCard.note}
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
