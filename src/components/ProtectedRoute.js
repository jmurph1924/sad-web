import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

//ProtectedRoute Creation
const ProtectedRoute = () => {

    const { currentUser } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if(!currentUser) {
            navigate('/login', {replace: true})
        }
    })

    return (
        <>
            <Outlet />
        </>
    )
}

export default ProtectedRoute