import React, { useRef, useState} from 'react'
import * as _ from "lodash";
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db } from "../../firebase-config"
import { Row, Col, Typography, Collapse, Table, Button, Select, message, Input, Form, Modal} from "antd"
import { useAuth } from '../../contexts/AuthContext'


const AddAnAccount = ({isAddAnAccountVisible = false, onModalChange = _.noop, chartsOfAccountsInfo = []}) => {

    const { currentUser } = useAuth()

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
    const userId = currentUser?.email
    const active = true;

    async function handleSubmit() {
        const usersCollectionRef = collection(db, 'chartsOfAccounts')

        setAccountNumber(parseInt(accountNumber));
        setCredit(parseFloat(credit));
        setDebit(parseFloat(debit));
        setBalance(parseFloat(balance));
        setInitialBalance(parseFloat(initialBalance));
        setOrder(parseInt(order));

        if(chartsOfAccountsInfo?.some(f => _.isEqual(f.data.accountNumber, accountNumber))){
            message.error("Account Number Already Exist")
        }else if(chartsOfAccountsInfo?.some(f => _.isEqual(f.data.accountName, accountName))){
            message.error("Account Name Already Exist")
        } else {
            addDoc(usersCollectionRef, { active, accountDescription, accountName, accountNumber, accountCategory, accountSubCategory, balance, comments, credit, dateAccountAdded, debit, initialBalance, normalSide, order, statement, userId }).then(response => {
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

            onModalChange()
        }
    }


    return (
        <div style={{ background: "#041C32"}}>
            <Modal type="primary" title="Add a New Account"  width={1800} visible={isAddAnAccountVisible} footer={[ <Button key="back" onClick={() => handleSubmit()}>Submit</Button>]} onCancel={onModalChange}>
                <Row>
                    <Col span={16}>
                        <Row gutter={[12,12]}>
                            <Col span={6}>
                                <Typography.Text strong>
                                Account Number
                                </Typography.Text>
                            </Col>
                            <Col span={6}>
                                <Typography.Text strong>
                                Account Name
                                </Typography.Text>
                            </Col>
                            <Col span={6}>
                                <Typography.Text strong>
                                Credit
                                </Typography.Text>
                            </Col>
                            <Col span={6}>
                                <Typography.Text strong>
                                Statement
                                </Typography.Text>
                            </Col>
                            </Row>
                            <Row gutter={[12,12]}>
                            <Col span={6} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setAccountNumber(e.target.value)}/>
                            </Col>
                            <Col span={6} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setAccountName(e.target.value)}/>
                            </Col>
                            <Col span={6} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setCredit(e.target.value)}/>
                            </Col>
                            <Col span={6} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setStatement(e.target.value)}/>
                            </Col>
                            </Row>
                            <Row gutter={[12,12]}>
                            <Col span={6}>
                                <Typography.Text strong>
                                Account Category
                                </Typography.Text>
                            </Col>
                            <Col span={6}>
                                <Typography.Text strong>
                                Account Description
                                </Typography.Text>
                            </Col>
                            <Col span={6}>
                                <Typography.Text strong>
                                Debit
                                </Typography.Text>
                            </Col>
                            <Col span={6}>
                                <Typography.Text strong>
                                Normal Side
                                </Typography.Text>
                            </Col>
                            </Row>
                            <Row gutter={[12,12]}>
                            <Col span={6} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setAccountCategory(e.target.value)}/>
                            </Col>
                            <Col span={6} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setAccountDescription(e.target.value)}/>
                            </Col>
                            <Col span={6} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setDebit(e.target.value)}/>
                            </Col>
                            <Col span={6} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setNormalSide(e.target.value)}/>
                            </Col>
                            </Row>
                            <Row gutter={[12,12]}>
                            <Col span={6}>
                                <Typography.Text strong>
                                Account SubCategory
                                </Typography.Text>
                            </Col>
                            <Col span={6}>
                                <Typography.Text strong>
                                Order
                                </Typography.Text>
                            </Col>
                            <Col span={6}>
                                <Typography.Text strong>
                                Balance
                                </Typography.Text>
                            </Col>
                            <Col span={6}>
                                <Typography.Text strong>
                                Initial Balance 
                                </Typography.Text>
                            </Col>
                            </Row >
                            <Row gutter={[12,12]}>
                            <Col span={6} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setAccountSubCategory(e.target.value)}/>
                            </Col>
                            <Col span={6} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setOrder(e.target.value)}/>
                            </Col>
                            <Col span={6} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setBalance(e.target.value)}/>
                            </Col>
                            <Col span={6} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setInitialBalance(e.target.value)}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col>
                                <Typography.Text strong>
                                Comment
                                </Typography.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{marginBottom: "10px"}}>
                                <Input.TextArea style={{height: "160px", width: "520px"}} onChange={(e) => setComments(e.target.value)}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </div>
    )

}

export default AddAnAccount;
