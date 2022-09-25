import "antd/dist/antd.min.css"
import React, { useState, useEffect } from "react";
import * as _ from "lodash"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase-config"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import { Link} from 'react-router-dom'
import { Menu, Row, Col, Button } from 'antd'

const MenuItemizer = () => {        

    const navigate = useNavigate()
    const { currentUser, logout } = useAuth()
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
    }, [])

    async function handleLogout() {
        try {
            await logout()
            navigate("/")
        } catch (e) {
            console.error(e)
        }
    }
        
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

    return (
       <>
            <Row >
              <Col span={4}>
                <Link to="/homepage">
                <img src={require('../images/instacount.png')} style={{width: "274px", marginBottom: "10px", paddingLeft: "0px"}} alt="Instacount" className="logo"/>
                </Link>
              </Col>
              <Col span={20}>
                <Menu
                  theme="white"
                  mode="horizontal"
                  defaultSelectedKeys={['login']}
                  selectedKeys={[]}
                >
                  <Menu.Item key="homepage">
                    <Link to="/homepage">
                      Homepage
                    </Link>
                  </Menu.Item>
                  { users?.some((e) => _.isEqual(e.data.email, currentUser?.email) && _.isEqual(e.data.role, "Administrator")) &&
                  <Menu.Item key="administrator">
                    <Link to="/administrator">
                      Administrator
                    </Link>
                  </Menu.Item>
                  }
                  <Menu.Item style={{marginLeft: 'auto'}}>
                    {currentUser?.email}
                  </Menu.Item>
                  <Menu.Item >
                      <Button onClick={() => handleLogout()}>Log Out</Button>
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
    </>
    )
}

export default MenuItemizer