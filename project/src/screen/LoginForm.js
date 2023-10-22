import { useEffect, useState } from "react";
import { Button, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import useTitle from "../hooks/useTitle";


const LoginForm = () => {
    useTitle("Login")

    const { stateLogin, globaLoginFetch } = useGlobalContext();
    const { isLogged, error } = stateLogin;
    const navigate = useNavigate();
    const [user, setUser] = useState(
        {
            email: "trottarosario@gmail.com", password: "123456"
        }
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        globaLoginFetch(user);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    // Controlla se è tutto ok è va avanti con la pagina
    useEffect(() => {
        if (isLogged) {
            localStorage.setItem("user", user.email)
            navigate(`home/${user.email}`)
        }
    }, [isLogged])

    // Se c'è un errore va nella pagina di errore
    useEffect(() => {
        if (error.isError) navigate("/error")
    }, [error.isError])


    if (!error.isError)
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