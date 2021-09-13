import { createContext, useState, useEffect } from "react"
import { helpHttp } from "../helpers/helpHttp"

const AppContext = createContext()

const AppProvider = ({children}) => {


  const [db, setDb] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [dataToEdit,setDataToEdit] = useState(null)


  let url = 'http://localhost:5000/users'

  useEffect(() => {
    setLoading(true)
    
    helpHttp().get(url)
      .then(res => {
        if(!res.err){
          setDb(res)
          setError(null)
        }else{
          setDb(null)
          setError(res)
        }
        setLoading(false)
      })
    }, [url])

  const addContact = (user) => {
    let options = {
      headers: {'Content-Type': 'application/json'},
      body: user
    }
  
    helpHttp().post(url, options)
      .then(res => {
        if(!res.err){
          setDb([...db, res])
        }else{
          setError(res)
        }
      })
  }


  const editContact = (user) => {

    const endpoint = `${url}/${user.id}`
  
    let options = {
      headers: {'Content-Type': 'application/json'},
      body: user
    }
  
    helpHttp().put(endpoint, options)
      .then(res => {
        if(!res.err){
          const newDb = db.map(el=> el.id === res.id ? res : el)
          setDb(newDb)
        }else{
          setError(res)
        }
      })
  }

  const deleteContact = (id) => {
      const okDelete = window.confirm('Are you sure you want to delete this contact?')
  
      if(okDelete){
        const endpoint = `${url}/${id}`
  
        let options = {
          headers: {'Content-Type': 'application/json'},
        }
  
        helpHttp().del(endpoint, options)
          .then(res => {
            if(!res.err){
              const newDb = db.filter(el => el.id !== id)
              setDb(newDb) 
            }else{
              setError(res)
            }
        })
      }
  }

  const data = {db, loading, error, showForm, setShowForm, dataToEdit, setDataToEdit, addContact, editContact, deleteContact}

    
  return (
      <AppContext.Provider value={data}>
          {children}
      </AppContext.Provider>
  )

}

export { AppProvider }
export default AppContext
