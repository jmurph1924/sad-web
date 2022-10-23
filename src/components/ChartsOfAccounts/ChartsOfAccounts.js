import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import * as currencyFormatter from "currency-formatter";
import moment from 'moment';
import { useNavigate, Link } from 'react-router-dom'
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Typography, Table, Button, Input, Row, Collapse, Tooltip, Calendar, Modal, Col } from "antd";
import "./ChartsOfAccounts.css";

import HelpModal from "../HelpModal/HelpModal";
import AddAnAccount from "./AddAnAccount";

const currencyFormatDecimal = { code: "USD", decimalDigits: 2, precision: 2};

const ChartsAccountpage = () => {
  const navigate = useNavigate();
  const [ isEditVisible, setIsEditVisible ] = useState(false);
  const [chartsOfAccounts, setChartsOfAccounts] = useState([]);
  const [ calendar, setCalendar ] = useState(false);
  const [ inventorySeach, setInventorySeach ] = useState([]);
  const [ helpModal, setHelpModal ] = useState(false);
  const [ accountModal, setAccountModal ] = useState(false);
  const [ search, setSearch ] = useState(null);
  const [ isAccountSearch, setIsAccountSearch ] = useState(false);
  const isChartEditable = true;

  const searchAccountName = (value) => {
    setSearch(chartsOfAccounts.find(e => _.isEqual(e.data.accountName, value)))
    setIsAccountSearch(true)
  }
  const searchAccountNumber = (value) => {
    setSearch(chartsOfAccounts.find(e => _.isEqual(e.data.accountNumber, parseInt(value))))
    setIsAccountSearch(true)
  }

  const inventorySeachFiltered = (type, value) => {
    if(_.isEqual(type, "Account Name")){

    } else if(_.isEqual(type, "Account Number")){

    } else if(_.isEqual(type, "Account Category")){

    } else if(_.isEqual(type, "Account SubCategory")){
      
    }else {
      setInventorySeach([]);
    }
  }

  const formatCurrencyChange = (amount) => {
    return currencyFormatter.format(amount, currencyFormatDecimal)
  }

    useEffect(() => {
        getChartsOfAccounts()
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
                    {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                    <>
                      <Link to="/ledgers">
                        {item?.data.accountName}
                      </Link>
                    </>
                    }
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
                    {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                    <>
                        {item?.data.accountDescription}
                    </>
                    }
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
                    {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                    <>
                        {item?.data.normalSide}
                    </>
                    }
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
                    {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                    <>
                        {item?.data.accountCategory}
                    </>
                    }
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
                    {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                    <>
                        {item?.data.accountSubCategory}
                    </>
                    }
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
                    {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                    <>
                        {formatCurrencyChange(item?.data.initialBalance)}
                    </>
                    }
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
                    {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                    <>
                        {formatCurrencyChange(item?.data.debit)}
                    </>
                    }
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
                    {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                    <>
                        {formatCurrencyChange(item?.data.credit)}
                    </>
                    }
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
                    {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                    <>
                        {formatCurrencyChange(item?.data.balance)}
                    </>
                    }
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
                    {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                    <>
                        {moment(item?.data.dateAccountAdded.toDate()).format('M/D/YYYY h:mma')}
                    </>
                    }
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
                    {_.isEqual(isChartEditable, item?.userId) === true ? <Input /> :
                    <>
                        {item?.data.userId}
                    </>
                    }
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
                      {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                      <>
                          {item?.data.order}
                      </>
                      }
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
                      {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                      <>
                          {item?.data.statement}
                      </>
                      }
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
                      {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                      <>
                          {item?.data.comments}
                      </>
                      }
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
                <Input style={{width: "95%"}}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}}/>
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
                <Input style={{width: "95%"}}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}}/>
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
                <Input style={{width: "95%"}}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}}/>
              </Col>
              <Col span={4} style={{marginBottom: "10px"}}>
                <Input style={{width: "95%"}}/>
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
            <Row style={{width: "2000px", marginLeft: "-360px", marginTop: "-60px", marginBottom: "-30px"}}>
              <Col>
                <Button onClick={() => setCalendar(!calendar)}> Calendar </Button>
              </Col>
              <Col span={22} style={{paddingLeft: "10px"}}>
                <Button onClick={() => setAccountModal(true)}> Add an Account </Button>
              </Col>
              <Col style={{paddingLeft: "16px"}}>
                <Button onClick={() => setHelpModal(true)}> Help </Button>
              </Col>
            </Row>
            <HelpModal isHelpModalVisible={helpModal} onModalChange={() => helpModalSetter()}/>
            <AddAnAccount isAddAnAccountVisible={accountModal} onModalChange={() => setAccountModal(false)} chartsOfAccountsInfo={chartsOfAccounts} />
            <Modal type="primary" style={{marginRight: "1760px"}} title="Calendar" width={350} visible={calendar} footer={[ <Button key="back" onClick={() => setCalendar(!calendar)}>Ok</Button>]} onCancel={() => setCalendar(!calendar)}>
              <Calendar fullscreen={false} className="site-calendar-demo-card" />
            </Modal>
            <Row style={{justifyContent: "center", width: "2000px", marginLeft: "-360px"}}>
                <Collapse defaultActiveKey={['1']} style={{width: "2000px", marginTop: "50px"}} >
                    <Collapse.Panel header="Find an Account" key="1">
                    <Row style={{marginBottom: "10px"}}>
                      <Col span={3}>
                        <Typography.Text strong> Search By Account Name </Typography.Text>
                      </Col>
                      <Col span={18}>
                        <Typography.Text strong> Search By Account Number </Typography.Text>
                      </Col>
                      <Col style={{paddingLeft: "16px"}}>
                        <Typography.Text strong> Edit Account </Typography.Text>
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
                          onPressEnter={(e) => searchAccountName(e)}
                        />
                      </Col>
                      <Col span={18}>
                        <Input.Search
                          placeholder="Search By Account Number"
                          style={{
                            width: 200,
                          }}
                          onSearch={(e) => searchAccountNumber(e)}
                          onPressEnter={(e) => searchAccountNumber(e)}
                        />
                      </Col>
                      <Col style={{paddingLeft: "16px"}}>
                        <Button style={{width: "120px"}} onClick={() => setHelpModal(true)}> Edit </Button>
                      </Col>
                    </Row> 
                    {isAccountSearch === true && individualAccountView()}
                    </Collapse.Panel>
                    <Collapse.Panel header="Charts of Accounts" key="2">
                        {ChartsOfAccountsTable(chartsOfAccounts)}
                    </Collapse.Panel>
                    <Collapse.Panel header="Event Log" key="3">
                    </Collapse.Panel>
                </Collapse>
            </Row>
        </div>
    );
}

export default ChartsAccountpage;