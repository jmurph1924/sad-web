import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import * as currencyFormatter from "currency-formatter";
import moment from 'moment';
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { collection, getDocs, doc, updateDoc, Timestamp, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Typography, Table, Button, Input, Row, Collapse, Calendar, Modal, Col, message, Tooltip, Form, DatePicker } from "antd";
import "./Journals.css";
import { useAuth } from '../../contexts/AuthContext'

import HelpModal from "../HelpModal/HelpModal";
import AddAnAccount from "./AddAnAccount";

const currencyFormatDecimal = { code: "USD", decimalDigits: 2, precision: 2};

const Journals = () => {

  const navigate = useNavigate();
  const { currentUser } = useAuth()
  const [journals, setJournals] = useState([]);
  const [ calendar, setCalendar ] = useState(false);
  const [ helpModal, setHelpModal ] = useState(false);
  const [ accountModal, setAccountModal ] = useState(false);
  const [ search, setSearch ] = useState([]);
  const [ isAccountSearch, setIsAccountSearch ] = useState(false);
  const [users, setUsers] = useState([]);

  const [chartsOfAccounts, setChartsOfAccounts] = useState([]);
  const [searchedJournal1, setSearchedJournals1] = useState(null);
  const [searchedJournal2, setSearchedJournals2] = useState(null);
  const [searchedJournal3, setSearchedJournals3] = useState(null);

  const location = useLocation()
  const specificAccount2 = location.state;
  const journal2 = journals.filter(f => parseInt(f.data.accountNumber) === parseInt(specificAccount2?.specificAccount2));

    //Calling getUsers function
    useEffect(() => {
      getUsers()
    }, [])

   // Gets users from database
   const getUsers = () => {
    const usersCollectionRef = collection(db, 'users')
    getDocs(usersCollectionRef).then(response => {
        const usrs = response.docs.map(doc => ({
            data: doc.data(), 
            id: doc.id,
        }))
        setUsers(usrs);
    }).catch (error => console.log(error.message))
  }

  const searchAccountName = (value) => {
    const accountNumber = chartsOfAccounts.find(f => f.data.accountName === value)

    if(!_.isNil(value)){
      if(accountNumber.data.accountName === value){
      setSearch(journals.filter(e => _.isEqual(parseInt(e?.data.accountNumber), parseInt(accountNumber.data.accountNumber))))
      setIsAccountSearch(true)  
      } else {
        message.error("Account Does Not Exist Please Try Again");
      }
    }
  }

  const searchAccountNumber = (value) => {
    if(!_.isNil(value)){
      if(journals.some(e => _.isEqual(parseInt(e?.data.accountNumber), parseInt(value)))){
        setSearch(journals.filter(e => _.isEqual(parseInt(e?.data.accountNumber), parseInt(value))))
        setIsAccountSearch(true)
      } else {
        message.error("Account Does Not Exist Please Try Again");
      }
    }
  }

  const formatCurrencyChange = (amount) => {
    return currencyFormatter.format(amount, currencyFormatDecimal)
  }

    useEffect(() => {
        getJournals()
        getChartsOfAccounts()
    }, [])

    const getJournals = () => {
        // Specifies database collection you are using
        const usersCollectionRef = collection(db, 'journals')

        // Gets all the documents from that collection
        getDocs(usersCollectionRef).then(response => {
            // maps documents to an array
            const charts = response.docs.map(doc => ({
                data: doc.data(), 
                id: doc.id,
            }))
            //Adds that array to state
            setJournals(charts);
        }).catch(error => console.log(error.message))
      }

      const getChartsOfAccounts = () => {
        // Specifies database collection you are using
        const usersCollectionRef = collection(db, 'chartsOfAccounts')

        // Gets all the documents from that collection
        getDocs(usersCollectionRef).then(response => {
            // maps documents to an array
            const charts = response.docs.map(doc => ({
                data: doc.data(), 
                id: doc.id,
            }))
            //Adds that array to state
            setChartsOfAccounts(charts);
        }).catch(error => console.log(error.message))
      }

      const columns = [
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Account Number </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountNumber',
          render: item => {
            return (
                <>
                    {item?.data.accountNumber}
                </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the Account Name">
                  <Typography.Text strong> Journal Name </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountName',
          render: item => {
            return (
              <>
                {item?.data.accountName}
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Journal Description </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountDescription',
          render: item => {
            return (
                <>
                    <>
                        {item?.data.accountDescription}
                    </>
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Debit </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'debit',
          render: item => {
            return (
                <>
                    <>
                        {formatCurrencyChange(item?.data.debit)}
                    </>
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Credit </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'credit',
          render: item => {
            return (
                <>
                    <>
                        {formatCurrencyChange(item?.data.credit)}
                    </>
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Account Added </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountAdded',
          render: item => {
            return (
                <>
                    <>
                        {moment(item?.data.dateAccountAdded.toDate()).format('M/D/YYYY h:mma')}
                    </>
              </>
            )
          }
        },
      ];

      const columns2 = [
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Account Number </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountNumber',
          render: item => {
            return (
                <>
                    {item?.data.accountNumber}
                </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the Account Name">
                  <Typography.Text strong> Journal Name </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountName',
          render: item => {
            return (
              <>
                {item?.data.accountName}
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Journal Description </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountDescription',
          render: item => {
            return (
                <>
                    <>
                        {item?.data.accountDescription}
                    </>
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Debit </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'debit',
          render: item => {
            return (
                <>
                    <>
                        {formatCurrencyChange(item?.data.debit)}
                    </>
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Credit </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'credit',
          render: item => {
            return (
                <>
                    <>
                        {formatCurrencyChange(item?.data.credit)}
                    </>
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Account Added </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountAdded',
          render: item => {
            return (
                <>
                    <>
                        {moment(item?.data.dateAccountAdded.toDate()).format('M/D/YYYY h:mma')}
                    </>
              </>
            )
          }
        },
          {
            title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Comment </Typography.Text>
                </Tooltip>
              </>
            )
          },
            key: 'comment',
            render: item => {
              return (
                  <>
  
                      <>
                          {item?.data.comments}
                      </>
                </>
              )
            }
          },
      ];

      let locale3 = {
        emptyText: 'No Current Journals',
      };

      const JournalsTable = (data, tablename) => (
        <Table style={{width: "2000px"}} locale={locale3} columns={tablename} dataSource={data} />
      );

      const searchtheDate1 = (date) => {
        if(_.isNil(date)){
          setSearchedJournals1(null);
        }
        else{
          setSearchedJournals1(journals.filter(f => moment(f?.data.dateAccountAdded.toDate()).format('MM/DD/YYYY') === moment(date).format('MM/DD/YYYY')));
        }
      }
      const searchtheDate2 = (date) => {
        if(_.isNil(date)){
          setSearchedJournals2(null);
        }
        else{
          setSearchedJournals2(journals.filter(f => moment(f?.data.dateAccountAdded.toDate()).format('MM/DD/YYYY') === moment(date).format('MM/DD/YYYY')));
        }
      }
      const searchtheDate3 = (date) => {
        if(_.isNil(date)){
          setSearchedJournals3(null);
        }
        else{
          setSearchedJournals3(journals.filter(f => moment(f?.data.dateAccountAdded.toDate()).format('MM/DD/YYYY') === moment(date).format('MM/DD/YYYY')));
        }
      }

      const helpModalSetter = () => {
        getJournals()
        setHelpModal(false)
      }


    return(
        <div className="journals-container">
            <Row style={{width: "1850px", marginLeft: "-360px", marginTop: "-60px", marginBottom: "-30px"}}>
              { users?.some((e) => _.isEqual(e.data.email, currentUser?.email) && _.isEqual(e.data.role, "Administrator")) &&
              <Col span={22} style={{paddingLeft: "10px"}}>
                <Button onClick={() => setAccountModal(true)}> Add an Journal </Button>
              </Col>
              }
              <Col style={{paddingLeft: "76px"}}>
                <Button onClick={() => setHelpModal(true)}> Help </Button>
              </Col>
            </Row>
            <HelpModal isHelpModalVisible={helpModal} onModalChange={() => helpModalSetter()}/>
            <AddAnAccount isAddAnAccountVisible={accountModal} onModalChange={() => setAccountModal(false)} chartsOfAccountsInfo={chartsOfAccounts} />
            <Modal type="primary" style={{marginRight: "1550px"}} title="Calendar" width={350} visible={calendar} footer={[ <Button key="back" onClick={() => setCalendar(!calendar)}>Ok</Button>]} onCancel={() => setCalendar(!calendar)}>
              <Calendar fullscreen={false} className="site-calendar-demo-card" />
            </Modal>
            <Row style={{justifyContent: "center", width: "1850px", marginLeft: "-360px"}}>
                <Collapse defaultActiveKey={['1', '4']} style={{width: "1850px", marginTop: "50px", marginBottom: "50px"}} >
                    {journal2.length > 0 && 
                            <Collapse.Panel header="Journal from Ledger"  key="1">
                                {JournalsTable(journal2, columns2)}
                            </Collapse.Panel>
                    }
                    <Collapse.Panel header="Find an Journal" key="2">
                    <Row style={{marginBottom: "10px"}}>
                      <Col span={3}>
                        <Typography.Text strong> Search By Account Name </Typography.Text>
                      </Col>
                      <Col span={16}>
                        <Typography.Text strong> Search By Account Number </Typography.Text>
                      </Col>
                    </Row>
                    <Row style={{marginBottom: "20px"}}>
                      <Col span={3}>
                        <Input.Search
                          placeholder="Search By Account Name"
                          style={{
                            width: 200,
                          }}
                          onSearch={(e) => searchAccountName(e)}
                        />
                      </Col>
                      <Col span={16}>
                        <Input.Search
                          placeholder="Search By Account Number"
                          style={{
                            width: 200,
                          }}
                          onSearch={(e) => searchAccountNumber(e)}
                        />
                      </Col>
                    </Row> 
                    {isAccountSearch === true && 
                    <Table style={{width: "2000px"}} locale={locale3} columns={columns2} dataSource={search} />}
                    </Collapse.Panel>
                    <Collapse.Panel header="Approved Journals" key="3">
                        <Col span={4} style={{paddingBottom: "10px"}}>
                            <DatePicker
                              format={"MM/DD/YYYY"}
                              onChange={(e) => {
                                searchtheDate1(e)
                              }}
                              allowClear={true}
                            />
                        </Col>
                        { chartsOfAccounts.map(g => (
                          <>
                            <Typography.Text strong>{g.data.accountName}</Typography.Text>
                          {JournalsTable(!_.isNil(searchedJournal1) ? searchedJournal1.filter(f => f.data.status === "approved" && parseInt(g.data.accountNumber) === parseInt(f.data.accountNumber)) : journals.filter(f => f.data.status === "approved" && parseInt(g.data.accountNumber) === parseInt(f.data.accountNumber)), columns2)}
                          </>
                        ))}
                    </Collapse.Panel>
                    <Collapse.Panel header="Pending Journals" key="4">
                        <Col span={4} style={{paddingBottom: "10px"}}>
                            <DatePicker
                              format={"MM/DD/YYYY"}
                              onChange={(e) => {
                                searchtheDate2(e)
                              }}
                              allowClear={true}
                            />
                        </Col>
                        {chartsOfAccounts.map(g => (
                          <>
                            <Typography.Text strong>{g.data.accountName}</Typography.Text>
                            {JournalsTable(!_.isNil(searchedJournal2) ? searchedJournal2.filter(f => f.data.status === "pending" && parseInt(g.data.accountNumber) === parseInt(parseInt(f.data.accountNumber))) : journals.filter(f => f.data.status === "pending" && parseInt(g.data.accountNumber) === parseInt(f.data.accountNumber)), columns)}
                          </>
                        ))}
                    </Collapse.Panel>
                    <Collapse.Panel header="Rejected Journals" key="5">
                        <Col span={4} style={{paddingBottom: "10px"}}>
                            <DatePicker
                              format={"MM/DD/YYYY"}
                              onChange={(e) => {
                                searchtheDate3(e)
                              }}
                              allowClear={true}
                            />
                        </Col>
                        {chartsOfAccounts.map(g => (
                          <>
                            <Typography.Text strong>{g.data.accountName}</Typography.Text>
                            {JournalsTable(!_.isNil(searchedJournal3) ? searchedJournal3.filter(f => f.data.status === "rejected" && parseInt(g.data.accountNumber) === parseInt(f.data.accountNumber)) : journals.filter(f => f.data.status === "rejected" && parseInt(g.data.accountNumber) === parseInt(f.data.accountNumber)), columns2)}
                          </>
                        ))}
                    </Collapse.Panel>
                </Collapse>
            </Row>
        </div>
    );
}

export default Journals;