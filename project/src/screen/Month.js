import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Salary from '../components/month/Salary';
import TableMonth from '../components/month/TableMonth';
import { useGlobalContext } from '../context/context';
import { TABELLA_ACCREDITI, TABELLA_SPESE } from '../context/state';
import useTitle from '../hooks/useTitle';
import Error from './Error'

const Month = () => {
  const { name } = useParams();
  useTitle(`Mese di ${name}`)

  const { stateContainer, setShowSearch, isAuth } = useGlobalContext();
  const { container } = stateContainer;
  const [month, setMonth] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const ms = container.months.filter((el) => el.title === name);
    if (ms.length > 0)
      setMonth(container.months.filter((el) => el.title === name)[0])
    setShowSearch(false)
    isAuth()
  }, [name, month && month.salary, month && month.cost, month])

  if (month)
    return (
      <div className='container' >
        <h1 className='mt-3 text-center'>{month.title} {month.note}</h1>
        <h4 className='mt-3'>Spese Totali : {month.cost} €</h4>
        <h4 className='mt-3'>Risparmi Totali : {month.difference} €</h4>
        <h6 className='mt-3'>{month.des}</h6>
        <hr />
        <>
          {/* Componente di modifica stipendio */}
          <Salary month={month} />

          {/* Tabelle per le spese */}
          <TableMonth
            id={month.idUMonth}
            salary={month.salary}
            nameMonth={name}
            title={TABELLA_SPESE}
            obj={month.leisure}
            arrayHeader={["Nota Spesa", "Costo Spesa"]}
            buttons={true}
          />

          {/* Tabelle per gli accrediti */}
          <TableMonth
            id={month.idUMonth}
            salary={month.salary}
            nameMonth={name}
            title={TABELLA_ACCREDITI}
            obj={month.fixedMonthlyCredit}
            arrayHeader={["Nota Accredito", "Costo Accredito"]}
            buttons={true}
          />
        </>
      </div>
    )
  else
    return (
      <Error />
    )
}

export default Month
