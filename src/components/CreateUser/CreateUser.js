import React, { useRef, useState, useEffect } from 'react'
import * as _ from "lodash";
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, SmileFilled, FrownTwoTone } from '@ant-design/icons';
import { Row, Col, Button, Typography, Input, Select, Alert} from "antd"
import "./CreateUser.css"


const CreateUser = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const { signup, currentUser } = useAuth()
    const [registerPassword, setRegisterPassword] = React.useState("");
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
            await signup(emailRef.current.input.value, passwordRef.current.input.value)
            navigate("/")
        } catch(e) {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

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

    const isAbleToSubmit = (_.isNil(registerPassword) === true ? false : !(containsLetters(registerPassword) && containsSpecialCharacters(registerPassword) && containsNumber(registerPassword) && registerPassword.length > 7))

    return (
        <div className="loginContainer">
            
            <Row>
                <Button style={{marginTop: "20px", border: "none", boxShadow: "none", background: "#041C32"}} onClick={back}>
                    <ArrowLeftOutlined className="stylingColor"/>
                    <Typography.Text className="stylingColor">Back</Typography.Text>
                </Button>
            </Row>
            {error && <Alert type="danger">{error}</Alert>}
            <Row style={{justifyContent: "center", marginTop: "40px"}} gutter={[8,8]}>
                <Typography.Title style={{color: "white", opacity: ".9"}}>
                    Create a New User
                </Typography.Title>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "20px"}} gutter={[8,8]}>
                <Col span={6}>
                    <Typography.Text className="stylingColor">First Name</Typography.Text>
                    <Input placeholder="First Name" style={{ opacity: ".9"}}/>
                </Col>
                <Col span={6}>
                <Typography.Text className="stylingColor">Last Name</Typography.Text>
                    <Input placeholder="Last Name" style={{ opacity: ".9"}}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "20px"}} gutter={[8,8]}>
                <Col span={6}>
                    <Typography.Text className="stylingColor">Email</Typography.Text>
                    <Input placeholder="Email" style={{ opacity: ".9"}} ref={emailRef} />
                </Col>
                <Col span={6}>
                <Typography.Text className="stylingColor">Password</Typography.Text>
                    <Input.Password placeholder="Password" style={{ opacity: ".9"}} ref={passwordRef} onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "10px", marginLeft: "55px"}}>
                <Col style={{paddingRight: "65px"}}>
                    {(registerPassword?.length >= 8) === true ? <SmileFilled style={{color: "#ECB365", fontSize: "20px"}}/> : <FrownTwoTone style={{fontSize: "20px"}}/>}
                    <Typography.Text style={{color: "white"}}>{" "}Password Must Be Longer Than 8 Characters</Typography.Text>
                </Col>
                <Col span={4}>
                    {(containsLetters(registerPassword)) === true  ? <SmileFilled style={{color: "#ECB365", fontSize: "20px"}}/> : <FrownTwoTone style={{fontSize: "20px"}}/>}
                    <Typography.Text style={{color: "white"}}>{" "}Password Must Start With a Letter</Typography.Text>
                </Col>
                <Col>
                    {(containsSpecialCharacters(registerPassword) && containsNumber(registerPassword)) === true ? <SmileFilled style={{color: "#ECB365", fontSize: "20px"}}/> : <FrownTwoTone style={{fontSize: "20px"}}/>}
                    <Typography.Text style={{color: "white"}}>{" "}Password Must Contain a Number and a Special Character</Typography.Text>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "20px"}} gutter={[8,8]} >
                <Col span={3}>
                    <Typography.Text className="stylingColor">Address</Typography.Text>
                    <Input placeholder="Address" style={{ opacity: ".9"}}/>
                </Col>
                <Col span={3}>
                    <Typography.Text className="stylingColor">City</Typography.Text>
                    <Input placeholder="City" style={{ opacity: ".9"}}/>
                </Col >
                <Col span={3}>
                    <Typography.Text className="stylingColor">State</Typography.Text>
                    <Input placeholder="State" style={{ opacity: ".9"}}/>
                </Col>
                <Col span={3}>
                    <Typography.Text className="stylingColor">Zipcode</Typography.Text>
                    <Input placeholder="Zipcode" style={{ opacity: ".9"}}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "20px"}} gutter={[8,8]}>
                <Col span={6}>
                    <Typography.Text className="stylingColor">Date of Birth</Typography.Text>
                    <Input placeholder="Date of Birth" style={{ opacity: ".9"}}/>
                </Col>
                <Col span={6}>
                    <Col>
                        <Typography.Text className="stylingColor">Role</Typography.Text>
                    </Col>
                    <Col>
                        <Select placeholder="Select a Role" style={{width: "425px", opacity: ".9"}}>
                            <Select.Option value="Administrator">Administrator</Select.Option>
                            <Select.Option value="Manager">Manager</Select.Option>
                            <Select.Option value="User">User</Select.Option>
                        </Select>
                    </Col>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "30px"}} gutter={[8,8]}>
                <Button style={{width: "400px", opacity: ".9"}} disabled={isAbleToSubmit || loading} type="submit" onClick={() => handleSubmit()}>Submit</Button>
            </Row>
        </div>
    );
}

export default CreateUser;
