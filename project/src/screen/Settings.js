import React, { useEffect } from 'react'
import TableMonth from '../components/month/TableMonth'
import { useGlobalContext } from '../context/context'
import { TABELLA_SPESE_FISSE } from '../context/state'
import useTitle from '../hooks/useTitle'

const Settings = () => {

  useTitle("Settings")
  const { container, setShowSearch, isAuth, globalSearchContainer } = useGlobalContext();
  useEffect(() => {
    globalSearchContainer(localStorage.getItem("user"))
    // Per tenere lo stato di autenticazione attivo
    isAuth()
    setShowSearch(false)
  }, [])

  return (
    <div>
      {/* Tabelle per le spese fisse*/}
      <TableMonth
        title={TABELLA_SPESE_FISSE}
        obj={container?.fixedCost?.costs}
        arrayHeader={["Nota Spesa Fissa", "Costo Spesa Fissa"]}
        buttons={true}
      />
    </div>
  )
}

export default Settings
