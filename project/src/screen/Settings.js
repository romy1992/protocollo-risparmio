import React, { useEffect } from 'react'
import TableMonth from '../components/TableMonth'
import { useGlobalContext } from '../context/context'
import useTitle from '../hooks/useTitle'
import { TABELLA_SPESE_FISSE } from '../context/state'

const Settings = () => {
  useTitle("Settings")
  const { setShowSearch, fixedCost } = useGlobalContext()

  useEffect(() => {
    setShowSearch(false)
  }, [])

  return (
    <div>
      {/* Tabelle per le spese fisse*/}
      <TableMonth
        title={TABELLA_SPESE_FISSE}
        obj={fixedCost}
        arrayHeader={["Nota Spesa Fissa", "Costo Spesa Fissa"]}
        buttons={true}
      />
    </div>
  )
}

export default Settings
