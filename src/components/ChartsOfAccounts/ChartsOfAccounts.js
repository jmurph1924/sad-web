import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import * as currencyFormatter from "currency-formatter";
import moment from 'moment';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { ApiOutlined, CoffeeOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Typography, Table, Button, Input, Row, Collapse, Tooltip, Calendar, Modal, Col } from "antd";
import "./ChartsOfAccounts.css";

const currencyFormatDecimal = { code: "USD", decimalDigits: 2, precision: 2};

const ChartsAccountpage = () => {
  const [chartsOfAccounts, setChartsOfAccounts] = useState([]);
  const [accountDescription, setAccountDescription] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState(null);
  const [accountSubcategory, setAccountSubCategory] = useState("");
  const [balance, setBalance] = useState(null);
  const [comments, setComments] = useState("");
  const [credit, setCredit] = useState(null);
  const [dateAccountAdded, setDateAccountAdded] = useState("");
  const [debit, setDebit] = useState(null);
  const [initialBalance, setInitialBalance] = useState(null);
  const [normalSide, setNormalSide] = useState("");
  const [order, setOrder] = useState(null);
  const [statement, setStatement] = useState("");
  const [userId, setUserId] = useState("");
  const [ calendar, setCalendar ] = useState(false);
  const [ inventorySeach, setInventorySeach ] = useState([]);
  const isChartEditable = true;
  
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
                        {item?.data.accountName}
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
          {
            title: () => {
            return (
              <>
                <Tooltip title="This is the account numbers">
                  <Typography.Text strong> Edit </Typography.Text>
                </Tooltip>
              </>
            )
          },
            key: 'edit',
            render: item => {
              return (
                <>
                  {_.isEqual(isChartEditable, item?.id) === true ? 
                    <Tooltip title="Save Changes">
                      <Button style={{marginLeft: "10px"}} icon={<SaveOutlined />}/>
                    </Tooltip>
                    :
                    <Tooltip title="Edit Account">
                      <Button style={{marginLeft: "10px"}} icon={<EditOutlined />}/>
                    </Tooltip>
                  }
                </>
              )
            }
          }
      ];

      let locale3 = {
        emptyText: 'No Current Accounts',
      };

      const ChartsOfAccountsTable = (data) => (
        <Table style={{width: "2000px"}} locale={locale3} columns={columns} dataSource={data} />
      );

    const columns = [
        {
          title: 'Account Name',
          key: 'Account Name',
          render: item => {
            return (
                <>
         
                </>
            )
          }
        },
        {
          title: 'Account Number',
          key: 'Account Number',
          render: item => {
            return (
                <>
      
                </>
            )
          }
        },
        {
          title: 'Account Description',
          key: 'Account Description',
          render: item => {
            return (
            <>
              
            </>
            )
          }
        },
        {
          title: 'Normal Side',
          key: 'Normal Side',
          render: item => {
            return (
            <>
              
            </>
            )
          }
        },
        {
          title: 'Account Category',
          key: 'Account Category',
          render: item => {
            return (
              <>
                
              </>
            )
          }
        },
        {
          title: 'Account Subcategory',
          key: 'Account Subcategory',
          render: item => {
            return (
              <>
             
              </>
            )
          }
        },
        {
            title: 'Initial Balance',
            key: 'Initial Balance',
            render: item => {
              return (
                <>
               
                </>
              )
            }
        },
        {
            title: 'Debit',
            key: 'Debit',
            render: item => {
              return (
                <>
               
                </>
              )
            }
        },
        {
            title: 'Credit',
            key: 'Credit',
            render: item => {
              return (
                <>
               
                </>
              )
            }
        },
        {
            title: 'Balance',
            key: 'Balance',
            render: item => {
              return (
                <>
               
                </>
              )
            }
        },
        {
            title: 'Date/Time Account Added',
            key: 'Date/Time Account Added',
            render: item => {
              return (
                <>
               
                </>
              )
            }
        },
        {
            title: 'User id',
            key: 'User id',
            render: item => {
              return (
                <>
               
                </>
              )
            }
        },
        {
            title: 'Order',
            key: 'Order',
            render: item => {
              return (
                <>
               
                </>
              )
            }
        },
        {
            title: 'Statement',
            key: 'Statement',
            render: item => {
              return (
                <>
               
                </>
              )
            }
        },
        {
            title: 'Comment',
            key: 'Comment',
            render: item => {
              return (
                <>
               
                </>
              )
            }
        }
    ]
    return(
        <div className="ChartsOfAccounts-container">
            <Row style={{width: "2000px", marginLeft: "-360px", marginTop: "-60px", marginBottom: "-30px"}}>
              <Col>
                <Button onClick={() => setCalendar(!calendar)}> Calendar </Button>
              </Col>
              <Col span={22} style={{paddingLeft: "10px"}}>
                <Button> Add an Account </Button>
              </Col>
              <Col style={{paddingLeft: "16px"}}>
                <Button> Help </Button>
              </Col>
            </Row>
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
                      <Col span={3}>
                        <Typography.Text strong> Search By Account Number </Typography.Text>
                      </Col>
                      <Col span={3}>
                        <Typography.Text strong> Search By Account Category </Typography.Text>
                      </Col>
                      <Col span={3}>
                        <Typography.Text strong> Search By Account Subcategory </Typography.Text>
                      </Col>
                    </Row>
                    <Row style={{marginBottom: "20px"}}>
                      <Col span={3}>
                        <Input.Search
                          placeholder="Search By Account Name"
                          style={{
                            width: 200,
                          }}
                        />
                      </Col>
                      <Col span={3}>
                        <Input.Search
                          placeholder="Search By Account Number"
                          style={{
                            width: 200,
                          }}
                        />
                      </Col>
                      <Col span={3}>
                        <Input.Search
                          placeholder="Search By Account Category"
                          style={{
                            width: 200,
                          }}
                        />
                      </Col>
                      <Col span={3}>
                        <Input.Search
                          placeholder="Search By Account Subcategory"
                          style={{
                            width: 200,
                          }}
                        />
                      </Col>
                    </Row> 
                    <Row>
                      {ChartsOfAccountsTable(inventorySeach)}
                    </Row>
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