import React, { useRef, useState} from 'react'
import * as _ from "lodash";
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db } from "../../firebase-config"
import { Row, Col, Typography, Collapse, Table, Button, Select, message, Input, Form, Modal} from "antd"



const AddAnAccount = ({isAddAnAccountVisible = false, onModalChange = _.noop}) => {

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [accountDescription, setAccountDescription] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState(null);
    const [accountSubcategory, setAccountSubCategory] = useState("");
    const [balance, setBalance] = useState(null);
    const [comments, setComments] = useState("");
    const [credit, setCredit] = useState(null);
    const dateAccountAdded = Timestamp.fromDate(new Date());
    const [debit, setDebit] = useState(null);
    const [initialBalance, setInitialBalance] = useState(null);
    const [normalSide, setNormalSide] = useState("");
    const [order, setOrder] = useState(null);
    const [statement, setStatement] = useState("");
    const [userId, setUserId] = useState("");

    async function handleSubmit() {
        const usersCollectionRef = collection(db, 'chartsOfAccounts')
        addDoc(usersCollectionRef, { accountDescription, accountName, accountNumber, accountSubcategory, balance, comments, credit, dateAccountAdded, debit, initialBalance, normalSide, order, statement, userId }).then(response => {
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


    return (
        <div style={{ background: "#041C32"}}>
            <Modal type="primary" title="Add a New Account"  width={2000} visible={isAddAnAccountVisible} footer={[ <Button key="back" onClick={() => handleSubmit()}>Submit</Button>]} onCancel={onModalChange}>

            </Modal>
        </div>
    )

}

export default AddAnAccount;
