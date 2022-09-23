import * as React from "react";
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col, Button, Typography, Input} from "antd"
import "./Login.css"


const Login = () => {
    const navigate = useNavigate();

    const createUser = () => {
        navigate('/createUser')
    }
    const forgotPassword = () => {
        navigate('/forgotPassword')
    }

    const [registerEmail, setRegisterEmail] = React.useState("");
    const [registerPassword, setRegisterPassword] = React.useState("");
    const [loginEmail, setLoginEmail] = React.useState("");
    const [loginPassword, setLoginPassword] = React.useState("");

    const [user, setUser] = React.useState({});

    //   const login = async () => {
    //     try {
    //       const user = await signInWithEmailAndPassword(
    //         auth,
    //         loginEmail,
    //         loginPassword
    //       );
    //       console.log(user);
    //     } catch (error) {
    //       console.log(error.message);
    //     }
    //   };
    
    //   const logout = async () => {
    //     await signOut(auth);
    //   };

    return (
        <div className="loginContainer">
            <Row className="rowStuff">
                <Col>
                    <Typography.Title className="TypographyTitle" style={{color: "white", opacity: ".9"}} >Login</Typography.Title>
                </Col>
            </Row>
            <Row className="rowStuff">
                <Col>
                    <Input className="Input" size="large" placeholder="Email" prefix={<UserOutlined />} onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}/>
                </Col>
            </Row>
            <Row className="rowStuff">
                <Col>
                    <Input.Password className="Input" size="large" placeholder="Password" prefix={<LockOutlined />}  onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}/>
                </Col>
            </Row>
            <Row className="rowStuff" >
                <Col>
                    <Button size="large" className="buttonStyle">Login</Button>
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
