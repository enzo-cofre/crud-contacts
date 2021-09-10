import { MdPersonAdd } from 'react-icons/md'
import { useContext } from "react"
import AppContext from "../context/AppContext"

const Header = () => {

    const {setShowForm, error, loading} = useContext(AppContext)

    return (
        <header>
            <div className="containerWidth">
            <h1>CONTACTS</h1>
            <button disabled={(error || loading)? true : false} onClick={()=>setShowForm(true)}><MdPersonAdd className="icon"/></button>
            </div>
        </header>
    )
}

export default Header
