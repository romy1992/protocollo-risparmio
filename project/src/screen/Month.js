import React from 'react'
import useTitle from '../hooks/useTitle'
import { useParams } from "react-router-dom";

const Month = () => {
  const { name } = useParams();
  useTitle(`Mese di ${name}`)


  return (
    <div>

    </div>
  )
}

export default Month
