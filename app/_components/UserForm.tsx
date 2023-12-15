"use client"

import {useRouter} from "next/navigation"
import React, {useState} from "react"

const UserForm = () => {
    const router = useRouter()

    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setFormData((prevState) => {
            return {...prevState, [name]: value}
        })
    }

    const handleSubmit = async(e) => {

        e.preventDefault()
        setErrorMessage("")

        const res = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({formData})
        })

        if (!res.ok) {
            const response = await res.json()
            setErrorMessage(response.message)
        } else {
            router.refresh()
            router.push("/")
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit} method="post">
            <h1>Create New User</h1>
            <label>Full Name</label>
            <input id = "name" name = "name" onChange = {handleChange} required={true} type = "text" value={formData.name}/>
            <label>Email</label>
            <input id = "email" name = "email" onChange = {handleChange} required={true} type = "text" value={formData.email}/>
            <label>Password</label>
            <input id = "password" name = "password" onChange = {handleChange} required={true} type = "password" value={formData.password}/>
            <input type = "submit" value = "Create User" onSubmit = {handleSubmit}/>
        </form>
        <p>{errorMessage}</p>
        </>
    )
}

export default UserForm