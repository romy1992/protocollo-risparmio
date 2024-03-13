import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Salary from '../components/month/Salary';
import TableMonth from '../components/month/TableMonth';
import { useGlobalContext } from '../context/context';
import { TABELLA_ACCREDITI, TABELLA_SPESE } from '../context/state';
import useTitle from '../hooks/useTitle';

const Month = () => {
  const { name } = useParams();
  useTitle(`Mese di ${name}`)
  const { isLoading, setShowSearch, isAuth, globalSearchContainer } = useGlobalContext();
  const containerReducer = useSelector(state => state.containerReducer)
  const { actualMonth } = containerReducer
  useEffect(() => {
    globalSearchContainer(localStorage.getItem("user"), name)
    setShowSearch(false)
    isAuth()
  }, [])

  return (
    <>
      {
        !isLoading &&
          <>
            <div className='container' >
              <h1 className='mt-3 text-center'>{actualMonth?.title} {actualMonth?.note}</h1>
              <h4 className='mt-3'>Spese Totali : {actualMonth?.cost} €</h4>
              <h4 className='mt-3'>Risparmi Totali : {actualMonth?.difference} €</h4>
              <h6 className='mt-3'>{actualMonth?.des}</h6>
              <hr />

              {/* Componente di modifica stipendio */}
              <Salary idUMonth={actualMonth?.idUMonth} salary={actualMonth?.salary} />

              {/* Tabelle per le spese */}
              <TableMonth
                id={actualMonth?.idUMonth}
                salary={actualMonth?.salary}
                nameMonth={name}
                title={TABELLA_SPESE}
                obj={actualMonth?.leisure}
                arrayHeader={["Nota Spesa", "Costo Spesa"]}
                buttons={true}
              />

              {/* Tabelle per gli accrediti */}
              <TableMonth
                id={actualMonth?.idUMonth}
                salary={actualMonth?.salary}
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
