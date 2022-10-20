import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import * as currencyFormatter from "currency-formatter";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { ApiOutlined, CoffeeOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Typography, Table, Button, Select, Input, Row, Collapse, Tooltip } from "antd";
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
    const isChartEditable = true;

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
                        {item?.data.accountAdded}
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
                    {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                    <>
                        {item?.data.userID}
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
        emptyText: 'No Current Charts of Accounts',
      };

      const ChartsOfAccountsTable = () => (
        <Table locale={locale3} columns={columns} dataSource={chartsOfAccounts} />
      );

    return(
        <div className="ChartsOfAccounts-container">
            <Row style={{justifyContent: "center", width: "2000px", marginLeft: "-360px"}}>
                <Collapse defaultActiveKey={['1']} style={{width: "2000px", marginTop: "50px"}} >
                    <Collapse.Panel header="Charts of Accounts" key="1">
                        <ChartsOfAccountsTable />
                    </Collapse.Panel>
                </Collapse>
            </Row>
        </div>
    );
}

export default ChartsAccountpage;