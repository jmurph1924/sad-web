import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase-config"
import { ApiOutlined, CoffeeOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Typography, Table, Button, Select, Input, Row, Collapse } from "antd"
import "./ChartsOfAccounts.css";


const ChartsAccountpage = () => {
    const [chartsOfAccounts, setChartsOfAccounts] = useState([]);
    const [accountCategory, setAccountCategory] = useState("")
    const [ balance, setBalance ] = useState(null);

    const isChartEditable = true;

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
          title: 'Account Number',
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
          title: 'Account Name',
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
          title: 'Account Description',
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
          title: 'Normal Side',
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
          title: 'Account Category',
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
          title: 'Account Subcategory',
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
          title: 'Initial Balance',
          key: 'initialBalance',
          render: item => {
            return (
                <>
                    {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                    <>
                        {item?.data.initialBalance}
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
                    {_.isEqual(isChartEditable, item?.id) === true ? <Input /> :
                    <>
                        {item?.data.balance}
                    </>
                    }
              </>
            )
          }
        },
        {
          title: 'Account Added',
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
          title: 'User',
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
            title: 'Order',
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
            title: 'Statement',
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
            title: 'Comment',
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
            title: 'Edit',
            key: 'edit',
            render: item => {
              return (
                <>
                  {_.isEqual(isChartEditable, item?.id) === true ? 
                    <Button style={{marginLeft: "10px"}} icon={<SaveOutlined />}/>
                    :
                    <Button style={{marginLeft: "10px"}} icon={<EditOutlined />}/>
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
            <Row style={{justifyContent: "center"}}>
                <Collapse defaultActiveKey={['1']} style={{width: "2400px", marginTop: "50px"}} >
                    <Collapse.Panel header="Charts of Accounts" key="1">
                        <ChartsOfAccountsTable />
                    </Collapse.Panel>
                </Collapse>
            </Row>
        </div>
    );
}

export default ChartsAccountpage;