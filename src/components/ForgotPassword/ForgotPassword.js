import React, { useState, useEffect } from "react";
import * as _ from "lodash"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase-config"
import { useNavigate } from 'react-router-dom';
import {  MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col, Button, Typography, Input, message, Tooltip} from "antd"
import { useAuth } from '../../contexts/AuthContext'
import "./ForgotPassword.css"

//Forgot Password Function
const ForgotPassword = () => {

    //Variable Creation for the Forget Password Function
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [ user, setUser ] = useState(null);
    const [ email, setEmail ] = useState("");
    const [ passwordAnswer, setPasswordAnswer ] = useState("");
    const { forgetPassword } = useAuth()
    
    //Calling User Data on render
    useEffect(() => {
        getUsers()
    }, [])

    // Back Variable Creation
    const back = () => {
        navigate('/')
    }
    //Varible for submission of forgot password email
    const onSubmit = () => {
        if(users?.some((e) => _.isEqual(e.data.email, email))){
            setUser(users?.filter(e => _.isEqual(e.data.email, email)))
        } else{
            message.error("Email not valid, Please try again")
        }
    }
    //Varible for submission of forgot password Security Question
    const passwordChange = () => {
        if(_.isEqual(user[0].data.pwQuestionAnswer, passwordAnswer) ){
            forgetPassword(email).then(response => {
                console.log(response)
                navigate('/')
            }).catch(e => console.log(e))
        }else{
            message.error("Incorrect Security Question Answer")
        }
    }
    //Variable for Collecting User Data
    const getUsers = () => {
        const usersCollectionRef = collection(db, 'users')
        getDocs(usersCollectionRef).then(response => {
            const usrs = response.docs.map(doc => ({
                data: doc.data(), 
                id: doc.id,
            }))
            setUsers(usrs);
        }).catch(error => console.log(error.message))
      }
    
    //Variable Return for Forgot Password Function
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
                    <Typography.Title className="TypographyTitle" style={{color: "white", opacity: ".9"}}>Reset Password</Typography.Title>
                </Col>
            </Row>
            <Row style={{justifyContent: "center"}}>
                <Col>
                    <Input className="Input" size="large" placeholder="Email Address" onChange={e => setEmail(e.target.value)} prefix={<MailOutlined />}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center"}} >
                    <Col>
                        <Button size="large" style={{width: "150px", margin: "10px", opacity: ".9"}} onClick={() => onSubmit()} >Submit</Button>
                    </Col>
            </Row>
            { !_.isNil(user) && 
           <>
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
                            {user[0].data.passwordQuestion}
                        </Typography.Text>
                    </Col>
                </Row>
                <Row style={{justifyContent: "center", marginTop: "10px"}}>
                    <Input placeholder="Answer Security Question" className="Input" onChange={(e) => setPasswordAnswer(e.target.value)}/>
                </Row>
                <Row style={{justifyContent: "center"}} >
                    <Col>
                        <Button size="large" style={{width: "150px", margin: "10px", opacity: ".9"}} onClick={() => passwordChange()}>Submit</Button>
                    </Col>
                </Row>
            </>
            }
        </div>
    );
}
//Data export for Forgot Password Function
export default ForgotPassword;
