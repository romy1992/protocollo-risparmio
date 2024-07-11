import React, { useEffect, useState } from 'react';
import { ButtonGroup, FormControl } from 'react-bootstrap';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/context';
import { searchInLikeMonths } from '../redux/reducers/containerReducer';
import { logout } from '../redux/reducers/loginReducer';


const Navbar = () => {
    const navigate = useNavigate();
    const dispach = useDispatch();
    const { currentUser } = useSelector(state => state.loginReducer);
    const { showSearch } = useGlobalContext();
    const [show, setShow] = useState(false);
    const [query, setQuery] = useState("")
    const [links, setLinks] = useState()

    const handleSearch = (e) => {
        const { value } = e.target;
        setQuery(value)
        dispach(searchInLikeMonths(value, currentUser))
    }

    const logOut = () => {
        dispach(logout())
        navigate("/")
    }

    useEffect(() => {
        setLinks([
            {
                path: `/home/${currentUser}`,
                name: "Home"
            },
            {
                path: "/settings",
                name: "Settings"
            }
        ])
    }, [currentUser])

    return (
        <nav className="navbar navbar-expand-sm bg-body-tertiary"
            data-bs-theme="dark">
            <div className="container-fluid">
                {
                    !show && <div className="nav-brand mt-2">
                        <h6 style={{ color: "white" }}>Protocollo Risparmio</h6>
                    </div>
                }
                <div className={`${show ? "container-fluid" : "text-center align-items-center"}`} >
                    <div className={`collapse navbar-collapse ${show ? "show" : ""}`}>
                        <ul className="navbar-nav">
                            {
                                links?.map((el, index) => {
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
                        <FormControl
                            style={{ display: showSearch ? `` : `none` }}
                            type='search'
                            placeholder='Cerca'
                            value={query}
                            onChange={(e) => handleSearch(e)} />
                    </div>

                </div>
                <ButtonGroup style={{ marginTop: showSearch ? `10px` : `` }}>
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
