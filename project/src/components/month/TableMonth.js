import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useGlobalContext } from "../../context/context";
import RowMonth from "./RowMonth";
import RowNew from "./RowNew";
import { RiMenuAddFill, RiDeleteBin2Fill } from "react-icons/ri"

const TableMonth = React.memo(({ id, salary, nameMonth, title, obj, arrayHeader, buttons }) => {

    const [isOpenRow, setIsOpenRow] = useState(false)
    const [total, setTotal] = useState()
    const { deleteAllRow } = useGlobalContext();


    // Ricalcola le tabelle
    useEffect(() => {
        if (obj) {
            const totale = obj.reduce((a, b) => a + parseFloat(b.price), 0)
            setTotal(totale)
        }
    }, [id, salary, obj?.length])


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
                    {obj && obj.map((item, index) => {
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
                                            onClick={() => deleteAllRow(id, title)}
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
                        <button
                            disabled={isOpenRow}
                            onClick={() => setIsOpenRow(!isOpenRow)}
                            type='button'
                            className='btn btn-md btn-outline-success'>
                            <RiMenuAddFill />
                        </button>
                    </Col>
                </Row>
            }
        </div>
    )
})


export default TableMonth;