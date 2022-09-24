import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col, Button, Typography, Input, Alert} from "antd";
import "./Login.css"
  

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(currentUser) {
            navigate('/')
        }
    }, [])
    
    async function handleSubmit() {

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.input.value, passwordRef.current.input.value)
            navigate("/homepage")
        } catch(e) {
            console.log(e)
            setError("Failed to sign in")
        }

        setLoading(false)
    }

    const createUser = () => {
        navigate('/createUser')
    }
    const forgotPassword = () => {
        navigate('/forgotPassword')
    }

    return (
        <div className="loginContainer">
            {error && <Alert variant="danger" style={{marginTop: "40px"}}>{error}</Alert>}
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
                    <Input.Password className="Input" size="large" placeholder="Password" prefix={<LockOutlined />} ref={passwordRef}/>
                </Col>
            </Row>
            <Row className="rowStuff" >
                <Col>
                    <Button size="large" className="buttonStyle" disabled={loading} onClick={() => handleSubmit()}>Login</Button>
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

export default Login;
