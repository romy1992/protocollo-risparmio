import { memo, useEffect, useState } from "react";
import { Button, Col, FormControl, Row } from "react-bootstrap";
import { GiConfirmed } from "react-icons/gi";
import { GrPowerReset } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { addRowNote } from "../../redux/reducers/containerReducer";

const RowNew = memo(({ setIsOpenRow, isOpenRow, isEdit, id, title }) => {

    const dispach = useDispatch()

    const [body, setBody] = useState(
        {
            note: "",
            price: ""
        }
    )

    const handleAddRow = (e) => {
        const { name, value } = e.target;
        setBody({ ...body, [name]: value })
    }

    const addRow = () => {
        if (body.note === "" || body.price === 0) {
            return alert("Devi inserire sia la nota che il prezzo!!")
        } else {
            setIsOpenRow(!isOpenRow)
            dispach(addRowNote(id, title, body))
            setBody({ note: '', price: 0 })
        }
    }

    useEffect(() => {
        setBody({ note: "", price: "" })
    }, [isOpenRow])

    return (
        <tr>
            <td className='text-center'>
                <FormControl
                    name="note"
                    type="text"
                    placeholder="Iserisci nuova nota"
                    value={body.note}
                    onChange={(e) => handleAddRow(e)}
                />
            </td>
            <td>
                <FormControl
                    min={1}
                    name="price"
                    type="number"
                    placeholder="Inserisci nuovo prezzo"
                    value={body?.price}
                    onChange={(e) => handleAddRow(e)}
                />
            </td>
            <td className='text-center'>
                <Row>
                    <Col>
                        <Button
                            disabled={isEdit}
                            onClick={addRow}
                            type='button'
                            className='btn btn-md btn-success'>
                            <GiConfirmed />
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            disabled={isEdit}
                            onClick={() => setIsOpenRow(!isOpenRow)}
                            type='button'
                            className='btn btn-md btn-warning'>
                            <GrPowerReset />
                        </Button>
                    </Col>
                </Row>
            </td>
        </tr>
    )
})

export default RowNew;