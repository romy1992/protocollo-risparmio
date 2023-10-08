import React, { useEffect } from 'react'
import CardsMonth from '../components/CardsMonth'
import { useGlobalContext } from '../context/context'
import useTitle from '../hooks/useTitle'

const Home = () => {
  useTitle("Home")
  const { setShowSearch, refresh } = useGlobalContext();

  useEffect(() => {
    setShowSearch(true);
    refresh()
  }, [])

  return (
    <>
      <CardsMonth />
    </>
  )
}

export default Home
