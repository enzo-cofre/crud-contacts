import { useContext } from "react"
import AppContext from "../context/AppContext"

import { FaUserCircle } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';


const ListItem = ({contact}) => {

    const {deleteContact, setDataToEdit, setShowForm} = useContext(AppContext)

    const {id, username, email} = contact

    return (
        <>
        <li>
            <div>
                <FaUserCircle className="avatar"/>
            </div>
            <div> 
                <h3>{username}</h3>
                <h4>{email}</h4>
            </div>
            <div>
                <button onClick={() => {
                    setDataToEdit(contact)
                    setShowForm(true)
                }}><AiFillEdit className="icon" /></button>
                <button onClick={()=>deleteContact(id)}><AiFillDelete className="icon"/></button>

            </div>
            
        </li>
        <hr/>
        </>
    )
}

export default ListItem


