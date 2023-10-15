import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useGlobalContext } from "../../context/context";
import RowMonth from "./RowMonth";
import RowNew from "./RowNew";

const TableMonth = React.memo(({ id, salary, nameMonth, title, obj, arrayHeader, buttons }) => {

    const [isEdit, setIsEdit] = useState(false)
    const [isOpenRow, setIsOpenRow] = useState(false)
    const { deleteAllRow, somTotal } = useGlobalContext();
    const [total, setTotal] = useState()

    const editAndUpdate = () => {
        setIsEdit(!isEdit)
    }

    // Ricalcola le tabelle
    useEffect(() => {
        if (obj) {
            const totale = obj.reduce((a, b) => a + parseFloat(b.price), 0)
            somTotal(id, totale, title)
            setTotal(totale)
        }
    }, [id, salary, obj && obj, obj && obj.length])


    return (
        <div className='container mt-4'>
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
                            <th className="text-center">Elimina la riga</th>
                        }

                    </tr>
                </thead>
                <tbody>
                    {obj && obj.map((item, index) => {
                        return <RowMonth
                            key={index}
                            item={item}
                            isEdit={isEdit}
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
                        <td></td>
                    </tr>
                    {isOpenRow &&
                        <RowNew
                            nameMonth={nameMonth}
                            title={title}
                            isEdit={isEdit}
                            isOpenRow={isOpenRow}
                            setIsOpenRow={setIsOpenRow} />
                    }
                </tbody>

            </Table>
            {
                buttons &&
                <Row>
                    <Col>
                        <button
                            disabled={isEdit || isOpenRow}
                            onClick={() => setIsOpenRow(!isOpenRow)}
                            type='button'
                            className='btn btn-md btn-outline-success'>
                            Aggiungi</button>
                    </Col>
                    {
                        !isOpenRow && isEdit &&
                        <Col>
                            <button
                                onClick={editAndUpdate}
                                type='button'
                                className='btn btn-md btn-outline-success'>Modifica e salva</button>
                        </Col>
                    }
                    {
                        !isEdit && obj && obj.length > 0 &&
                        <Col>
                            <button
                                disabled={isOpenRow}
                                onClick={() => setIsEdit(!isEdit)}
                                type='button'
                                className='btn btn-md btn-outline-warning'>Modifica</button>
                        </Col>
                    }
                    {
                        obj && obj.length > 0 &&
                        <Col>
                            <button
                                disabled={isEdit || isOpenRow}
                                onClick={() => deleteAllRow(nameMonth, title)}
                                type='button'
                                className='btn btn-md btn-outline-danger'>Elimina tutto</button>
                        </Col>
                    }

                </Row>
            }
        </div>
    )
})


export default TableMonth;