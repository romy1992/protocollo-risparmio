import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Salary from '../components/month/Salary';
import TableMonth from '../components/month/TableMonth';
import { useGlobalContext } from '../context/context';
import { TABELLA_ACCREDITI, TABELLA_SPESE } from '../context/state';
import useTitle from '../hooks/useTitle';

const Month = () => {
  const { name } = useParams();
  useTitle(`Mese di ${name}`)

  const { months, setShowSearch } = useGlobalContext();
  const [month, setMonth] = useState();

  useEffect(() => {
    const ms = months.filter((el) => el.name === name);
    if (ms.length > 0)
      setMonth(months.filter((el) => el.name === name)[0])

    console.log(ms)
    setShowSearch(false)
  }, [name, month.salary, month.cost, month])

  return (
    <div className='container' >
      <h1 className='mt-3 text-center'>{month.name} {month.year}</h1>
      <h4 className='mt-3'>Spese Totali : {month && month.cost} €</h4>
      <h4 className='mt-3'>Risparmi Totali : {month.difference} €</h4>
      <h6 className='mt-3'>{month.des}</h6>
      <hr />
      <>
        {/* Componente di modifica stipendio */}
        <Salary month={month} />

        {/* Tabelle per le spese */}
        <TableMonth
          id={month.id}
          salary={month.salary}
          nameMonth={name}
          title={TABELLA_SPESE}
          obj={month.leisure}
          arrayHeader={["Nota Spesa", "Costo Spesa"]}
          buttons={true}
        />

        {/* Tabelle per gli accrediti */}
        <TableMonth
          id={month.id}
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
}

export default Month
