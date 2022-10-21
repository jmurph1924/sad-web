import React, { useState,useEffect  } from "react";
import * as _ from "lodash"
import moment from 'moment';
import { useAuth } from '../../contexts/AuthContext'
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'
import { db } from "../../firebase-config"
import { Row, Col, Alert, message } from "antd"

//Homepage Creation and Layout
const Homepage = () => {
    const [ isPopupVisible, setIsPopupVisible ] = useState(false);
    const navigate = useNavigate()
    const [ user2, setUser2] = useState(null);
    const { currentUser, logout } = useAuth()

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
            setIsPopupVisible(true);
        }

        
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
          getUserForDateValidation(usrs)
      }).catch (error => console.log(error.message))
    }
    return (
        <div className="homeContainer">
            {isPopupVisible && <Alert
                style={{width: "300px", marginLeft: "900px"}}
                message="Your Password Expires in 3 Days"
                type="warning"
                closable
                onClose={() => setIsPopupVisible(false)}
            />}
            <Row className="rowStuff">
                <Col>
                    <img src={require('../../images/instacount.png')} style={{width: "700px", marginTop: "100px", paddingLeft: "0px"}} alt="Instacount" className="logo"/>
                </Col>
            </Row>
        </div>
    );
}
//Exporting HomePage
export default Homepage;