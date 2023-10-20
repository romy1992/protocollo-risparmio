import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { catchError } from '../redux/reducers/loginReducer';


const Error = () => {
  const { error } = useSelector(state => state.login)
  const navigate = useNavigate();
  const dispath = useDispatch();

  useEffect(() => {
    const time = setTimeout(() => {
      dispath(catchError({ message: "", isError: false }))
      navigate("/")
    }, 2000)
    return () => clearTimeout(time)
  }, [])

  return (
    <div className='container m-auto text-center'>
      Errore :
      <p style={{ color: "red", fontFamily: "cursive", fontSize: "15px" }}> {error.message} </p>
    </div>
  )
}

export default Error