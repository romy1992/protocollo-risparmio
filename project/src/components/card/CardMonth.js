import React, { useState } from 'react';
import { Card, Col, FormControl, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';

const CardMonth = ({ id, name: nameMonth, year, des, months }) => {
    const navigate = useNavigate();
    const { setTitle, setShowSearch, deleteCard } = useGlobalContext();
    const [isEdit, setIsEdit] = useState(false)
    const [query, setQuery] = useState(nameMonth)

    const handleCardMonth = (value) => {
        navigate(`/month/${value}`)
        setShowSearch(false)
    }

    const handleChangeName = (e) => {
        const { value } = e.target
        setQuery(value)
    }

    const updateClick = () => {
        setIsEdit(!isEdit)
        if (checkUpdate(months))
            setTitle(id, query);
        else {
            setQuery(nameMonth)
            return alert("Nome già presente!Provane uno nuovo.")
        }
    }

    // Controlla i vari stati prima dell'aggiornamento del nome
    const checkUpdate = (months) => {
        return (
            (months.filter(el => el.name === query).length === 0)
            || months.filter(el => el.id === id)[0].name === query
        )
    }

    return (

        <Card className='shadow-lg rounded text-bg-light mt-3 '>
            <Card.Header>
                {
                    isEdit ? (
                        <FormControl
                            placeholder={nameMonth}
                            value={query}
                            id='name'
                            name='nameMonth'
                            onChange={(e) => handleChangeName(e)} />) :
                        (
                            <>
                                <Card.Title className='mt-1 font-family-sans-serif display-10 text-center align-items-center'>
                                    {nameMonth} {(year || year > 0) && year}
                                </Card.Title>
                            </>
                        )
                }
            </Card.Header>
            <Card.Body>
                <Card.Subtitle style={{ fontSize: "14px" }}>
                    <Card.Text>Spese totali : </Card.Text>
                    <Card.Text>Risparmio totale : </Card.Text>
                    {
                        des && <Card.Text>Descrizione : {des}</Card.Text>
                    }
                </Card.Subtitle>
                <Row className='mt-3 text-center align-items-center'>
                    <Col md={4} className='mt-2'>
                        <button
                            disabled={isEdit}
                            type='button'
                            className='btn btn-md btn-outline-info'
                            onClick={() => handleCardMonth(nameMonth)}
                        >
                            Accedi
                        </button>
                    </Col>
                    {
                        !isEdit ? (
                            <Col md={4} className='mt-2'>
                                <button
                                    type='button'
                                    className='btn btn-md btn-outline-warning'
                                    onClick={() => setIsEdit(!isEdit)}
                                >
                                    Modifica
                                </button>
                            </Col>) : (
                            <Col md={4} className='mt-2'>
                                <button
                                    type='button'
                                    className='btn btn-md btn-outline-success'
                                    onClick={updateClick}
                                >
                                    Salva
                                </button>
                            </Col>)
                    }
                    <Col md={4} className='mt-2'>
                        <button
                            disabled={isEdit}
                            type='button'
                            className='btn btn-md btn-outline-danger'
                            onClick={() => deleteCard(id)}
                        >
                            Elimina
                        </button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

    );
}

export default CardMonth;