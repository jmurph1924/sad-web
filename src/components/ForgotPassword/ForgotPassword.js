import * as React from "react";
import * as _ from "lodash"
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, ArrowLeftOutlined, FrownTwoTone, SmileFilled } from '@ant-design/icons';
import { Row, Col, Button, Typography, Input} from "antd"
import "./ForgotPassword.css"

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [passWord, setPassword] = React.useState("");
    
    const back = () => {
        navigate('/')
    }
    
    const containsLetters = (letter) => {
        return /[a-zA-Z]/.test(letter);
    }
    const containsSpecialCharacters = (character) => {
        //eslint-disable-next-line
        return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(character);
    }
    const containsNumber = (number) => {
        return /\d/.test(number);
    }

    const isAbleToSubmit = (_.isNil(passWord) === true ? false : !(containsLetters(passWord) && containsSpecialCharacters(passWord) && containsNumber(passWord)))

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
                    <Button size="large" style={{width: "150px", margin: "10px", opacity: ".9"}}>Submit</Button>
                </Col>
            </Row>
            <Row style={{justifyContent: "center"}}>
                <Col>
                    <Typography.Title level={4} style={{color: "white", marginTop: "20px"}}>
                        Enter New Password
                    </Typography.Title>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "10px"}}>
                <Input placeholder="Enter New Password" className="Input" onChange={(e) => setPassword(e.target.value)}/>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "10px"}}>
                <Input placeholder="Re-Enter Password" className="Input"/>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "10px", marginLeft: "55px"}}>
                <Col style={{paddingRight: "65px"}}>
                    {(passWord?.length >= 8) === true ? <SmileFilled style={{color: "#ECB365", fontSize: "20px"}}/> : <FrownTwoTone style={{fontSize: "20px"}}/>}
                    <Typography.Text style={{color: "white"}}>{" "}Password Must Be Longer Than 8 Characters</Typography.Text>
                </Col>
                <Col span={4}>
                    {(containsLetters(passWord)) === true  ? <SmileFilled style={{color: "#ECB365", fontSize: "20px"}}/> : <FrownTwoTone style={{fontSize: "20px"}}/>}
                    <Typography.Text style={{color: "white"}}>{" "}Password Must Start With a Letter</Typography.Text>
                </Col>
                <Col>
                    {(containsSpecialCharacters(passWord) && containsNumber(passWord)) === true ? <SmileFilled style={{color: "#ECB365", fontSize: "20px"}}/> : <FrownTwoTone style={{fontSize: "20px"}}/>}
                    <Typography.Text style={{color: "white"}}>{" "}Password Must Contain a Number and a Special Character</Typography.Text>
                </Col>
            </Row>
            
            <Row style={{justifyContent: "center"}} >
                <Col>
                    <Button size="large" disabled={isAbleToSubmit} style={{width: "150px", margin: "15px", opacity: ".9"}}>Submit</Button>
                </Col>
            </Row>
        </div>
    );
}

export default ForgotPassword;
