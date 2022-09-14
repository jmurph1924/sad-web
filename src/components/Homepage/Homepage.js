import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button } from "antd"

const Homepage = () => {

    const buttonClick = (e) => {

    }

    return (
        <div>
            <Row>
                <Col>
                    <Button onClick={(e) => buttonClick(e)}> Homepage </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Homepage;