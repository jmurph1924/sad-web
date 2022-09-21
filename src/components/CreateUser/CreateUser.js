import * as React from "react";
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col, Button, Typography, Input, Form} from "antd"
import "./CreateUser.css"


const CreateUser = () => {
    const navigate = useNavigate();

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
                
            </Row>
        </div>
    );
}

export default CreateUser;
