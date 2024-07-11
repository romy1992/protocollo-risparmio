import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableMonth from '../components/month/TableMonth'
import { useGlobalContext } from '../context/context'
import { TABELLA_SPESE_FISSE } from '../context/state'
import useTitle from '../hooks/useTitle'
import { searchContainer } from '../redux/reducers/containerReducer'
import { isAuthUser } from '../redux/reducers/loginReducer'
import { USER } from '../utility/constStorage'

const Settings = () => {
  useTitle("Settings")

  const dispatch = useDispatch();
  const { container } = useSelector(state => state.containerReducer);
  const { setShowSearch } = useGlobalContext();

  useEffect(() => {
    dispatch(searchContainer(localStorage.getItem(USER)))
    // Per tenere lo stato di autenticazione attivo
    dispatch(isAuthUser(true))
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
