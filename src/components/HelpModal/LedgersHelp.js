import * as React from 'react'
import * as _ from "lodash"
import { Typography, Row, Col } from "antd"

//Help page creation
const LedgersHelp = () => {

    return(
        <>
            <Typography.Title level={2} style={{marginTop: "80px"}}>
                Ledgers
            </Typography.Title>
            <ul>
                <li>
                    Collection of account transactions recorded.
                </li>
                <li>
                This page displays all entries with the date of journal entry, description column, debit/credit/balance, and the balance after each transaction. You can also filter by date, account name, or amount.
                </li>
            </ul>
        </>
    );
}

export default LedgersHelp