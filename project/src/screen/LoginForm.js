import { useEffect, useState } from "react";
import { Button, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import axios from 'axios';

const LoginForm = () => {
    const { setIsLogged } = useGlobalContext()
    const navigate = useNavigate()
    const [user, setUser] = useState(
        {
            email: "", password: ""
        }
    )

    const handleSubmit = (e) => {
        // e.preventdefault()
        setIsLogged(true)
        navigate(`home/${user.email}`)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    useEffect(() => {
        axios.get("http://localhost:8080/login")
            .then((response) => {
                axios.post("http://localhost:8080/reset", response.data)
                    .then((res) => {
                        console.log(res.data)
                    }).catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    return (
        <Container className="p-4 shadow-lg rounded text-bg-light mt-5 text-center align-items-center">
            <header>
                <h4 style={{ fontSize: "20px", fontFamily: "cursive" }}>Login</h4>
            </header>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup className="mt-3">
                    <FormControl
                        required={true}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup className="mt-2">
                    <FormControl
                        required={true}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <Button
                        className="mt-3 btn btn-success"
                        type="submit">Entra</Button>
                </FormGroup>
            </Form>
        </Container>
    )
}

export default LoginForm;