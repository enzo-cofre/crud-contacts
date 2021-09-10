import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../context/AppContext'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const initialForm = {
    id: null,
    username: '',
    email: ''
}

const validate = (data, db) => {
    let errors = {}
    let takenUser = db.filter(el=>el.username === data.username && el.id !== data.id)
    let takenEmail = db.filter(el=>el.email === data.email && el.id !==data.id)

    if (!data.username.trim()) {
        errors.username = 'Username required'
    } else if (takenUser.length > 0) {
        errors.username = 'Username already taken'
    }

    if (!data.email.trim()) {
        errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Email address is invalid'
    } else if (takenEmail.length > 0) {
        errors.email = 'Email already exists'
    }
    return errors     
}


const ModalForm = () => {

    const {showForm, setShowForm, dataToEdit, setDataToEdit, addContact, editContact, db} = useContext(AppContext)

    const [form,setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    //Check edit vs create
    useEffect(() => {
        if(dataToEdit){
            setForm(dataToEdit)
        }else{
            setForm(initialForm)
        }
    }, [dataToEdit])

    const handleReset=()=>{
        setForm(initialForm)
        setErrors({})
        setDataToEdit(null)
        setIsSubmitting(false)
    }

    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validate(form,db))
        setIsSubmitting(true)
    }
  
    
    useEffect(
        () => {
          if (Object.keys(errors).length === 0 && isSubmitting) {
            if(!form.id){
                addContact(form)
            }else{
                editContact(form)
            }
            handleReset()
            setShowForm(false)
          }else{
              setIsSubmitting(false)
          }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[errors])


    
    return (
        <Modal show={showForm} onHide={()=>{setShowForm(false)}} backdrop="static" keyboard={false}>

            <Modal.Header className='modal-header'>
            <Modal.Title>{!dataToEdit? 'Add contact' : 'Edit contact'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" placeholder="Enter username" onChange={handleChange} value={form.username} isInvalid={errors.username? 1:0} />
            {errors.username && <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>}


            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} value={form.email} isInvalid={errors.email? 1:0} />
            {errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}

            </Form.Group>

            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{
                handleReset()
                setShowForm(false)}}>
                Cancel
            </Button>

            <Button id='button-save' variant="primary" type="submit">
                Save
            </Button>
            </Modal.Footer>
            </Form>
            </Modal.Body>
            
      </Modal>
    )
}

export default ModalForm
