import ListItem from './ListItem'
import { useContext } from "react"
import AppContext from '../context/AppContext'

const ContactsList = () => {

    const {db} = useContext(AppContext)

    return (
        <ul className="containerWidth">
            {
                db.length > 0 ? 
                db.map(contact => <ListItem key={contact.id} contact={contact}/>)
                : <p>No data to show</p>
            }
        </ul>
    )
}

export default ContactsList
