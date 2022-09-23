import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../features/user";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col, Button, Typography, Input} from "antd";
import "./Login.css"
import { auth } from "../../firebase-config";
import {
    signInWithEmailAndPassword,
  } from "firebase/auth";
  

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createUser = () => {
        navigate('/createUser')
    }
    const forgotPassword = () => {
        navigate('/forgotPassword')
    }

    const [loginEmail, setLoginEmail] = React.useState("");
    const [loginPassword, setLoginPassword] = React.useState("");

      const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
          );
          dispatch(loginUser(user));
          console.log(user);
        } catch (error) {
          console.log(error.message);
        }
        
      };

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
                        setLoginEmail(event.target.value);
                    }}/>
                </Col>
            </Row>
            <Row className="rowStuff">
                <Col>
                    <Input.Password className="Input" size="large" placeholder="Password" prefix={<LockOutlined />}  onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}/>
                </Col>
            </Row>
            <Row className="rowStuff" >
                <Col>
                    <Button size="large" className="buttonStyle" onClick={() => login}>Login</Button>
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
