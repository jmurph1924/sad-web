import * as React from 'react'
import { Layout } from 'antd'

import HeaderNoLogin from "../pages/HeaderNoLogin"
import FooterItem from './Footer'
import Login from '../components/Login/Login'

const { Header, Footer, Content } = Layout;

const LoginPage = () => {

    return (

    <Layout>
        <Header style={{background: "white"}}>
            <HeaderNoLogin />
        </Header>
        <Content style={{ background: "#041C32", height: "850px" }}>
            <Login />
        </Content>
        <Footer style={{ textAlign: 'center'}}>
            <FooterItem />
        </Footer>
    </Layout>
    )
}

export default LoginPage