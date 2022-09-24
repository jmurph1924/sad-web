import "antd/dist/antd.min.css"
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import { Link} from 'react-router-dom'
import { Menu, Row, Col, Button } from 'antd'

const MenuItemizer = () => {        

    const navigate = useNavigate()
    const { currentUser, logout } = useAuth()

    async function handleLogout() {
        try {
            await logout()
            navigate("/")
        } catch (e) {
            console.error(e)
        }
    }
        
    return (
       <>
            <Row >
              <Col span={4}>
                <img src={require('../images/instacount.png')} style={{width: "274px", marginBottom: "10px", paddingLeft: "0px"}} alt="Instacount" className="logo"/>
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
                  <Menu.Item key="administrator">
                    <Link to="/administrator">
                      Administrator
                    </Link>
                  </Menu.Item>
                  <Menu.Item style={{marginLeft: "860px"}}>
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