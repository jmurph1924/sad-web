import React, { useRef, useState} from 'react'
import * as _ from "lodash";
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db } from "../../firebase-config"
import { Row, Col, Typography, Button, message, Input, Modal, Tooltip, Select} from "antd"
import { useAuth } from '../../contexts/AuthContext'


const AddAnAccount = ({isAddAnAccountVisible = false, onModalChange = _.noop, chartsOfAccountsInfo = []}) => {

    const { currentUser } = useAuth()
    
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [accountDescription, setAccountDescription] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState(null);
    const [credit, setCredit] = useState(null);
    const dateAccountAdded = Timestamp.fromDate(new Date());
    const [debit, setDebit] = useState(null);
    const status = "pending";

    async function handleSubmit() {
        const usersCollectionRef = collection(db, 'journals')
        const accountNumb = accountNumber.data.accountNumber
        setCredit(parseFloat(credit));
        setDebit(parseFloat(debit));
    
            if(accountName.length > 0 && accountNumb.length > 0 && accountDescription > 0 && credit.length > 0 && debit.length > 0 ){
                addDoc(usersCollectionRef, { accountDescription, accountName, accountNumber: parseInt(accountNumb), credit, dateAccountAdded, status}).then(response => {
                        try {
                    setError("")
                    setLoading(true)
                    } catch(e) {
                        setError("Failed to create Journal")
                    }
    
                    setLoading(false)
                    }).catch(error => {
                        console.log(error.message)
                    }) 
    
                onModalChange()
            } else {
                message.error("Please Fill Out All Information")
            }
        }
    


    return (
        <div style={{ background: "#041C32"}}>
            <Modal type="primary" title="Add a New Journal"  width={1800} visible={isAddAnAccountVisible} footer={[ 
            <Tooltip title="Add a New Journal">
                <Button key="back" onClick={() => handleSubmit()}>Submit</Button>
            </Tooltip>
            ]} onCancel={onModalChange}>
                <Row>
                            <Col span={4}>
                                <Typography.Text strong>
                                Account Name
                                </Typography.Text>
                            </Col>
                            <Col span={4}>
                                <Typography.Text strong>
                                Journal Name
                                </Typography.Text>
                            </Col>
                            <Col span={4} style={{paddingLeft: "4px"}}>
                                <Typography.Text strong>
                                Journal Description
                                </Typography.Text>
                            </Col>
                            <Col span={4} style={{paddingLeft: "4px"}}>
                                <Typography.Text strong> 
                                Debit
                                </Typography.Text>
                            </Col>
                            <Col span={4} style={{paddingLeft: "4px"}}>
                                <Typography.Text strong>
                                Credit
                                </Typography.Text>
                            </Col>
                            </Row>
                            <Row gutter={[12,12]}>
                            <Col span={4} style={{marginBottom: "10px"}}>
                                <Select style={{width: "95%"}} onChange={e => setAccountNumber(chartsOfAccountsInfo.find(f => f.data.accountName === e))}>
                                    {chartsOfAccountsInfo.filter(f => f.data.active === true).map(item => (
                                        <Select.Option key={item?.data.accountName}>
                                        {item?.data.accountName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Col>
                            <Col span={4} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setAccountName(e.target.value)}/>
                            </Col>
                            <Col span={4} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setAccountDescription(e.target.value)}/>
                            </Col>
                            <Col span={4} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setDebit(e.target.value)}/>
                            </Col>
                            <Col span={4} style={{marginBottom: "10px"}}>
                                <Input style={{width: "95%"}} onChange={(e) => setCredit(e.target.value)}/>
                            </Col>
                </Row>
            </Modal>
        </div>
    )

}

export default AddAnAccount;
