import { useContext } from "react"
import AppContext from "./context/AppContext"
import ContactsList from "./components/ContactsList"
import Header from "./components/Header"
import Loader from "./components/Loader"
import ModalForm from "./components/ModalForm"
import Alert from 'react-bootstrap/Alert'

const App = () => {

  const {db, loading, error} = useContext(AppContext)

  return(
    <>
    <Header/>
    {<ModalForm/>}
    {loading && <Loader/>}
    {error && <Alert className='alerta' variant='danger'>Error {error.status}: {error.statusText}</Alert>}
    {db && <ContactsList/>}
  
    </>
  )
}

export default App