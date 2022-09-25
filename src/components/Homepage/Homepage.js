import * as React from "react";
import { Row, Col } from "antd"

const Homepage = () => {

    return (
        <div className="homeContainer">
            <Row className="rowStuff">
                <Col>
                    <img src={require('../../images/instacount.png')} style={{width: "700px", marginTop: "100px", paddingLeft: "0px"}} alt="Instacount" className="logo"/>
                </Col>
            </Row>
        </div>
    );
}

export default Homepage;