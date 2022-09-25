import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, methods } from "../firebase-config"
import { sendPasswordResetEmail } from "firebase/auth"
import { message } from 'antd'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return methods.createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return methods.signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return methods.signOut(auth)
    }

    function forgetPassword(email) {
        return sendPasswordResetEmail(auth, email).then((a) => {
            message.info("Password reset email sent")
        });
    }

    useEffect(() => {
        const unsubscribe = methods.onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        forgetPassword,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

