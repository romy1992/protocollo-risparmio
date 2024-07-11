import React, { useEffect, useState } from 'react'
import { GrPowerReset } from 'react-icons/gr'
import { IoAddCircleOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import CardNew from '../components/card/CardNew'
import ListCardsMonth from '../components/card/ListCardsMonth'
import { useGlobalContext } from '../context/context'
import useTitle from '../hooks/useTitle'
import { USER } from '../utility/constStorage'
import { isAuthUser } from '../redux/reducers/loginReducer'

const Home = () => {
  useTitle("Home")

  const { currentUser } = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();
  const { setShowSearch } = useGlobalContext();
  const [isOpenNew, setIsOpenNew] = useState(false);

  useEffect(() => {
    setShowSearch(true);
  }, [currentUser])

  useEffect(() => {
    if (localStorage.getItem(USER))  dispatch(isAuthUser(true))
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
      <ListCardsMonth email={currentUser} />
    </div>
  )
}

export default Home
