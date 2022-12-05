import * as React from 'react'
import * as _ from "lodash"
import { Typography, Row, Col } from "antd"

//Help page creation
const JournalsHelp = () => {

    return(
        <>
            <Typography.Title level={2} style={{marginTop: "80px"}}>
                Journals
            </Typography.Title>
            <Typography.Text style={{fontSize: "16px"}}>Journal entries can be submitted with data significant to a business transaction.</Typography.Text>
            <ul>
                <li>
                    <Typography.Title level={4}>
                        Managers
                    </Typography.Title>
                    <ul style={{fontSize: "16px"}}>
                        <li>
                            Can create, approve, reject, and view all journal entries.
                        </li>
                    </ul>
                    <Typography.Title level={4}>
                        Accountants
                    </Typography.Title>
                    <ul style={{fontSize: "16px"}}>
                        <li>
                            Can create or cancel an entry and view status of submitted one.
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    );
}

export default JournalsHelp