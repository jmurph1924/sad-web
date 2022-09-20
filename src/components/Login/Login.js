import * as React from "react";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col, Button, Typography, Input} from "antd"
import "./Login.css"


const Login = () => {

    const buttonClick = (e) => {

    }

    return (
        <div className="loginContainer">
            <Row style={{justifyContent: "center"}}>
                <Col>
                    <Typography.Title className="TypographyTitle" style={{color: "white", opacity: ".8"}}>Login</Typography.Title>
                </Col>
            </Row>
            <Row style={{justifyContent: "center"}}>
                <Col>
                    <Input className="Input" size="large" placeholder="Email" prefix={<UserOutlined />}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center"}}>
                <Col>
                    <Input.Password className="Input" size="large" placeholder="Password" prefix={<LockOutlined />}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center"}} >
                <Col>
                    <Button size="large" style={{width: "150px", margin: "5px", opacity: ".8"}}>Login</Button>
                </Col>
                <Col>
                    <Button size="large" style={{width: "150px", margin: "5px", opacity: ".8"}}>Forgot Password</Button>
                </Col>
            </Row>
            <Row style={{justifyContent: "center"}} >
                <Col>
                    <Button size="large" style={{width: "150px", margin: "5px", opacity: ".8"}}>Create New User</Button>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
