import React, { useEffect, useState } from "react";
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row, Table } from "react-bootstrap";
import { useGlobalContext } from "../../context/context";
import RowMonth from "./RowMonth";
import RowNew from "./RowNew";
import { RiMenuAddFill, RiDeleteBin2Fill } from "react-icons/ri"
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { TABELLA_SPESE } from "../../context/state";
import { useDispatch, useSelector } from "react-redux";
import { addMultipleRow, addRowNote, deleteAllRow } from "../../redux/reducers/containerReducer";

const TableMonth = React.memo(({ id, nameMonth, title, obj, arrayHeader, buttons }) => {

    const dispach = useDispatch()
    const [isOpenRow, setIsOpenRow] = useState(false)
    const [total, setTotal] = useState()
    const [showModal, setShowModal] = useState(false)

    // Ricalcola le tabelle
    useEffect(() => {
        if (obj) {
            const totale = obj.reduce((a, b) => a + parseFloat(b?.price), 0)
            setTotal(totale)
        }
    }, [id, obj])


    return (
        <div className='container mt-4 mb-5'>
            <h4 className='text-center'>{title}</h4>
            <Table striped bordered hover className='mt-4'>
                <thead>
                    <tr>
                        {
                            arrayHeader.map((ar, index) => {
                                return <th
                                    key={index}
                                    className="text-center">{ar}</th>
                            })
                        }
                        {
                            buttons &&
                            <th className="text-center">Modifica/Elimina la riga</th>
                        }

                    </tr>
                </thead>
                <tbody>
                    {obj?.map((item, index) => {
                        return <RowMonth
                            key={index}
                            idUMonth={id}
                            item={item}
                            nameMonth={nameMonth}
                            title={title}
                            isOpenRow={isOpenRow}
                            buttons={buttons}
                        />
                    })
                    }
                    <tr>
                        <td className='text-center'>
                            Totale
                        </td>
                        <td className='text-center'>
                            {total} €
                        </td>
                        <td className='text-center'>
                            <Row>
                                {
                                    obj && obj.length > 0 &&
                                    <Col>
                                        <button
                                            disabled={isOpenRow}
                                            onClick={() => dispach(deleteAllRow(id, title))}
                                            type='button'
                                            className='btn btn-md btn-outline-dark'>
                                            <RiDeleteBin2Fill />
                                        </button>
                                    </Col>
                                }
                            </Row>
                        </td>
                    </tr>
                    {isOpenRow &&
                        <RowNew
                            id={id}
                            title={title}
                            isOpenRow={isOpenRow}
                            setIsOpenRow={setIsOpenRow} />
                    }
                </tbody>

            </Table>
            {
                buttons &&
                <Row>
                    <Col>
                        <Button
                            disabled={isOpenRow}
                            onClick={() => setIsOpenRow(!isOpenRow)}
                            type='button'
                            variant="light btn btn-md btn-outline-success">
                            <RiMenuAddFill />
                        </Button>

                        {
                            title === TABELLA_SPESE &&
                            <>
                                <Button
                                    className="ms-5"
                                    onClick={() => setShowModal(!showModal)}
                                    disabled={isOpenRow}
                                    variant="light btn btn-md btn-outline-warning">
                                    <MdOutlineBookmarkAdded />
                                </Button>
                                <ModalAddFixedCost
                                    idUMonth={id}
                                    show={showModal} setShow={setShowModal} />
                            </>
                        }
                    </Col>
                </Row>
            }
        </div>
    )
})

const ModalAddFixedCost = ({ idUMonth, show, setShow }) => {
    const { container } = useSelector(state => state.containerReducer)
    const dispach = useDispatch()


    const handlerAddFixedCostList = () => {
        dispach(addMultipleRow(idUMonth))
        setShow(!show)
    }

    const handlerAddFixedCost = (el) => {
        let { note, price } = el
        dispach(addRowNote(idUMonth, TABELLA_SPESE, { note, price }))
        setShow(!show)
    }

    return (
        <Modal centered show={show} onHide={() => setShow(!show)}>
            <ModalHeader closeButton>
                <ModalTitle>
                    Aggiungi un costo fisso
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                {
                    container?.fixedCost?.costs?.map((el, key) => (
                        <Row key={key} className="rounded-2 p-2 mt-2 m-auto"
                            onClick={() => handlerAddFixedCost(el)}
                            style={{ cursor: "pointer", border: "1px solid gray", width: "98%" }}>
                            <Col>
                                <strong>{el?.note}</strong>
                            </Col>
                            <Col>
                                <strong>{el?.price} €</strong>
                            </Col>
                        </Row>
                    ))
                }

            </ModalBody>
            <ModalFooter>
                <Button variant="success" onClick={handlerAddFixedCostList}>
                    Aggiungi tutti
                </Button>
            </ModalFooter>
        </Modal>
    )
}


export default TableMonth;