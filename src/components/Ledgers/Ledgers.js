import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import * as _ from "lodash";
import moment from 'moment';
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
   
    const location = useLocation()
    const specificAccount = location.state;
    const ledger2 = ledgers.filter(f => f.data.journal === specificAccount?.specificAccount);
    console.log(specificAccount)

    // needs getLedgers()
    useEffect(() => {
        getLedgers()
    }, [])

   // Gets users from database
   const getLedgers = () => {
    // Specifies database collection you are using
    const usersCollectionRef = collection(db, 'ledgers')

    // Gets all the documents from that collection
    getDocs(usersCollectionRef).then(response => {
        // maps documents to an array
        const charts = response.docs.map(doc => ({
            data: doc.data(), 
            id: doc.id,
        }))
        //Adds that array to state
        setLedgers(charts);
    }).catch(error => console.log(error.message))
  }

    const columns = [
        {
            title: 'Date',
            key: 'date',
            render: item => {
              return (
                  <>
                      {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                      <>
                          {moment(item?.data.date.toDate()).format('M/D/YYYY h:mma')}
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

    const LedgersTable = (ledgerCharts) => (
        <Table locale={locale3} columns={columns} dataSource={ledgerCharts} />
      );

    return(
        <div className="Ledgers-container">
            <Row style={{justifyContent: "center"}}>
                <Collapse defaultActiveKey={['1']} style={{width: "2400px", marginTop: "50px"}} >
                    {ledger2.length > 0 && 
                        <Collapse.Panel header="Ledger from Account" key="1">
                            {LedgersTable(ledger2)}
                        </Collapse.Panel>
                    }
                    <Collapse.Panel header="Ledgers" key="2">
                        {LedgersTable(ledgers)}
                    </Collapse.Panel>
                </Collapse>
            </Row>
        </div>
  );
}

export default Ledgers;