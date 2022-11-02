import "antd/dist/antd.min.css"
import React, { useState, useEffect } from "react";
import * as _ from "lodash"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase-config"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import { Link} from 'react-router-dom'
import { Menu, Row, Col, Button, Tooltip } from 'antd'

//Menu Function
const MenuItemizer = () => {        
    // Navigate allows you to go to a different page
    const navigate = useNavigate()
    const { currentUser, logout } = useAuth()
    const [users, setUsers] = useState([]);

    //Calling getUsers function
    useEffect(() => {
        getUsers()
    }, [])

  // Logs out user
    async function handleLogout() {
        try {
            await logout()
            navigate("/")
        } catch (e) {
            console.error(e)
        }
    }
    
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
    //Returning Header Layout
    return (
       <>
            <Row >
              <Col span={4}>
                <Link to="/homepage">
                <img src={require('../images/instacount.png')} style={{width: "274px", paddingTop: "5px"}} alt="Instacount" className="logo"/>
                </Link>
              </Col>
              <Col span={20}>
                <Menu
                  theme="white"
                  mode="horizontal"
                  defaultSelectedKeys={['login']}
                  selectedKeys={[]}
                  style={{height: "70px"}}
                >
                  <Menu.Item key="homepage" style={{paddingTop: "13px"}}>
                    <Link to="/homepage">
                      Homepage
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="ChartsOfAccounts" style={{paddingTop: "13px"}}>
                    <Link to="/ChartsOfAccounts">
                      Charts of Accounts
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Ledgers" style={{paddingTop: "13px"}}>
                    <Link to="/ledgers">
                      Ledgers
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Journals" style={{paddingTop: "13px"}}>
                    <Link to="/journals">
                      Journal Entry
                    </Link>
                  </Menu.Item>
                  {/* Checks to see if the user is an administrator */}
                  { users?.some((e) => _.isEqual(e.data.email, currentUser?.email) && _.isEqual(e.data.role, "Administrator")) &&
                  <Menu.Item key="administrator" style={{paddingTop: "13px"}}>
                    <Link to="/administrator">
                      Administrator
                    </Link>
                  </Menu.Item>
                  }
                  <Menu.Item style={{marginLeft: 'auto', paddingTop: "13px"}}>
                    {currentUser?.email}
                  </Menu.Item>
                  <Menu.Item style={{paddingTop: "13px"}}>
                      <Button onClick={() => handleLogout()}>Log Out</Button>
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
    </>
    )
}
//Exporting Menu Itemizer
export default MenuItemizer