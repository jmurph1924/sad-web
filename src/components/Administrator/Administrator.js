import * as React from "react";
import { Row, Collapse} from "antd"
import "./Administrator.css"


const Administrator = () => {

    return (
        <div className="loginContainer">
            <Row style={{justifyContent: "center"}}>
                <Collapse defaultActiveKey={['1']} style={{width: "1200px", marginTop: "100px"}} >
                    <Collapse.Panel header="Users" key="1">
                    </Collapse.Panel>
                    <Collapse.Panel header="Expired Passwords" key="2">
                    </Collapse.Panel>
                    <Collapse.Panel header="This is Collapse.Panel header 3" key="3">
                    </Collapse.Panel>
                </Collapse>
            </Row>
        </div>
    );
}

export default Administrator;
