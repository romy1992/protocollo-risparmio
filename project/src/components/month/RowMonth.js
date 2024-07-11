import React, { useEffect, useState } from "react";
import { Button, Col, FormControl, Row } from "react-bootstrap";
import { CiEdit, CiSaveDown1 } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { deleteRow, editRow } from "../../redux/reducers/containerReducer";

const RowMonth = React.memo((
    {
        item,
        idUMonth,
        title,
        isOpenRow,
        buttons
    }) => {

    const dispach = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [editBody, setEditBody] = useState(item)


    const editAndUpdate = () => {
        setIsEdit(!isEdit)
        dispach(editRow(idUMonth, editBody, title))
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditBody({ ...editBody, [name]: value })
    }

    useEffect(() => {
        setEditBody(item)
    }, [item])


    return (
        <>
            <tr>
                <td className='text-center'>
                    {
                        !isEdit ?
                            (editBody?.note) :
                            (
                                <FormControl
                                    name="note"
                                    type="text"
                                    placeholder={editBody?.note}
                                    value={editBody?.note}
                                    onChange={handleEditChange}
                                />
                            )
                    }
                </td>
                <td className='text-center'>
                    {
                        !isEdit ?
                            (<>{editBody?.price} €</>) :
                            (
                                <FormControl
                                    name="price"
                                    type="number"
                                    placeholder={editBody?.price}
                                    value={editBody?.price}
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
                                    <Button
                                        onClick={editAndUpdate}
                                        type='button'
                                        variant="success"
                                        className='btn btn-md btn-success'>
                                        <CiSaveDown1 />
                                    </Button>
                                </Col>
                            }
                            {
                                !isEdit &&
                                <Col>
                                    <Button
                                        disabled={isOpenRow}
                                        onClick={() => setIsEdit(!isEdit)}
                                        type='button'
                                        variant="light"
                                        className='btn btn-md btn-outline-warning'>
                                        <CiEdit />
                                    </Button>
                                </Col>
                            }
                            <Col>
                                <Button
                                    disabled={isEdit || isOpenRow}
                                    onClick={() => dispach(deleteRow(idUMonth, title, item))}
                                    type='button'
                                    variant="light"
                                    className='btn btn-md btn-outline-danger'>
                                    <TiDeleteOutline />
                                </Button>
                            </Col>
                        </Row>
                    </td>
                }
            </tr>
        </>
    )


})

export default RowMonth;