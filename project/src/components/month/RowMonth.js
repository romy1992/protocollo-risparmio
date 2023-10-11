import React from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import { useGlobalContext } from "../../context/context";

const RowMonth = React.memo((
    {
        item,
        isEdit,
        nameMonth,
        title,
        isOpenRow,
        buttons
    }) => {

    const { deleteRow, setValueEdited } = useGlobalContext();


    const handleEditChange = (e, item) => {
        const { name, value } = e.target;
        setValueEdited(name, value, item, nameMonth, title)
    }

    return (
        <>
            <tr>
                <td className='text-center'>
                    {
                        !isEdit ?
                            (item.note) :
                            (
                                <FormControl
                                    name="note"
                                    type="text"
                                    placeholder={item.note}
                                    value={item.note}
                                    onChange={(e) => handleEditChange(e, item)}
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
                                    name="price"
                                    type="number"
                                    placeholder={item.note}
                                    value={item.price}
                                    onChange={(e) => handleEditChange(e, item)}
                                />
                            )
                    }
                </td>
                {
                    buttons &&
                    <td className='text-center'>
                        <Row>
                            <Col>
                                <button
                                    disabled={isEdit || isOpenRow}
                                    onClick={() => deleteRow(nameMonth, title, item)}
                                    type='button'
                                    className='btn btn-md btn-danger'>Elimina</button>
                            </Col>
                        </Row>
                    </td>
                }
            </tr>
        </>
    )


})

export default RowMonth;