import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import * as currencyFormatter from "currency-formatter";
import moment from 'moment';
import { useNavigate, Link } from 'react-router-dom'
import { collection, getDocs, doc, updateDoc, Timestamp, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Typography, Table, Button, Input, Row, Collapse, Calendar, Modal, Col, message, Tooltip, Form, Select } from "antd";
import "./ChartsOfAccounts.css";
import { useAuth } from '../../contexts/AuthContext'

import HelpModal from "../HelpModal/HelpModal";
import AddAnAccount from "./AddAnAccount";

//Variable Creation
const currencyFormatDecimal = { code: "USD", decimalDigits: 2, precision: 2};

const ChartsAccountpage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth()
  const [ isEditVisible, setIsEditVisible ] = useState(false);
  const [chartsOfAccounts, setChartsOfAccounts] = useState([]);
  const [ calendar, setCalendar ] = useState(false);
  const [ changeLog, setChangeLog ] = useState([]);
  const [ helpModal, setHelpModal ] = useState(false);
  const [ accountModal, setAccountModal ] = useState(false);
  const [ search, setSearch ] = useState(null);
  const [ isAccountSearch, setIsAccountSearch ] = useState(false);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [accountDescription, setAccountDescription] = useState("");
  const [accountCategory, setAccountCategory ] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState(null);
  const [accountSubCategory, setAccountSubCategory] = useState("");
  const [balance, setBalance] = useState(null);
  const [comments, setComments] = useState("");
  const [credit, setCredit] = useState(null);
  const dateAccountAdded = Timestamp.fromDate(new Date());
  const [debit, setDebit] = useState(null);
  const [initialBalance, setInitialBalance] = useState(null);
  const [normalSide, setNormalSide] = useState("");
  const [order, setOrder] = useState(null);
  const [statement, setStatement] = useState("");
  const [ userEmail, setUserEmail ] = useState("");
  const [ userSubject, setUserSubject ] = useState("");
  const [ userContent, setUserContent ] = useState("");
  const userId = currentUser?.email
  const active = true;

  //Setting Updated User information
  const handleUpdatedChartsofAccounts = (search) => {

    setAccountNumber(search?.data.accountNumber);
    setCredit(parseFloat(credit));
    setDebit(parseFloat(debit));
    setBalance(parseFloat(balance));
    setInitialBalance(parseFloat(initialBalance));
    setOrder(parseInt(order));

    const usersCollectionRef = collection(db, 'changeLog')
    addDoc(usersCollectionRef, { active, accountDescription, accountName, accountNumber: parseInt(accountNumber), accountCategory, accountSubCategory, balance, comments, credit, dateAccountAdded, debit, initialBalance, normalSide, order, statement, userId }).then(response => {
        try {
    setError("")
    setLoading(true)
    } catch(e) {
        setError("Failed to create an account")
    }
    setLoading(false)
    }).catch(error => {
      console.log(error.message)
    })

    setTimeout(() => {
    const docRef = doc(db, 'chartsOfAccounts', search.id)
    updateDoc(docRef, { active, accountDescription, accountName, accountCategory, accountSubCategory, balance, comments, credit, debit, initialBalance, normalSide, order, statement }).then(() => {
      message.info("Successfully Updated Account")
      getUsers()
    }).catch(error => console.log(error.message))
    getChartsOfAccounts();
    getChangeLogs();
    setIsEditVisible(false);
    setIsAccountSearch(false);
    setSearch([]);
    }, 1000);
  }

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
    if(!_.isNil(value)){
      if(chartsOfAccounts.some(e => _.isEqual(e?.data.accountName, value))){
      setSearch(chartsOfAccounts.find(e => _.isEqual(e?.data.accountName, value)))
      setIsAccountSearch(true)  
      } else {
        message.error("Account Does Not Exist Please Try Again");
      }
    }
  }
   //Opens Prefilled Email
   const onSubmit = () => {
    window.open(`mailto:${userEmail}?subject=${userSubject}&body=${userContent}`)

    form.resetFields();
  };
  const searchAccountNumber = (value) => {
    if(!_.isNil(value)){
      if(chartsOfAccounts.some(e => _.isEqual(e?.data.accountNumber, value))){
        setSearch(chartsOfAccounts.find(e => _.isEqual(e?.data.accountNumber, parseInt(value))))
        setIsAccountSearch(true)
      } else {
        message.error("Account Does Not Exist Please Try Again");
      }
    }
  }

  const canDeactivate = () => {
    if(search?.data.balance > 0 || search?.data.balance < 0){
      message.error("Balance must be 0 to deactivate")
    } else{
      handleDisable(search.id)
    }
  }

  //Disabling User's Handle
  const handleDisable = (id) => {
    const docRef = doc(db, 'chartsOfAccounts', id)
    updateDoc(docRef, {active: false}).then(response => {
      getChartsOfAccounts()
    }).catch(error => console.log(error.message))

    setAccountNumber(search?.data.accountNumber);
    setCredit(parseFloat(credit));
    setDebit(parseFloat(debit));
    setBalance(parseFloat(balance));
    setInitialBalance(parseFloat(initialBalance));
    setOrder(parseInt(order));

    setTimeout(() => {
    const usersCollectionRef = collection(db, 'changeLog')
    addDoc(usersCollectionRef, { active, accountDescription: "Disabled", accountName, accountNumber, accountCategory, accountSubCategory, balance, comments, credit, dateAccountAdded, debit, initialBalance, normalSide, order, statement, userId }).then(response => {
        try {
    setError("")
    setLoading(true)
    } catch(e) {
        setError("Failed to create an account")
    }
    setLoading(false)
    }).catch(error => {
      console.log(error.message)
    })
  }, 1000);
  }
  //Activating User's 
  const handleActivate = (id) => {
    const docRef = doc(db, 'chartsOfAccounts', id)
    updateDoc(docRef, {active: true}).then(response => {
      getChartsOfAccounts()
    }).catch(error => console.log(error.message))

    setAccountNumber(search?.data.accountNumber);
    setCredit(parseFloat(credit));
    setDebit(parseFloat(debit));
    setBalance(parseFloat(balance));
    setInitialBalance(parseFloat(initialBalance));

    setOrder(parseInt(order));
    setTimeout(() => {
      const usersCollectionRef = collection(db, 'changeLog')
      addDoc(usersCollectionRef, { active, accountDescription: "Enabled", accountName, accountNumber, accountCategory, accountSubCategory, balance, comments, credit, dateAccountAdded, debit, initialBalance, normalSide, order, statement, userId }).then(response => {
          try {
      setError("")
      setLoading(true)
      } catch(e) {
          setError("Failed to create an account")
      }
      setLoading(false)
      }).catch(error => {
        console.log(error.message)
      })
    }, 1000);

    
  }

  const formatCurrencyChange = (amount) => {
    return currencyFormatter.format(amount, currencyFormatDecimal)
  }

    useEffect(() => {
        getChartsOfAccounts()
        getChangeLogs()
    }, [])

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
      const getChangeLogs = () => {
        // Specifies database collection you are using
        const usersCollectionRef = collection(db, 'changeLog')

        // Gets all the documents from that collection
        getDocs(usersCollectionRef).then(response => {
            // maps documents to an array
            const charts = response.docs.map(doc => ({
                data: doc.data(), 
                id: doc.id,
            }))
            //Adds that array to state
            setChangeLog(charts);
        }).catch(error => console.log(error.message))
      }
      const columns3 = [
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
                  <Typography.Text strong> Account Name </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountName',
          render: item => {
            return (
                <>
                    <>
                        {item?.data.accountName}
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
                  <Typography.Text strong> Account Description </Typography.Text>
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
                  <Typography.Text strong> Journal Added </Typography.Text>
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
      ]
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
                  <Typography.Text strong> Account Name </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountName',
          render: item => {
            return (
                <>
                    <Typography.Text style={_.isEqual(chartsOfAccounts.find(f => _.isEqual(f.data.accountNumber, item.data.accountNumber)).data.accountName, item.data.accountName) === true ? {color: "black"} : {color: "red"}}>
                        {item?.data.accountName}
                    </Typography.Text>
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Account Description </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountDescription',
          render: item => {
            return (
                <>
                    <Typography.Text style={_.isEqual(chartsOfAccounts.find(f => _.isEqual(f.data.accountNumber, item.data.accountNumber)).data.accountDescription, item.data.accountDescription) === true ? {color: "black"} : {color: "red"}}>
                        {item?.data.accountDescription}
                    </Typography.Text>
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Normal Side </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'normalSide',
          render: item => {
            return (
                <>
                    <Typography.Text style={_.isEqual(chartsOfAccounts.find(f => _.isEqual(f.data.accountNumber, item.data.accountNumber)).data.normalSide, item.data.normalSide) === true ? {color: "black"} : {color: "red"}}>
                        {item?.data.normalSide}
                    </Typography.Text>
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Account Category </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountCategory',
          render: item => {
            return (
                <>
                    <Typography.Text style={_.isEqual(chartsOfAccounts.find(f => _.isEqual(f.data.accountNumber, item.data.accountNumber)).data.accountCategory, item.data.accountCategory) === true ? {color: "black"} : {color: "red"}}>
                        {item?.data.accountCategory}
                    </Typography.Text>
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Account Subcategory </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountSubCategory',
          render: item => {
            return (
                <>
                    <Typography.Text style={_.isEqual(chartsOfAccounts.find(f => _.isEqual(f.data.accountNumber, item.data.accountNumber)).data.accountSubCategory, item.data.accountSubCategory) === true ? {color: "black"} : {color: "red"}}>
                        {item?.data.accountSubCategory}
                    </Typography.Text>
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Initial Balance </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'initialBalance',
          render: item => {
            return (
                <>
                    <Typography.Text style={_.isEqual(chartsOfAccounts.find(f => _.isEqual(f.data.accountNumber, item.data.accountNumber)).data.initialBalance, item.data.initialBalance) === true ? {color: "black"} : {color: "red"}}>
                        {formatCurrencyChange(item?.data.initialBalance)}
                    </Typography.Text>
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
                    <Typography.Text style={_.isEqual(chartsOfAccounts.find(f => _.isEqual(f.data.accountNumber, item.data.accountNumber)).data.debit, item.data.debit) === true ? {color: "black"} : {color: "red"}}>
                        {formatCurrencyChange(item?.data.debit)}
                    </Typography.Text>
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
                    <Typography.Text style={_.isEqual(chartsOfAccounts.find(f => _.isEqual(f.data.accountNumber, item.data.accountNumber)).data.credit, item.data.credit) === true ? {color: "black"} : {color: "red"}}>
                        {formatCurrencyChange(item?.data.credit)}
                    </Typography.Text>
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Balance </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'balance',
          render: item => {
            return (
                <>
                    <Typography.Text style={_.isEqual(chartsOfAccounts.find(f => _.isEqual(f.data.accountNumber, item.data.accountNumber)).data.balance, item.data.balance) === true ? {color: "black"} : {color: "red"}}>
                        {formatCurrencyChange(item?.data.balance)}
                    </Typography.Text>
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Account Updated Date </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountAdded',
          render: item => {
            return (
                <>
                    <Typography.Text >
                        {moment(item?.data.dateAccountAdded.toDate()).format('M/D/YYYY h:mma')}
                    </Typography.Text>
              </>
            )
          }
        },
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Update By User </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'user',
          render: item => {
            return (
                <>
                    <Typography.Text>
                        {item?.data.userId}
                    </Typography.Text>
              </>
            )
          }
        },
        {
            title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Order </Typography.Text>
                </Tooltip>
              </>
            )
          },
            key: 'order',
            render: item => {
              return (
                  <>

                      <Typography.Text style={_.isEqual(chartsOfAccounts.find(f => _.isEqual(f.data.accountNumber, item.data.accountNumber)).data.order, item.data.order) === true ? {color: "black"} : {color: "red"}}>
                          {item?.data.order}
                      </Typography.Text>
                </>
              )
            }
          },
          {
            title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Statement </Typography.Text>
                </Tooltip>
              </>
            )
          },
            key: 'statement',
            render: item => {
              return (
                  <>
                      <Typography.Text style={_.isEqual(chartsOfAccounts.find(f => _.isEqual(f.data.accountNumber, item.data.accountNumber)).data.statement, item.data.statement) === true ? {color: "black"} : {color: "red"}}>
                          {item?.data.statement}
                      </Typography.Text>
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
                      <Typography.Text style={_.isEqual(chartsOfAccounts.find(f => _.isEqual(f.data.accountNumber, item.data.accountNumber)).data.comments, item.data.comments) === true ? {color: "black"} : {color: "red"}}>
                          {item?.data.comments}
                      </Typography.Text>
                </>
              )
            }
          },
      ];

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
                  <Typography.Text strong> Account Name </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountName',
          render: item => {
            return (
                <>
                    <>
                      <Link to="/ledgers" state={{ specificAccount: item?.data.accountNumber }}>
                        {item?.data.accountName}
                      </Link>
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
                  <Typography.Text strong> Account Description </Typography.Text>
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
                  <Typography.Text strong> Normal Side </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'normalSide',
          render: item => {
            return (
                <>
                    <>
                        {item?.data.normalSide}
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
                  <Typography.Text strong> Account Category </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountCategory',
          render: item => {
            return (
                <>
                    <>
                        {item?.data.accountCategory}
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
                  <Typography.Text strong> Account Subcategory </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountSubCategory',
          render: item => {
            return (
                <>
                    <>
                        {item?.data.accountSubCategory}
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
                  <Typography.Text strong> Initial Balance </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'initialBalance',
          render: item => {
            return (
                <>
                    <>
                        {formatCurrencyChange(item?.data.initialBalance)}
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
                  <Typography.Text strong> Balance </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'balance',
          render: item => {
            return (
                <>
                    <>
                        {formatCurrencyChange(item?.data.balance)}
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
                  <Typography.Text strong> Journal Added </Typography.Text>
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
                  <Typography.Text strong> User </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'user',
          render: item => {
            return (
                <>
                    <>
                        {item?.data.userId}
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
                  <Typography.Text strong> Order </Typography.Text>
                </Tooltip>
              </>
            )
          },
            key: 'order',
            render: item => {
              return (
                  <>
  
                      <>
                          {item?.data.order}
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
                  <Typography.Text strong> Statement </Typography.Text>
                </Tooltip>
              </>
            )
          },
            key: 'statement',
            render: item => {
              return (
                  <>
  
                      <>
                          {item?.data.statement}
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
        emptyText: 'No Current Accounts',
      };

      const ChartsOfAccountsTable = (data) => (
        <Table style={{width: "2000px"}} locale={locale3} columns={columns} dataSource={data} />
      );

      const individualAccountView = () => {

        return (
          <>
            <Row gutter={[12,12]}>
              <Col span={4}>
                <Typography.Text strong>
                  Account Number
                </Typography.Text>
              </Col>
              <Col span={4}>
                <Typography.Text strong>
                  Account Name
                </Typography.Text>
              </Col>
              <Col span={4}>
                <Typography.Text strong>
                  Credit
                </Typography.Text>
              </Col>
              <Col span={4}>
                <Typography.Text strong>
                  Statement
                </Typography.Text>
              </Col>
              <Col span={4}>
                <Typography.Text strong>
                  User
                </Typography.Text>
              </Col>
            </Row>
            {isEditVisible === true ?
            <Row gutter={[12,12]}>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {search?.data.accountNumber}
                </Typography.Text>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
              <Input style={{width: "95%"}} onChange={(e) => setAccountName(e.target.value)}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}} onChange={(e) => setCredit(e.target.value)}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}} onChange={(e) => setStatement(e.target.value)}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {search?.data.userId}
                </Typography.Text>
              </Col>
            </Row>

            :

            <Row gutter={[12,12]}>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {search?.data.accountNumber}
                </Typography.Text>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Link to="/ledgers">
                  {search?.data.accountName}
                </Link>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {formatCurrencyChange(search?.data.credit)}
                </Typography.Text>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {search?.data.statement}
                </Typography.Text>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {search?.data.userId}
                </Typography.Text>
              </Col>
            </Row>
            }
            <Row gutter={[12,12]}>
              <Col span={4}>
                <Typography.Text strong>
                  Account Category
                </Typography.Text>
              </Col>
              <Col span={4}>
                <Typography.Text strong>
                  Account Description
                </Typography.Text>
              </Col>
              <Col span={4}>
                <Typography.Text strong>
                  Debit
                </Typography.Text>
              </Col>
              <Col span={4}>
                <Typography.Text strong>
                  Normal Side
                </Typography.Text>
              </Col>
              <Col span={4}>
                <Typography.Text strong>
                  Account Added
                </Typography.Text>
              </Col>
            </Row>
            {isEditVisible === true ?
            <Row gutter={[12,12]}>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}} onChange={(e) => setAccountCategory(e.target.value)}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}} onChange={(e) => setAccountDescription(e.target.value)}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}} onChange={(e) => setDebit(e.target.value)}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}} onChange={(e) => setNormalSide(e.target.value)}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {moment(search?.data.dateAccountAdded.toDate()).format('M/D/YYYY h:mma')}
                </Typography.Text>
              </Col>
            </Row>

            :

            <Row gutter={[12,12]}>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {search?.data.accountCategory}
                </Typography.Text>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {search?.data.accountDescription}
                </Typography.Text>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {formatCurrencyChange(search?.data.debit)}
                </Typography.Text>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {search?.data.normalSide}
                </Typography.Text>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {moment(search?.data.dateAccountAdded.toDate()).format('M/D/YYYY h:mma')}
                </Typography.Text>
              </Col>
            </Row>
            }
            <Row gutter={[12,12]}>
              <Col span={4}>
                <Typography.Text strong>
                  Account SubCategory
                </Typography.Text>
              </Col>
              <Col span={4}>
                <Typography.Text strong>
                  Order
                </Typography.Text>
              </Col>
              <Col span={4}>
                <Typography.Text strong>
                  Balance
                </Typography.Text>
              </Col>
              <Col span={4}>
                <Typography.Text strong>
                  Initial Balance 
                </Typography.Text>
              </Col>
              <Col span={4}>
                <Typography.Text strong>
                  Comment
                </Typography.Text>
              </Col>
            </Row >
            {isEditVisible === true ?
            <Row gutter={[12,12]}>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}} onChange={(e) => setAccountSubCategory(e.target.value)}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}} onChange={(e) => setOrder(e.target.value)}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}} onChange={(e) => setBalance(e.target.value)}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}} onChange={(e) => setInitialBalance(e.target.value)}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
              <Input style={{width: "95%"}} onChange={(e) => setComments(e.target.value)}/>
              </Col>
            </Row>

            :

            <Row gutter={[12,12]}>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {search?.data.accountSubCategory}
                </Typography.Text>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {search?.data.order}
                </Typography.Text>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {formatCurrencyChange(search?.data.balance)}
                </Typography.Text>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {formatCurrencyChange(search?.data.initialBalance)}
                </Typography.Text>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Typography.Text>
                  {search?.data.comments}
                </Typography.Text>
              </Col>
            </Row>
            }
          </>
        )
      }  

      const helpModalSetter = () => {
        getChartsOfAccounts()
        setHelpModal(false)
      }

    return(
        <div className="ChartsOfAccounts-container">
            <Row style={{width: "1850px", marginLeft: "-360px", marginTop: "-60px", marginBottom: "-30px"}}>
              <Col>
                <Button onClick={() => setCalendar(!calendar)}> Calendar </Button>
              </Col>
              { users?.some((e) => _.isEqual(e.data.email, currentUser?.email) && _.isEqual(e.data.role, "Administrator")) &&
              <Col span={21} style={{paddingLeft: "10px"}}>
                <Button onClick={() => setAccountModal(true)}> Add an Account </Button>
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
                <Collapse defaultActiveKey={['1']} style={{width: "1850px", marginTop: "50px", marginBottom: "50px"}} >
                    <Collapse.Panel header="Find an Account" key="1">
                    <Row style={{marginBottom: "10px"}}>
                      <Col span={3}>
                        <Typography.Text strong> Search By Account Name </Typography.Text>
                      </Col>
                      <Col span={16}>
                        <Typography.Text strong> Search By Account Number </Typography.Text>
                      </Col>
                      {isAccountSearch === true && users?.some((e) => _.isEqual(e.data.email, currentUser?.email) && _.isEqual(e.data.role, "Administrator")) &&
                        <>
                          <Col style={{paddingLeft: "16px"}}>
                            <Typography.Text strong> Edit Account </Typography.Text>
                          </Col>
                          {search.data.active === true ? 
                          <Col style={{paddingLeft: "50px"}}>
                            <Typography.Text strong> Deactivate Account </Typography.Text>
                          </Col>
                          : 
                          <Col style={{paddingLeft: "50px"}}>
                            <Typography.Text strong> Activate Account </Typography.Text>
                          </Col>
                          }
                        </>
                      }
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
                      {isAccountSearch === true && users?.some((e) => _.isEqual(e.data.email, currentUser?.email) && _.isEqual(e.data.role, "Administrator")) &&
                      <>
                        {isEditVisible === false ?
                          <Col style={{paddingLeft: "16px"}}>
                            <Button style={{width: "120px"}} onClick={() => setIsEditVisible(!isEditVisible)}> Edit </Button>
                          </Col>
                          :
                          <Col style={{paddingLeft: "16px"}}>
                            <Button style={{width: "120px"}} onClick={() => handleUpdatedChartsofAccounts(search)}> Save </Button>
                          </Col>
                        }
                        {search.data.active === true ? 
                        <Col style={{paddingLeft: "10px"}}>
                          <Button style={{width: "120px"}} onClick={() => canDeactivate()}> Deactivate </Button>
                        </Col>
                        :
                          <Col style={{paddingLeft: "10px"}}>
                            <Button style={{width: "120px"}} onClick={() => handleActivate(search.id)}> Activate </Button>
                          </Col>
                        }
                      </>
                      }
                    </Row> 
                    {isAccountSearch === true && individualAccountView()}
                    </Collapse.Panel>
                    <Collapse.Panel header="Charts of Accounts" key="2">
                        {ChartsOfAccountsTable(chartsOfAccounts.filter(f => f.data.active === true))}
                    </Collapse.Panel>
                    <Collapse.Panel header="Event Log" key="3">
                        <Table
                          key={chartsOfAccounts.id}
                          style={{width: "2000px"}}
                          columns={columns3}
                          expandable={{
                            expandedRowRender: (record) => (
                              <Table style={{width: "1800px"}} locale={locale3} columns={columns2} dataSource={changeLog.filter(f => _.isEqual(f.data.accountNumber, record?.data.accountNumber))} />
                            ),
                          }}
                          dataSource={chartsOfAccounts}
                        />
                    </Collapse.Panel>
                    <Collapse.Panel header="Email a User" key="4">
                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={() => onSubmit()}
                      >
                        <Form.Item name="userEmail" label="Email">
                          <Input placeholder="Email" style={{ opacity: ".9", width: "300px"}} onChange={(e) => setUserEmail(e.target.value)}/>
                          <Select style={{width: "300px", paddingTop: "20px", paddingLeft: "20px"}}>
                          {users.map(item => (
                            <Select.Option key={item.lastname}>
                              {item?.data.email}
                            </Select.Option>
                          ))}
                          </Select>
                        </Form.Item>
                        <Form.Item name="userSubject" label="Subject" >
                          <Input placeholder="Subject" style={{ opacity: ".9", width: "1000px"}} onChange={(e) => setUserSubject(e.target.value)}/>
                        </Form.Item>
                        <Form.Item name="userContent" label="Content">
                          <Input.TextArea rows={6} style={{ opacity: ".9", width: "1000px", marginBottom: "10px"}} onChange={(e) => setUserContent(e.target.value)}/>
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                      </Form>
                    </Collapse.Panel>
                </Collapse>
            </Row>
        </div>
    );
}

export default ChartsAccountpage;