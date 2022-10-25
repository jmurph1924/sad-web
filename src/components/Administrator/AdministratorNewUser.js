import React, { useRef, useState} from 'react'
import * as _ from "lodash";
import { useAuth } from "../../contexts/AuthContext"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase-config"
import { SmileFilled, FrownTwoTone } from '@ant-design/icons';
import { Row, Col, Button, Typography, Input, Select, Alert, Tooltip} from "antd"
import "./Administrator.css"

//New User Administrator Function
const AdministratorNewUser = ({onUserSubmit = _.noop}) => {

    //New Administrator Variable creation
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const { signup } = useAuth()
    const [registerPassword, setRegisterPassword] = React.useState("");

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [passwordQuestion, setPasswordQuestion] = useState("")
    const [pwQuestionAnswer, setPwQuestionAnswer] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [role, setRole] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")

    //Submit function for new Administrator user data
    async function handleSubmit() {
        const usersCollectionRef = collection(db, 'users')
        addDoc(usersCollectionRef, {active: false, address, city, dateOfBirth, disabled: true,
             email, firstname, lastname, passwordQuestion, 
             pwQuestionAnswer,  role, state, zipcode}).then(response => {
                try {
            setError("")
            setLoading(true)
            signup(emailRef.current.input.value, passwordRef.current.input.value)
            } catch(e) {
                setError("Failed to create an account")
            }

            setLoading(false)
             }).catch(error => {
                console.log(error.message)
             }) 
             onUserSubmit(false);
    }

    //Password input checks Variables
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

    //Password rules check for new user inputed Passwords before submission into database
    const isAbleToSubmit = (_.isNil(registerPassword) === true ? false : 
    !(containsLetters(registerPassword) && containsSpecialCharacters(registerPassword) && containsNumber(registerPassword) && registerPassword.length > 7 
    && firstname.length > 0 && lastname.length > 0 && address.length > 0 && state.length > 0 && city.length > 0 && email.length > 0 && passwordQuestion.length > 0 
    && pwQuestionAnswer.length > 0 && zipcode.length > 0 && role.length > 0 && dateOfBirth.length > 0))

    //Variable Return for New Administrator Users
    return (
        <div className="loginContainer">
            {error && <Alert type="danger">{error}</Alert>}
            <Row style={{justifyContent: "center", marginTop: "20px"}} gutter={[8,8]}>
                <Col span={6}>
                    <Typography.Text>First Name</Typography.Text>
                    <Input placeholder="First Name" style={{ opacity: ".9"}} onChange={e => setFirstname(e.target.value)}/>
                </Col>
                <Col span={6}>
                <Typography.Text>Last Name</Typography.Text>
                    <Input placeholder="Last Name" style={{ opacity: ".9"}} onChange={e => setLastName(e.target.value)}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "20px"}} gutter={[8,8]}>
                <Col span={6}>
                    <Typography.Text>Email</Typography.Text>
                    <Input placeholder="Email" style={{ opacity: ".9"}} ref={emailRef} onChange={e => setEmail(e.target.value)}/>
                </Col>
                <Col span={6}>
                <Typography.Text>Password</Typography.Text>
                    <Input.Password placeholder="Password" style={{ opacity: ".9"}} ref={passwordRef} onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "10px", marginLeft: "55px"}}>
                <Col style={{paddingRight: "65px"}}>
                    {(registerPassword?.length >= 8) === true ? <SmileFilled style={{color: "#ECB365", fontSize: "20px"}}/> : <FrownTwoTone style={{fontSize: "20px"}}/>}
                    <Typography.Text>{" "}Password Must Be Longer Than 8 Characters</Typography.Text>
                </Col>
                <Col span={6}>
                    {(containsLetters(registerPassword)) === true  ? <SmileFilled style={{color: "#ECB365", fontSize: "20px"}}/> : <FrownTwoTone style={{fontSize: "20px"}}/>}
                    <Typography.Text>{" "}Password Must Start With a Letter</Typography.Text>
                </Col>
                <Col>
                    {(containsSpecialCharacters(registerPassword) && containsNumber(registerPassword)) === true ? <SmileFilled style={{color: "#ECB365", fontSize: "20px"}}/> : <FrownTwoTone style={{fontSize: "20px"}}/>}
                    <Typography.Text>{" "}Password Must Contain a Number and a Special Character</Typography.Text>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "20px"}} gutter={[8,8]} >
                <Col span={3}>
                    <Typography.Text>Address</Typography.Text>
                    <Input placeholder="Address" style={{ opacity: ".9"}} onChange={e => setAddress(e.target.value)}/>
                </Col>
                <Col span={3}>
                    <Typography.Text>City</Typography.Text>
                    <Input placeholder="City" style={{ opacity: ".9"}} onChange={e => setCity(e.target.value)}/>
                </Col >
                <Col span={3}>
                    <Typography.Text>State</Typography.Text>
                    <Input placeholder="State" style={{ opacity: ".9"}} onChange={e => setState(e.target.value)}/>
                </Col>
                <Col span={3}>
                    <Typography.Text>Zipcode</Typography.Text>
                    <Input placeholder="Zipcode" style={{ opacity: ".9"}} onChange={e => setZipcode(e.target.value)}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "20px"}} gutter={[8,8]}>
                <Col span={6}>
                    <Typography.Text>Date of Birth</Typography.Text>
                    <Input placeholder="Date of Birth" style={{ opacity: ".9"}} onChange={e => setDateOfBirth(e.target.value)}/>
                </Col>
                <Col span={6}>
                    <Col>
                        <Typography.Text>Role</Typography.Text>
                    </Col>
                    <Col>
                        <Select placeholder="Select a Role" style={{width: "425px", zIndex: "9999"}} onSelect={e => setRole(e)}>
                            <Select.Option value="Administrator">Administrator</Select.Option>
                            <Select.Option value="Manager">Manager</Select.Option>
                            <Select.Option value="Accountant">Accountant</Select.Option>
                        </Select>
                    </Col>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "20px"}} gutter={[8,8]}>
                <Col span={6}>
                    <Typography.Text>Security Question</Typography.Text>
                    <Input placeholder="Security Question" style={{ opacity: ".9"}} onChange={e => setPasswordQuestion(e.target.value)}/>
                </Col>
                <Col span={6}>
                <Typography.Text>Security Question Answer</Typography.Text>
                    <Input placeholder="Security Question Answer" style={{ opacity: ".9"}} onChange={e => setPwQuestionAnswer(e.target.value)}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "30px", marginBottom: "20px"}} gutter={[8,8]}>
                <Button style={{width: "400px", opacity: ".9"}} disabled={isAbleToSubmit || loading} type="submit" onClick={() => handleSubmit()}>Submit</Button>
            </Row>
        </div>
    );
}

//Data export for New Administrator Users
export default AdministratorNewUser;
