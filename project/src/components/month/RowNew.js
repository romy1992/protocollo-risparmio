import { memo, useEffect, useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import { useGlobalContext } from "../../context/context";

const RowNew = memo(({ setIsOpenRow, isOpenRow, isEdit, nameMonth, title }) => {

    const { addRowNote } = useGlobalContext();
    const [body, setBody] = useState(
        {
            note: "",
            price: null
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
            addRowNote(nameMonth, title, body)
            setBody({ note: '', price: null })
        }
    }

    useEffect(() => {
        setBody({ note: "", price: null })
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
                    name="price"
                    type="number"
                    placeholder="Inserisci nuovo prezzo"
                    value={body.price || 0}
                    onChange={(e) => handleAddRow(e)}
                />
            </td>
            <td className='text-center'>
                <Row>
                    <Col>
                        <button
                            disabled={isEdit}
                            onClick={addRow}
                            type='button'
                            className='btn btn-md btn-success'>Conferma</button>
                    </Col>
                    <Col>
                        <button
                            disabled={isEdit}
                            onClick={() => setIsOpenRow(!isOpenRow)}
                            type='button'
                            className='btn btn-md btn-warning'>Annulla</button>
                    </Col>
                </Row>
            </td>
        </tr>
    )
})

export default RowNew;