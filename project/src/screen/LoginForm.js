import { useEffect, useState } from "react";
import { Button, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import instance from "../utility/api";
import useTitle from "../hooks/useTitle";

const LoginForm = () => {
    useTitle("Login")
    const { setIsLogged } = useGlobalContext()
    const navigate = useNavigate()
    const [user, setUser] = useState(
        {
            email: "", password: ""
        }
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        instance.post("/auth/login", user)
            .then((response) => {
                if (response.data) {
                    setIsLogged(true)
                    navigate(`home/${user.email}`)
                } else
                    alert("Utente o password errate")
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            })

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    useEffect(() => {

    }, [])

    return (
        <Container className="p-4 shadow-lg rounded text-bg-light mt-5 text-center align-items-center">
            <header>
                <h4 style={{ fontSize: "20px", fontFamily: "cursive" }}>Login</h4>
            </header>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mt-3">
                    <FormControl
                        required={true}
                        type="email"
                        name="email"
                        autoComplete="n"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup className="mt-2">
                    <FormControl
                        required={true}
                        type="password"
                        autoComplete="n"
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