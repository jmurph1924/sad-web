import React, { useEffect, useRef, useState } from 'react'
import * as _ from "lodash"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase-config"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col, Button, Typography, Input, Alert, message, Tooltip} from "antd";
import "./Login.css"
  
//Login Function
const Login = () => {
 
    // Login Varible Creation   
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, logout } = useAuth()
    const navigate = useNavigate()
    const [invalidIdentification, setInvalidIdentification] = useState(2);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([]);

    //Logout function Calls on render
    useEffect(() => {
            try {
                //trying to make it deploy
                logout()
            } catch (e) {
                console.error(e)
            }
        getUsers()
    }, [])

    //User Data fetch
    const getUsers = () => {
        const usersCollectionRef = collection(db, 'users')
        getDocs(usersCollectionRef).then(response => {
            const usrs = response.docs.map(doc => ({
                data: doc.data(), 
                id: doc.id,
            }))
            setUsers(usrs);
        }).catch (error => console.log(error.message))
      }

    //Log in Function with Password attempt limiter 
    async function handleSubmit() {
        if(users?.some((e) => _.isEqual(e.data.email, emailRef.current.input.defaultValue) && _.isEqual(e.data.disabled, false))){
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.input.value, passwordRef.current.input.value)
            navigate("/homepage")
        } catch(e) {
            console.log(e)
            if(invalidIdentification === 0){
                setInvalidIdentification(invalidIdentification - 1)
                setTimeout(function() {setInvalidIdentification(2)}, 300000)
                setError(`Maximum number of tries reach, Please try again in 5 minutes`)
            }
            else{
                setInvalidIdentification(invalidIdentification - 1)
                setError(`Invalid Email/Password, ${invalidIdentification} attempts remaining`)
            }
        }
    }  else{
        message.error("User account has been disabled. Please contact an administrator for access")
    }
        setLoading(false)
    }

    //Create User Function Call
    const createUser = () => {
        navigate('/createUser')
    }

    //Forgot Password Function
    const forgotPassword = () => {
        navigate('/forgotPassword')
    }

    //Return of Varibles and Functions for the Login page
    return (
        <div className="loginContainer">
            {error && 
            <Row className="rowStuff">
                <Alert type="error" closable showIcon message={error} style={{marginTop: "40px", width: "480px", height: "40px",justifyContent: "center"}}/>
            </Row>
            }
            <Row className="rowStuff">
                <Col>
                    <Typography.Title className="TypographyTitle" style={{color: "white", opacity: ".9"}} >Login</Typography.Title>
                </Col>
            </Row>
            <Row className="rowStuff">
                <Col>
                    <Input className="Input" size="large" placeholder="Email" prefix={<UserOutlined />} ref={emailRef}/>
                </Col>
            </Row>
            <Row className="rowStuff">
                <Col>
                    <Input.Password className="Input" size="large" placeholder="Password" prefix={<LockOutlined />} onPressEnter={() => handleSubmit()} ref={passwordRef}/>
                </Col>
            </Row>
            <Row className="rowStuff" >
                <Col>
                    <Button size="large" className="buttonStyle" disabled={loading || (invalidIdentification === -1) === true} onClick={() => handleSubmit()}>Login</Button>
                </Col>
                <Col>
                    <Button size="large" className="buttonStyle" onClick={forgotPassword}>Forgot Password</Button>
                </Col>
            </Row>
            <Row className="rowStuff" >
                <Col>
                    <Button size="large" className="buttonStyle" onClick={createUser}>Create New User</Button>
                </Col>
            </Row>
        </div>
    );
}

//Export Login Page Data
export default Login;
