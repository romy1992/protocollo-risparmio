import { memo, useState } from "react";
import { Col, FormControl, Row, Table } from "react-bootstrap";
import { useGlobalContext } from "../context/context";


const TableMonth = memo(({ nameMonth, title, obj, arrayHeader, buttons }) => {

    const [isEdit, setIsEdit] = useState(false)
    const { deleteRow, deleteAllRow } = useGlobalContext();

    const [query, setQuery] = useState("")
    const [queryNumber, setQueryNumber] = useState()

    const editAndUpdate = (item) => {
        setIsEdit(!isEdit)
    }

    const handleEditChangeNote = (e, item) => {
        const { name, value } = e.target;

        obj = obj.filter(it => {
            if (it.note === name) {
                setQuery(value)
                it.note = value
            }
        })

    }


    const handleEditChangeValue = (e, item) => {
        const { name, value } = e.target;

        if (item.note === name) {
            setQueryNumber(value)
            item.price = queryNumber;
            return {
                ...item
            }
        }


    }


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
                        <th className="text-center"
                            style={{ display: buttons ? `block` : `none` }}>Elimina la riga</th>
                    </tr>
                </thead>
                <tbody>
                    {obj && obj.map((item, index) => (
                        <tr key={index}>
                            <td className='text-center'>
                                {
                                    !isEdit ?
                                        (item.note) :
                                        (
                                            <FormControl
                                                id={index}
                                                name={item.note}
                                                type="text"
                                                placeholder={item.note}
                                                onChange={(e) => handleEditChangeNote(e, item)}
                                            />
                                        )
                                }

                            </td>
                            <td className='text-center'>
                                {
                                    !isEdit ?
                                        (item.price) :
                                        (
                                            <FormControl
                                                id={index}
                                                name={item.note}
                                                type="number"
                                                placeholder={item.price}
                                                value={item.price}
                                                onChange={(e) => handleEditChangeValue(e, item)}

                                            />
                                        )
                                }
                            </td>
                            <td style={{ display: buttons ? `block` : `none` }}
                                className='text-center'>
                                <Row>
                                    <Col>
                                        <button
                                            disabled={isEdit}
                                            onClick={() => deleteRow(nameMonth, title, item)}
                                            type='button'
                                            className='btn btn-md btn-danger'>Elimina</button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
            <Row className='text-center' style={{ display: buttons ? `` : `none` }}>
                <Col>
                    <button
                        disabled={isEdit}
                        type='button'
                        className='btn btn-md btn-outline-success'>
                        Aggiungi</button>
                </Col>
                <Col style={{ display: isEdit ? `` : `none` }} >
                    <button
                        onClick={editAndUpdate}
                        type='button'
                        className='btn btn-md btn-outline-success'>Modifica e salva</button>
                </Col>
                <Col style={{ display: !isEdit && obj && obj.length > 0 ? `` : `none` }} >
                    <button
                        onClick={() => setIsEdit(!isEdit)}
                        type='button'
                        className='btn btn-md btn-outline-warning'>Modifica</button>
                </Col>
                <Col>
                    <button
                        style={{ display: obj && obj.length > 0 ? `` : `none` }}
                        disabled={isEdit}
                        onClick={() => deleteAllRow(nameMonth, title)}
                        type='button'
                        className='btn btn-md btn-outline-danger'>Elimina tutto</button>
                </Col>
            </Row>
        </div>
    )
})


export default TableMonth;