import * as React from "react";
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col, Button, Typography, Input} from "antd";
import "./Login.css"


const Login = () => {
    const navigate = useNavigate();

    const createUser = () => {
        navigate('/createUser')
    }
    const forgotPassword = () => {
        navigate('/forgotPassword')
    }

    return (
        <div className="loginContainer">
            <Row style={{justifyContent: "center"}}>
                <Col>
                    <Typography.Title className="TypographyTitle" style={{color: "white", opacity: ".9"}}>Login</Typography.Title>
                </Col>
            </Row>
            <Row style={{justifyContent: "center"}}>
                <Col>
                    <Input className="Input" size="large" placeholder="User Id" prefix={<UserOutlined />}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center"}}>
                <Col>
                    <Input.Password className="Input" size="large" placeholder="Password" prefix={<LockOutlined />}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center"}} >
                <Col>
                    <Button size="large" className="buttonStyle">Login</Button>
                </Col>
                <Col>
                    <Button size="large" className="buttonStyle" onClick={forgotPassword}>Forgot Password</Button>
                </Col>
            </Row>
            <Row style={{justifyContent: "center"}} >
                <Col>
                    <Button size="large" className="buttonStyle" onClick={createUser}>Create New User</Button>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
