import * as React from 'react'
import { Layout } from 'antd'

import HeaderNoLogin from "../pages/HeaderNoLogin"
import FooterItem from './Footer'
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";

const { Header, Footer, Content } = Layout;

const ForgotPasswordPage = () => {

    return (

    <Layout>
        <Header style={{background: "white"}}>
            <HeaderNoLogin />
        </Header>
        <Content style={{ background: "#041C32", height: "950px" }}>
            <ForgotPassword />
        </Content>
        <Footer style={{ textAlign: 'center'}}>
            <FooterItem />
        </Footer>
    </Layout>
    )
}

export default ForgotPasswordPage