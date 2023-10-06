import React from 'react'
import useTitle from '../hooks/useTitle'
import CardsMonth from '../components/CardsMonth'

const Home = () => {
  useTitle("Home")

  return (
    <div >
      <CardsMonth />
    </div>
  )
}

export default Home
