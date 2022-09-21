import * as React from "react";
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col, Button, Typography, Input} from "antd"
import "./ForgotPassword.css"


const ForgotPassword = () => {
    const navigate = useNavigate();

    const createUser = () => {
        navigate('/administrator')
    }
    const back = () => {
        navigate('/')
    }
    

    return (
        <div className="loginContainer">
            <Row>
                <Button style={{marginTop: "20px", border: "none", boxShadow: "none", background: "#041C32"}} onClick={back}>
                    <ArrowLeftOutlined style={{color: "white"}}/>
                    <Typography.Text style={{color: "white"}}>Back</Typography.Text>
                </Button>
            </Row>
            <Row style={{justifyContent: "center"}}>
                <Col>
                    <Typography.Title className="TypographyTitle" style={{color: "white", opacity: ".8"}}>Reset Password</Typography.Title>
                </Col>
            </Row>
            <Row style={{justifyContent: "center"}}>
                <Col>
                    <Input className="Input" size="large" placeholder="Email Address" prefix={<MailOutlined />}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center"}}>
                <Col>
                    <Input.Password className="Input" size="large" placeholder="User Id" prefix={<UserOutlined />}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center"}}>
                <Col>
                    <Typography.Title level={4} style={{color: "white", marginTop: "20px"}}>
                        Security Question
                    </Typography.Title>
                </Col>
            </Row>
            <Row style={{justifyContent: "center"}}>
                <Col>
                    <Typography.Text style={{color: "white"}}>
                        What is the meaning of life?
                    </Typography.Text>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "10px"}}>
                <Input placeholder="Answer Security Question" className="Input"/>
            </Row>
            <Row style={{justifyContent: "center"}} >
                <Col>
                    <Button size="large" style={{width: "150px", margin: "5px", opacity: ".8"}}>Submit</Button>
                </Col>
            </Row>
        </div>
    );
}

export default ForgotPassword;
