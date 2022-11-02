import * as React from 'react'
import * as _ from "lodash"
import { Typography, Row, Col } from "antd"


const AccessibilityHelp = () => {

    return(
        <>
            <Typography.Title level={2} style={{marginTop: "80px"}}>
                Accessibility
            </Typography.Title>
            <ul>
                <li style={{marginBottom: "20px"}}>
                    <Typography.Title level={4}>
                        Roles
                    </Typography.Title>
                </li>
                <ul>
                <li>
                    <Typography.Title level={4}>
                        Administrator 
                    </Typography.Title>
                    <ul style={{fontSize: "16px"}}>
                        <li>
                            Has access to the Homepage, Chart of Accounts, Ledgers, and Administrator.
                        </li>
                        <li>
                            Can activate and deactivate users from applications.
                        </li>
                        <li>
                            Can change data related to users account information and email all users on the application.
                        </li>
                    </ul>
                </li>
                <li>
                    <Typography.Title level={4}>
                        Manager 
                    </Typography.Title>
                    <ul style={{fontSize: "16px"}}>
                        <li>
                            Has access to the Homepage, Chart of Accounts, and Ledgers
                        </li>
                        <li>
                            Can access and change the Chart of Accounts. 
                        </li>
                    </ul>
                </li>
                <li>
                    <Typography.Title level={4}>
                        Accountant 
                    </Typography.Title>
                    <ul style={{fontSize: "16px"}}>
                        <li>
                            Has access to the Homepage, Chart of Accounts, and Ledgers
                        </li>
                        <li>
                            Can access and change the Chart of Accounts.
                        </li>
                    </ul>
                </li>
                </ul>
            </ul>
        </>
    );
}

export default AccessibilityHelp