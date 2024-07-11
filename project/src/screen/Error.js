import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { catchError } from '../redux/reducers/loginReducer';
import ErrorMode from '../components/ErrorMode';
import { USER } from '../utility/constStorage';


const Error = () => {
  const { error, isLogged } = useSelector(state => state.loginReducer)
  const navigate = useNavigate();
  const dispath = useDispatch();

  useEffect(() => {
    const time = setTimeout(() => {
      dispath(catchError({ message: "", isError: false }))
      if (isLogged)
        navigate("/home/" + localStorage.getItem(USER))
      else
        navigate('/')
    }, 2000)
    return () => clearTimeout(time)
  }, [])

  return (
    <div className='container m-auto text-center mt-2'>
      Errore : <ErrorMode>{error.message}</ErrorMode>
    </div>
  )
}

export default Error