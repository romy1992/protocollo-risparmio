import React, { useEffect, useState } from 'react'
import { IoAddCircleOutline } from 'react-icons/io5'
import { GrPowerReset } from 'react-icons/gr'
import CardNew from '../components/card/CardNew'
import ListCardsMonth from '../components/card/ListCardsMonth'
import { useGlobalContext } from '../context/context'
import useTitle from '../hooks/useTitle'
import { useParams } from 'react-router-dom'

const Home = () => {
  useTitle("Home")
  const { email } = useParams();

  const { setShowSearch, isAuth } = useGlobalContext();
  const [isOpenNew, setIsOpenNew] = useState(false);

  useEffect(() => {
    setShowSearch(true);
  }, [email])

  useEffect(() => {
    localStorage.setItem("user", email)
    if (localStorage.getItem("user"))
      isAuth(true)
  }, [])

  return (
    <div className='container align-items-center mb-5'>
      <header className='text-center mt-3'>
        {
          isOpenNew ? (
            <button
              className='btn btn-md btn-warning'
              onClick={() => setIsOpenNew(!isOpenNew)}
            >
              <GrPowerReset />
            </button>
          ) : (
            <button
              className='btn btn-md btn-success'
              onClick={() => setIsOpenNew(!isOpenNew)}
            >
              <IoAddCircleOutline />
            </button>
          )
        }
      </header>
      {
        isOpenNew &&
        <div
          className='text-center m-auto'
          style={{ width: '70%' }}>
          <CardNew setIsOpenNew={setIsOpenNew} />
        </div>
      }
      <ListCardsMonth email={email} />
    </div>
  )
}

export default Home
