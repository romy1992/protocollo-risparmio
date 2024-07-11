import React, { useState } from 'react';
import { Card, Col, Form, FormControl, FormGroup, Row } from 'react-bootstrap';
import { BiReset } from 'react-icons/bi';
import { IoIosAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { month } from '../../model/containerModel';
import { insertCard, updateContainer } from '../../redux/reducers/containerReducer';
import { USER } from '../../utility/constStorage';
import database from "../../config/firebase";
const CardNew = ({ setIsOpenNew }) => {
    const dispach = useDispatch()
    const { container } = useSelector(state => state.containerReducer);
    const [newCard, setNewCard] = useState(month)

    const handleNewCard = (e) => {
        const { name, value } = e.target;
        setNewCard({ ...newCard, [name]: value })
    }

    const handleReset = () => {
        setNewCard({ ...newCard, title: "", note: "", des: "" })
    };

    const addClickCard = () => {
        const o = container.months ? container.months.filter(el => el.title === newCard.title &&
            el.note === newCard.note) : [];
        if (newCard.title && o.length === 0) {
            const dataRef = database.ref("/container");
            const newDataRef = dataRef.push();
            // Creo un nuovo array dall'originale
            let array = []
            if (container?.months)
                array = Array.from(container.months);
            newCard.idUMonth = newDataRef.key
            // Aggiungo la nuova card
            array.push(newCard)
            // Creo il nuovo contenitore
            let newContainer = { ...container, months: array }
            //Inserisco se è nuovo
            if (container.codUser === "") {
                newContainer = { ...newContainer, codUser: localStorage.getItem(USER) }
                dispach(insertCard(newContainer))
            }
            else // Aggiorno
                dispach(updateContainer(newContainer))

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
