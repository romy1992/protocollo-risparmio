import React, { useState } from 'react';
import { ButtonGroup, Form, FormControl } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/context';
import links from '../utility/links';

const Navbar = () => {
    const navigate = useNavigate()
    const { setPayload, showSearch, setIsLogged } = useGlobalContext();
    const [show, setShow] = useState(false);
    const [query, setQuery] = useState("")

    const handleSearch = (e) => {
        const { value } = e.target;
        setQuery(value)
        setPayload(value)
    }

    const logOut = () => {
        setIsLogged(false);
        navigate("/")
    }

    return (
        <nav className="navbar navbar-expand-sm bg-body-tertiary"
            data-bs-theme="dark">
            <div className="container-fluid">
                <div className="nav-brand mt-2">
                    <h6 style={{ color: "white" }}>Protocollo Risparmio</h6>
                </div>

                <div className={`${show ? "container-fluid" : "text-center align-items-center"}`}>
                    <div className={`collapse navbar-collapse ${show ? "show" : ""}`}>
                        <ul className="navbar-nav">
                            {
                                links.map((el, index) => {
                                    return (
                                        <li className='nav-item'
                                            key={index}>
                                            <Link className='nav-link'
                                                to={el.path}>
                                                {el.name}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <Form>
                    <FormControl
                        style={{ display: showSearch ? `block` : `none` }}
                        type='search'
                        placeholder='Cerca'
                        value={query}
                        onChange={(e) => handleSearch(e)} />
                </Form>
                <ButtonGroup>
                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => logOut()}
                    >
                        <AiOutlineLogout className="nav-icon" />
                    </button>

                    <button
                        className="btn navbar-toggler collapsed"
                        type="button"
                        onClick={() => setShow(!show)}
                    >
                        <FaBars className="nav-icon" />
                    </button>
                </ButtonGroup>
            </div>
        </nav >
    )
}

export default Navbar
