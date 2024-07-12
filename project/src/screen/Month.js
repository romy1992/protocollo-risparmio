import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import TableMonth from '../components/month/TableMonth';
import { useGlobalContext } from '../context/context';
import { TABELLA_ACCREDITI, TABELLA_SPESE } from '../context/state';
import useTitle from '../hooks/useTitle';
import { searchContainer } from '../redux/reducers/containerReducer';
import { isAuthUser } from '../redux/reducers/loginReducer';
import { USER } from '../utility/constStorage';

const Month = () => {
  const { name } = useParams();
  useTitle(`Mese di ${name}`)
  const { isLoading, setShowSearch } = useGlobalContext();
  const containerReducer = useSelector(state => state.containerReducer)
  const { container } = containerReducer
  const dispatch = useDispatch();
  const [actualMonth, setActualMonth] = useState()

  useEffect(() => {
    const ms = container?.months?.filter((el) => el?.title === name);
    setActualMonth(ms[0])
  }, [container])

  useEffect(() => {
    dispatch(searchContainer(localStorage.getItem(USER)))
    setShowSearch(false)
    dispatch(isAuthUser(true))
  }, [])

  return (
    <>
      {
        !isLoading &&
        <>
          <div className='container' >
            <h1 className='mt-3 text-center'>{actualMonth?.title} {actualMonth?.note}</h1>
            <h4 className='mt-3'>Spese Totali : {actualMonth?.cost} €</h4>
            <h4 className='mt-3'>Spese Totali senza fisse : {actualMonth?.costNoFixed} €</h4>
            <h4 className='mt-3'>Risparmi Totali : {actualMonth?.difference} €</h4>
            <h6 className='mt-3'>{actualMonth?.des}</h6>
            <hr />

            {/* Tabelle per le spese */}
            <TableMonth
              id={actualMonth?.idUMonth}
              nameMonth={name}
              title={TABELLA_SPESE}
              obj={actualMonth?.leisure}
              arrayHeader={["Nota Spesa", "Costo Spesa"]}
              buttons={true}
            />

            {/* Tabelle per gli accrediti */}
            <TableMonth
              id={actualMonth?.idUMonth}
              nameMonth={name}
              title={TABELLA_ACCREDITI}
              obj={actualMonth?.fixedMonthlyCredit}
              arrayHeader={["Nota Accredito", "Costo Accredito"]}
              buttons={true}
            />

          </div>
        </>
      }

    </>
  )
}

export default Month
