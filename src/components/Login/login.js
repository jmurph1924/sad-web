import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Typography, Input} from "antd"
import styles from "./Login.less"


const Login = () => {

    const buttonClick = (e) => {

    }

    return (
        <div classname={styles.loginContainer}>
            <Row>
                <Typography.Title className={styles.TypographyTitle}>InstaCount</Typography.Title>
            </Row>
            <Row>
                <Input size="large" placeholder="Username"/>
            </Row>
            <Row>
                <Input size="large" placeholder="Password"/>
            </Row>
            <Row>
                <Button size="large">Login</Button>
            </Row>
        </div>
    );
}

export default Login;