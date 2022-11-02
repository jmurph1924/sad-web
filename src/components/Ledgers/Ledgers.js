import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase-config"
import { ApiOutlined, CoffeeOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Typography, Table, Button, Select, Input, Row, Collapse } from "antd"
import "./Ledgers.css";
const { Column, ColumnGroup } = Table;

const Ledgers = () => {
    const [ledgers, setLedgers] = useState([]);
    const [date, setdate] = useState("");
    const [description, setDescription] = useState("");
    const [journalReference, setJournalReference] = useState("");
    const [debit, setDebit] = useState(null);
    const [credit, setCredit] = useState(null);
    const [balance, setBalance] = useState(null);
    const isChartEditable = true;

    // needs getLedgers()
    // useEffect(() => {
    //     getLedgerss()
    // }, [])

    const columns = [
        {
            title: 'Date',
            key: 'date',
            render: item => {
              return (
                  <>
                      {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                      <>
                          {item?.data.date}
                      </>
                      }
                </>
              )
            }
          },
          {
            title: 'Description',
            key: 'description',
            render: item => {
              return (
                  <>
                      {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                      <>
                          {item?.data.description}
                      </>
                      }
                </>
              )
            }
          },
          {
            title: 'Journal Reference',
            // ?? i don't know how to access this
            key: 'journal',
            render: item => {
              return (
                  <>
                      {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                      <>
                          {item?.data.journal}
                      </>
                      }
                </>
              )
            }
          },
          {
            title: 'Debit',
            key: 'debit',
            render: item => {
              return (
                  <>
                      {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                      <>
                          {item?.data.debit}
                      </>
                      }
                </>
              )
            }
          },
        {
            title: 'Credit',
            key: 'credit',
            render: item => {
              return (
                  <>
                      {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                      <>
                          {item?.data.credit}
                      </>
                      }
                </>
              )
            }
          },
          {
            title: 'Balance',
            key: 'balance',
            render: item => {
              return (
                <>
                  {_.isEqual(isChartEditable, item?.id) === true ?  <Input /> :
                    <>
                    {item?.data.balance}
                </>
                  }
                </>
              )
            }
          }
    ]
    
    // ledger page must show the date of the journal  entry, a description, 
    // debit, credit, and balance column, also a clickable post reference tht leads to journal
    // balance after each transaction and posting must be accurate
    // must have filtering and search features (filtering by date or date range and search account name or amount)

    let locale3 = {
        emptyText: 'No Current Ledgers',
      };

    const LedgersTable = () => (
        <Table locale={locale3} columns={columns} dataSource={ledgers} />
      );

    return(
        <div className="Ledgers-container">
            <Row style={{justifyContent: "center"}}>
                <Collapse defaultActiveKey={['1']} style={{width: "2400px", marginTop: "50px"}} >
                    <Collapse.Panel header="Ledgers" key="1">
                        <LedgersTable />
                    </Collapse.Panel>
                </Collapse>
            </Row>
        </div>
  );
}

export default Ledgers;