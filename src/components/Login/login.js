import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button } from "antd"

const login = () => {

    const buttonClick = (e) => {

    }

    return (
        <>
            {user.isEqual(authorization) ? 
            <Row>
                <Col>
                    <Button onClick={(e) => buttonClick(e)}> This is a Button </Button>
                </Col>
            </Row>
            : <> </>}
        </>
    );
}

export default login;