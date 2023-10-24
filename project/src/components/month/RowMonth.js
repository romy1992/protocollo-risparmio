import React, { useEffect, useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import { useGlobalContext } from "../../context/context";
import { TiDeleteOutline } from "react-icons/ti";
import { CiEdit, CiSaveDown1 } from "react-icons/ci";

const RowMonth = React.memo(( 
    {
        item,
        idUMonth,
        title,
        isOpenRow,
        buttons
    }) => {

    const { deleteRow, editRow } = useGlobalContext();
    const [isEdit, setIsEdit] = useState(false)
    const [editBody, setEditBody] = useState(item)


    const editAndUpdate = () => {
        setIsEdit(!isEdit)
        editRow(idUMonth, editBody, title)
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditBody({ ...editBody, [name]: value })
    }

    useEffect(() => {
        setEditBody(item)
    }, [])


    return (
        <>
            <tr>
                <td className='text-center'>
                    {
                        !isEdit ?
                            (editBody.note) :
                            (
                                <FormControl
                                    name="note"
                                    type="text"
                                    placeholder={editBody.note}
                                    value={editBody.note}
                                    onChange={handleEditChange}
                                />
                            )
                    }
                </td>
                <td className='text-center'>
                    {
                        !isEdit ?
                            (<>{editBody.price} €</>) :
                            (
                                <FormControl
                                    name="price"
                                    type="number"
                                    placeholder={editBody.price || 0}
                                    value={editBody.price}
                                    onChange={handleEditChange}
                                />
                            )
                    }
                </td>
                {
                    buttons &&
                    <td className='text-center'>
                        <Row>
                            {
                                !isOpenRow && isEdit &&
                                <Col>
                                    <button
                                        onClick={editAndUpdate}
                                        type='button'
                                        className='btn btn-md btn-success'>
                                        <CiSaveDown1 />
                                    </button>
                                </Col>
                            }
                            {
                                !isEdit &&
                                <Col>
                                    <button
                                        disabled={isOpenRow}
                                        onClick={() => setIsEdit(!isEdit)}
                                        type='button'
                                        className='btn btn-md btn-outline-warning'>
                                        <CiEdit />
                                    </button>
                                </Col>
                            }
                            <Col>
                                <button
                                    disabled={isEdit || isOpenRow}
                                    onClick={() => deleteRow(idUMonth, title, item)}
                                    type='button'
                                    className='btn btn-md btn-outline-danger'>
                                    <TiDeleteOutline />
                                </button>
                            </Col>
                        </Row>
                    </td>
                }
            </tr>
        </>
    )


})

export default RowMonth;