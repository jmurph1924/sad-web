import * as React from 'react'
import * as _ from "lodash"
import { Typography, Row, Col } from "antd"


const ChartsHelp = () => {

    return(
        <>
            <Typography.Title level={2} style={{marginTop: "80px"}}>
                Charts of Accounts
            </Typography.Title>
            <ul>
                <li style={{marginBottom: "20px"}}>
                    <Typography.Title level={4}>
                        Account Management
                    </Typography.Title>
                    <Typography.Text style={{fontSize: "16px"}}>You can add accounts by selecting the Add an Account button located on the top left of the screen.</Typography.Text>
                </li>
                <li>
                    <Typography.Title level={4}>
                        Key Features
                    </Typography.Title>
                    <ul style={{fontSize: "16px"}}>
                        <li>
                            Charts of Account:
                            <ul>
                                <li>
                                    Charts of Accounts is organized by category and sub-category.
                                </li>
                                <li>
                                    Displays accounts based on the debit or credit the account was created on.
                                </li>
                                <li>
                                    Displays a statement and comment on why the account was created and by whom.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Account Search: 
                            <ul>
                                <li>
                                    Allows access to find accounts by Account Name or Account Number and displays them.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Calendar:
                            <ul>
                                <li>
                                    The Calendar is used to change the current displayed date of accounts.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Event Log:
                            <ul>
                                <li>
                                    Displays the previous and current image of each record that has been added, changed, or deactivated.
                                </li>
                                <li>
                                    Displays the user who made this change and when this change was made.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    );
}

export default ChartsHelp