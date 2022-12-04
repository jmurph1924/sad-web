import React, { useState,useEffect  } from "react";
import * as _ from "lodash"
import moment from 'moment';
import * as currencyFormatter from "currency-formatter";
import { useAuth } from '../../contexts/AuthContext'
import { Excel } from "antd-table-saveas-excel";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'
import { db } from "../../firebase-config"
import { Row, Col, Card, DatePicker, Button, Table, Tooltip, Alert, message, Typography } from "antd"

const { Meta } = Card;
const currencyFormatDecimal = { code: "USD", decimalDigits: 2, precision: 2};

//Homepage Creation and Layout
const Homepage = () => {
    const [ isPopupVisible, setIsPopupVisible ] = useState(false);
    const [ spreadSheetVisible, setSpreadSheetVisible] = useState(false);
    const [ documentType, setDocumentType ] = useState("");
    const [ filteredInfo, setFilteredInfo] = useState();
    const [columnType, setColumnType] = useState(null);
    const [journals, setJournals] = useState([]);
    const navigate = useNavigate()
    const [ dateRange1, setDateRange1 ] = useState();
    const [ dateRange2, setDateRange2 ] = useState();
    const [chartsOfAccounts, setChartsOfAccounts] = useState([]);
    const [users, setUsers ] = useState(null);
    const [ daysLeft, setDaysLeft ] = useState("");
    const { currentUser, logout } = useAuth()
    const isPopupVisible2 = users?.some((e) => _.isEqual(e.data.email, currentUser?.email) && (_.isEqual(e.data.role, "Administrator") || _.isEqual(e.data.role, "Manager"))) && journals?.some(f => f.data.status === "pending")
    const [liquidityRatio, setLiquidityRatio] = useState(null); 
    const [ liquidColor, setLiquidColor ] = useState(null);
    const [liquidityRatio2, setLiquidityRatio2] = useState(null); 
    const [ liquidColor2, setLiquidColor2 ] = useState(null);
    const [liquidityRatio3, setLiquidityRatio3] = useState(null); 
    const [ liquidColor3, setLiquidColor3 ] = useState(null);

    useEffect(() => {
        getChartsOfAccounts()
        getJournals()
    }, [])
    
    const generateInfo = (info) => {
        if(info == "trialbalance"){
            setDocumentType(info)
            setColumnType(columns)
            setFilteredInfo(chartsOfAccounts.filter(f => moment(f?.data.dateAccountAdded.toDate()).format('MM/DD/YYYY') >= moment(dateRange1).format('MM/DD/YYYY') && moment(f?.data.dateAccountAdded.toDate()).format('MM/DD/YYYY') <= moment(dateRange2).format('MM/DD/YYYY')))
        } else if(info == "balancesheet"){
            setDocumentType(info)
            setColumnType(columns2)
            setFilteredInfo(journals.filter(f => moment(f?.data.dateAccountAdded.toDate()).format('MM/DD/YYYY') >= moment(dateRange1).format('MM/DD/YYYY') && moment(f?.data.dateAccountAdded.toDate()).format('MM/DD/YYYY') <= moment(dateRange2).format('MM/DD/YYYY')))
        } else if (info == "retainedEarnings"){
            setDocumentType(info)
            setColumnType(columns2)
            setFilteredInfo(journals.filter(f => moment(f?.data.dateAccountAdded.toDate()).format('MM/DD/YYYY') >= moment(dateRange1).format('MM/DD/YYYY') && moment(f?.data.dateAccountAdded.toDate()).format('MM/DD/YYYY') <= moment(dateRange2).format('MM/DD/YYYY')))
        }

        setSpreadSheetVisible(true)
    }

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
            liquidity(charts)
            liquidity2(charts)
            liquidity3(charts)
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

    const handleInfoDump = (info) => {
        if(info == "trialbalance"){
            handleTrialBalance()
        } else if(info == "balancesheet"){
            handleBalanceSheet()
        } else if (info == "retainedEarnings"){
            handleRetainedEarnings()
        }
    }

    const columns4 = [
        {
          //Account Section Creation
          title: "Account",
          dataIndex: "Account",
          key: "Account"
        },
        {
          //Debit Section Creation
          title: "Debit",
          dataIndex: "Debit",
          key: "Debit"
        },
        {
          //Credit of Birth Section Creation
          title: "Credit",
          dataIndex: "Credit",
          key: "Credit"
        },
    ]

    const handleTrialBalance = () => {
        let userCsv = [];
        let userObj = {};
        let finalObj = {};

        for(let i = 0; i < filteredInfo.length; i++){
          userObj = {
            Account: filteredInfo[i].data.accountName,
            Debit: formatCurrencyChange(filteredInfo[i].data.debit),
            Credit: formatCurrencyChange(filteredInfo[i].data.credit),
          }
            userCsv.push(userObj)
          if(i === filteredInfo.length - 1){
            finalObj = {
                Account: "Total",
                Debit: helperDebit(filteredInfo),
                Credit: helperCredit(filteredInfo),
              }
              userCsv.push(finalObj)
          }
        }
        //Sheet Creation for data
        const excel = new Excel();
        excel.addSheet("test").addColumns(columns4).addDataSource(userCsv).saveAs(`TrialBalance.xlsx`);
      };


    const columns5 = [
        {
            //Name Section Creation
            title: "Name",
            dataIndex: "Name",
            key: "Name"
          },
          {
            //Debit Section Creation
            title: "Assets",
            dataIndex: "Assets",
            key: "Assets"
          },
          {
            //Credit of Birth Section Creation
            title: "Liabilities and Equity",
            dataIndex: "Liabilities",
            key: "Liabilities"
          },
    ]

      const handleBalanceSheet = () => {
        let userCsv = [];
        let userObj = {};
        let finalObj = {};

        for(let i = 0; i < filteredInfo.length; i++){
          userObj = {
            Name: filteredInfo[i].data.accountName,
            Assets: ((!_.isNil(filteredInfo[i].data.debit) || filteredInfo[i].data.debit) != "0" ? formatCurrencyChange(filteredInfo[i].data.debit) : ""),
            Liabilities: ((!_.isNil(filteredInfo[i].data.credit) || filteredInfo[i].data.credit) != "0" ? formatCurrencyChange(filteredInfo[i].data.credit) : ""),
          }
            userCsv.push(userObj)
          if(i === filteredInfo.length - 1){
            finalObj = {
                Name: "Total",
                Assets: helperDebit(filteredInfo),
                Liabilities: helperCredit(filteredInfo),
              }
              userCsv.push(finalObj)
          }
        }
        //Sheet Creation for data
        const excel = new Excel();
        excel.addSheet("test").addColumns(columns5).addDataSource(userCsv).saveAs(`BalanceSheet.xlsx`);
      };

      const columns6 = [
        {
            //Name Section Creation
            title: "Name",
            dataIndex: "Name",
            key: "Name"
          },
          {
            //Debit Section Creation
            title: "Assets",
            dataIndex: "Assets",
            key: "Assets"
          },
          {
            //Credit of Birth Section Creation
            title: "Liabilities and Equity",
            dataIndex: "Liabilities",
            key: "Liabilities"
          },
          {
            //Credit of Birth Section Creation
            title: "Final Earnings",
            dataIndex: "Retained",
            key: "Retained"
          },
    ]

    const helperTotal = (chartsSorted) => {
        const totalCredit = chartsSorted.reduce((prev, current) => {
          return prev + parseFloat(current.data.credit)
        }, 0)

        const totalDebit = chartsSorted.reduce((prev, current) => {
          return prev + parseFloat(current.data.debit)
        }, 0)

        let total = null;

        if(totalCredit > totalDebit){
          total = totalCredit - totalDebit
        } else if (totalDebit > totalCredit){
          total = totalDebit - totalCredit
        }

        return formatCurrencyChange(total);
      }

      const liquidity = (chartsSorted) => {
        const totalCredit = chartsSorted.reduce((prev, current) => {
          return prev + parseFloat(current.data.credit)
        }, 0)

        const totalDebit = chartsSorted.reduce((prev, current) => {
          return prev + parseFloat(current.data.debit)
        }, 0)

        let total = totalDebit/totalCredit;

        if(total > 1) {
            setLiquidColor("lightgreen")
        }
        else if(total < 1){
            setLiquidColor("red")
        }
        else {
            setLiquidColor("yellow")
        }

        setLiquidityRatio(total);
      }
      const liquidity2 = (chartsSorted) => {
        const totalCredit = chartsSorted.reduce((prev, current) => {
          return prev + parseFloat(current.data.credit)
        }, 0)

        const totalDebit = chartsSorted.reduce((prev, current) => {
          return prev + parseFloat(current.data.debit)
        }, 0)

        let total = totalCredit/totalDebit;

        if(total < 1) {
            setLiquidColor2("lightgreen")
        }
        else if(total > 1){
            setLiquidColor2("red")
        }
        else {
            setLiquidColor2("yellow")
        }

        setLiquidityRatio2(total);
      }
      const liquidity3 = (chartsSorted) => {
        const totalCredit = chartsSorted.reduce((prev, current) => {
          return prev + parseFloat(current.data.credit)
        }, 0)

        const totalAssets  = chartsSorted.filter(f => f.data.debit === "0" || f.data.debit === 0)

        let total = totalCredit/totalAssets.length;

        if(total < 50) {
            setLiquidColor3("lightgreen")
        }
        else if(total > 50){
            setLiquidColor3("red")
        }
        else {
            setLiquidColor3("yellow")
        }

        setLiquidityRatio3(total);
      }

    const handleRetainedEarnings = () => {
        let userCsv = [];
        let userObj = {};
        let finalObj = {};

        for(let i = 0; i < filteredInfo.length; i++){
          userObj = {
            Name: filteredInfo[i].data.accountName,
            Assets: ((!_.isNil(filteredInfo[i].data.debit) || filteredInfo[i].data.debit) != "0" ? formatCurrencyChange(filteredInfo[i].data.debit) : ""),
            Liabilities: ((!_.isNil(filteredInfo[i].data.credit) || filteredInfo[i].data.credit) != "0" ? formatCurrencyChange(filteredInfo[i].data.credit) : ""),
          }
            userCsv.push(userObj)
          if(i === filteredInfo.length - 1){
            finalObj = {
                Name: "Retained Earnings",
                Retained: helperTotal(filteredInfo),
              }
              userCsv.push(finalObj)
          }
        }
        //Sheet Creation for data
        const excel = new Excel();
        excel.addSheet("test").addColumns(columns6).addDataSource(userCsv).saveAs(`RetainedEarnings.xlsx`);
      };

    //Calling getUsers function
    useEffect(() => {
        getUsers();
    }, [])

    const handleDisable = (id) => {
        const docRef = doc(db, 'users', id)
        updateDoc(docRef, {disabled: true}).then(response => {
          getUsers()
        }).catch(error => console.log(error.message))
      }

    const getNumberFromDate = (user, expirationDate) => {
        var currentdate = new Date(); 
        var expDate = new Date(expirationDate)

        const currentDateTime = Math.abs(currentdate);
        const expDateTime = Math.abs(expDate);

        const diffTime = Math.abs(currentdate - expDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        if(expDateTime <= currentDateTime){
            handleDisable(user.id);
            handleLogout();
        } else if(diffDays <= 3){
            setInfo(diffDays)
        }
    }

    const setInfo = (diffDays) => {
        setDaysLeft(diffDays.toString());
        setIsPopupVisible(true);
    }

    async function handleLogout() {
        try {
            await logout()
            message.error("Please Reset Your Password");
            navigate("/")
        } catch (e) {
            console.error(e)
        }
    }

    const getUserForDateValidation = (users) => {
        const user = users?.find((e) => _.isEqual(e.data.email, currentUser?.email))
        getNumberFromDate(user, moment(user?.data.passwordExpiration.toDate()).format('YYYY/MM/DD'))
    }



    // Gets users from database
    const getUsers = () => {
      const usersCollectionRef = collection(db, 'users')
      getDocs(usersCollectionRef).then(response => {
          const usrs = response.docs.map(doc => ({
              data: doc.data(), 
              id: doc.id,
          }))
          setUsers(usrs)
          getUserForDateValidation(usrs)
      }).catch (error => console.log(error.message))
    }



    const helperDebit = (chartsSorted) => {
        const totalValue = chartsSorted.reduce((prev, current) => {
          return prev + parseFloat(current.data.debit)
        }, 0)

        return formatCurrencyChange(totalValue);
      }

      const helperCredit = (chartsSorted) => {
        const totalValue = chartsSorted.reduce((prev, current) => {
          return prev + parseFloat(current.data.credit)
        }, 0)

        return formatCurrencyChange(totalValue);
      }

      const formatCurrencyChange = (amount) => {
        return currencyFormatter.format(amount, currencyFormatDecimal)
      }

      let locale3 = {
        emptyText: 'No Data Available',
      };

      const ChartsOfAccountsTable = (data) => (
        <Table style={{width: "1000px", paddingTop: "40px"}} locale={locale3} columns={columnType} dataSource={data} />
    );

      const columns = [
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
                      <Typography.Text>
                        {item?.data.accountName}
                      </Typography.Text>
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
      ];

      const columns2 = [
        {
          title: () => {
            return (
              <>
                <Tooltip title="This is the Account Name">
                  <Typography.Text strong> Name </Typography.Text>
                </Tooltip>
              </>
            )
          },
          key: 'accountName',
          render: item => {
            return (
                <>
                    <>
                      <Typography.Text>
                        {item?.data.accountName}
                      </Typography.Text>
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
                  <Typography.Text strong> Assets </Typography.Text>
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
                  <Typography.Text strong> Liablities </Typography.Text>
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
      ];

    const handleChangeDebut = (range) => {
        setDateRange1(range[0].format());
        setDateRange2(range[1].format());
    }

    return (
        <div className="homeContainer">
            {isPopupVisible && <Alert
                style={{width: "300px", marginLeft: "900px"}}
                message={<Typography>{`Your Password Expires in ${daysLeft} Days`}</Typography>}
                type="warning"
                closable
                onClose={() => setIsPopupVisible(false)}
            />}
            {isPopupVisible2 && 
            <Alert
                style={{width: "300px", marginLeft: "800px"}}
                message="New Pending Journals"
                type="success"
                closeText="X"
            />
            }
            <Row className="rowStuff">
                <Col>
                    <img src={require('../../images/instacount.png')} style={{width: "700px", marginTop: "100px", paddingLeft: "0px"}} alt="Instacount" className="logo"/>
                </Col>
            </Row>
            <Row style={{maxWidth: "1200px", marginLeft: "350px", paddingLeft: "485px", paddingBottom: "20px", height: "60px"}}/>
            <Row style={{maxWidth: "1200px", marginLeft: "350px", paddingBottom: "20px", justifyContent: "center", backgroundColor: "#ECB365"}}>
                <Col span={7} style={{paddingRight: "20px", marginTop: "20px",}}>
                    <Card style={{backgroundColor: liquidColor}}>
                        <Meta
                        title="Liquidity ratios"
                        description={liquidityRatio}
                        />
                    </Card >
                </Col >
                <Col span={7} style={{paddingRight: "20px", marginTop: "20px"}}>
                    <Card style={{backgroundColor: liquidColor2}}> 
                        <Meta
                        title="Leverage ratios"
                        description={liquidityRatio2}
                        />
                    </Card>
                </Col>
                <Col span={7} style={{paddingRight: "20px", marginTop: "20px"}}>
                    <Card style={{backgroundColor: liquidColor3}}>
                        <Meta
                        title="Efficiency ratios"
                        description={liquidityRatio3}
                        />
                    </Card>
                </Col>
            </Row>
            <Row style={{maxWidth: "1200px", marginLeft: "350px", paddingLeft: "485px", paddingBottom: "20px", height: "60px"}}/>
            { users?.some((e) => _.isEqual(e.data.email, currentUser?.email) && (_.isEqual(e.data.role, "Administrator") || _.isEqual(e.data.role, "Manager"))) &&
                <>
                    <Row style={{maxWidth: "1200px", marginLeft: "350px", paddingLeft: "485px", paddingBottom: "20px", height: "60px", backgroundColor: "#04293A"}}/>
                    <Row style={{maxWidth: "1200px", marginLeft: "350px", paddingLeft: "485px", paddingBottom: "20px", backgroundColor: "#04293A"}}>
                        <Col style={{marginLeft: "-410px"}}>
                            <DatePicker.RangePicker onChange={(e) => handleChangeDebut(e)}/>
                        </Col>
                    </Row>
                    <Row style={{maxWidth: "1200px", marginLeft: "350px", paddingBottom: "20px", justifyContent: "center", backgroundColor: "#04293A"}}>
                        <Col span={7} style={{paddingRight: "20px"}}>
                            <Card title="Trial Balance" bordered={true}>
                                <Button onClick={() => generateInfo("trialbalance")}> Generate Trial Balance </Button>
                            </Card>
                        </Col>
                        <Col span={7} style={{paddingRight: "20px"}}>
                            <Card title="Balance Sheet" bordered={false}>
                                <Button onClick={() => generateInfo("balancesheet")}> Generate Balance Sheet </Button>
                            </Card>
                        </Col>
                        <Col span={7}>
                            <Card title="Retained Earnings" bordered={false}>
                                <Button onClick={() => generateInfo("retainedEarnings")}> Generate Retained Earnings </Button>
                            </Card>
                        </Col>
                    </Row>
                    {spreadSheetVisible &&
                        <>
                            <Row style={{backgroundColor: "#04293A", maxWidth: "1200px", minHeight: "60px", marginLeft: "350px", marginTop: "20px", paddingTop: "40px", justifyContent: "left"}}>
                                {documentType === "trialbalance" &&
                                    <Col span={6}>
                                        <Button style={{marginLeft: "100px"}} onClick={() => handleInfoDump(documentType)}>Export Trial Balance</Button>
                                    </Col>
                                }
                                {documentType === "balancesheet" &&
                                    <Col span={6}>
                                        <Button style={{marginLeft: "100px"}} onClick={() => handleInfoDump(documentType)}>Export Balance Sheet</Button>
                                    </Col>
                                }
                                {documentType === "retainedEarnings" &&
                                    <Col span={6}>
                                        <Button style={{marginLeft: "100px"}} onClick={() => handleInfoDump(documentType)}>Export Retained Earnings</Button>
                                    </Col>
                                }
                            </Row>
                            <Row style={{backgroundColor: "#04293A", maxWidth: "1200px", minHeight: "20px", marginLeft: "350px", paddingBottom: "40px", justifyContent: "center"}}>
                                {ChartsOfAccountsTable(filteredInfo)}
                            </Row>
                            <Row style={{backgroundColor: "#04293A", maxWidth: "1200px", minHeight: "60px", marginLeft: "350px", justifyContent: "left"}}>
                                {(documentType === "balancesheet" || documentType === "trialbalance") &&
                                <Col span={6}>
                                    <Typography.Text style={{color: "white", marginLeft: "100px"}} strong>Totals</Typography.Text>
                                </Col>
                                }
                                {documentType === "trialbalance" &&
                                <>
                                <Col span={3} style={{marginLeft: "210px"}}>
                                    <Typography.Text style={{color: "white"}} strong>Total Debits: {" "}</Typography.Text>
                                    <Typography.Text style={{color: "white"}}>
                                        {helperDebit(filteredInfo)}
                                    </Typography.Text>
                                </Col>
                                <Col span={3} style={{marginLeft: "100px"}}>
                                    <Typography.Text style={{color: "white"}} strong>Total Credits: {" "}</Typography.Text>
                                    <Typography.Text style={{color: "white"}}>
                                        {helperCredit(filteredInfo)}
                                    </Typography.Text>
                                </Col>
                                </>}
                                {documentType === "balancesheet" &&
                                <>
                                <Col span={3} style={{marginLeft: "210px"}}>
                                    <Typography.Text style={{color: "white"}} strong>Total Assets: {" "}</Typography.Text>
                                    <Typography.Text style={{color: "white"}}>
                                        {helperDebit(filteredInfo)}
                                    </Typography.Text>
                                </Col>
                                <Col span={3} style={{marginLeft: "100px"}}>
                                    <Typography.Text style={{color: "white"}} strong>Total Liablities: {" "}</Typography.Text>
                                    <Typography.Text style={{color: "white"}}>
                                        {helperCredit(filteredInfo)}
                                    </Typography.Text>
                                </Col>
                                </>}
                                {documentType === "retainedEarnings" &&
                                <>
                                <Col span={3} style={{marginLeft: "100px"}}>
                                    <Typography.Text style={{color: "white"}} strong>Retained Earnings: {" "}</Typography.Text>
                                    <Typography.Text style={{color: "white"}}>
                                        {helperTotal(filteredInfo)}
                                    </Typography.Text>
                                </Col>
                                </>}

                            </Row>
                        </>
                    }
                </>
            }
        </div>
    );
}
//Exporting HomePage
export default Homepage;