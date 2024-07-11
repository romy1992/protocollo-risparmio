import React, { useEffect, useState } from 'react';
import { Card, Col, FormControl, Row } from 'react-bootstrap';
import { CiEdit, CiSaveDown1 } from "react-icons/ci";
import { ImEnter } from "react-icons/im";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import { deleteCard, updateMounths } from '../../redux/reducers/containerReducer';
import { isAuthUser } from '../../redux/reducers/loginReducer';

const CardMonth = ({ idUMonth, title, note, des, difference, cost, container }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setShowSearch } = useGlobalContext();
    const [isEdit, setIsEdit] = useState(false)
    const [body, setBody] = useState({ idUMonth, title, note, des })

    const handleCardMonth = () => {
        navigate(`/month/${title}`)
        setShowSearch(false)
    }

    const handleChangeName = (e) => {
        const { name, value } = e.target
        setBody({ ...body, idUMonth, [name]: value })
    }

    const updateClick = () => {
        setIsEdit(!isEdit)
        if (checkUpdate(container.months)) {
            // Modifica il titoli e des del mese
            dispatch(updateMounths(body))
            setBody({ ...body })
        } else {
            setBody({ ...body })
            return alert("Nome/Anno già presente..Riprova!!")
        }
    }

    // Controlla i vari stati prima dell'aggiornamento del nome
    const checkUpdate = (months) => {
        const o = months.filter(el => el.idUMonth === idUMonth)[0];
        const oArray = months.filter(el => (el.title === body.title && el.note === body.note));
        return (
            (oArray.length === 0)
            || (o.title === body.title && o.note === body.note)
        )
    }

    // Per tenere lo stato di autenticazione attivo
    useEffect(() => {
        dispatch(isAuthUser(true))
    }, [])

    return (

        <Card className='shadow-lg rounded text-bg-light mt-3'>
            <Card.Header>
                {
                    isEdit ? (
                        <>
                            <FormControl
                                placeholder="Inserisci il titolo"
                                value={body.title}
                                id='title'
                                type='text'
                                name='title'
                                onChange={(e) => handleChangeName(e)}
                            />
                            <FormControl
                                type='text'
                                placeholder="Inserisci un sub titolo"
                                value={body.note}
                                id='note'
                                name='note'
                                onChange={(e) => handleChangeName(e)}
                            />
                        </>
                    ) :
                        (
                            <>
                                <Card.Title className='mt-1 font-family-sans-serif display-10 text-center align-items-center'>
                                    {title} {note}
                                </Card.Title>
                            </>
                        )
                }
            </Card.Header>
            <Card.Body>
                <Card.Subtitle style={{ fontSize: "14px" }}>
                    <Card.Text>Spese totali : {cost} €</Card.Text>
                    <Card.Text>Risparmio totale : {difference} €</Card.Text>
                    {
                        !isEdit ?
                            (
                                des && <Card.Text>Descrizione : {des}</Card.Text>
                            )
                            :
                            (
                                <FormControl
                                    placeholder="Inserisci una descrizione della nota"
                                    value={body.des}
                                    id='des'
                                    name='des'
                                    type='text'
                                    onChange={(e) => handleChangeName(e)}
                                />
                            )
                    }
                </Card.Subtitle>
                <Row className='mt-3 text-center align-items-center'>
                    <Col md={4} className='mt-2'>
                        <button
                            disabled={isEdit}
                            type='button'
                            className='btn btn-md btn-outline-info'
                            onClick={handleCardMonth}
                        >
                            <ImEnter />
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
                                    <CiEdit />
                                </button>
                            </Col>) : (
                            <Col md={4} className='mt-2'>
                                <button
                                    type='button'
                                    className='btn btn-md btn-outline-success'
                                    onClick={updateClick}
                                >
                                    <CiSaveDown1 />
                                </button>
                            </Col>)
                    }
                    <Col md={4} className='mt-2'>
                        <button
                            disabled={isEdit}
                            type='button'
                            className='btn btn-md btn-outline-danger'
                            onClick={() => dispatch(deleteCard(idUMonth))}
                        >
                            <TiDeleteOutline />
                        </button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

    );
}

export default CardMonth;