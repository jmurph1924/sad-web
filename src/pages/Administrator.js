import * as React from 'react'
import { Layout } from 'antd'

import MenuItemizer from "../pages/Header"
import FooterItem from './Footer'
import Administrator from '../components/Administrator/Administrator'

const { Header, Footer, Content } = Layout;

const AdministratorPage = () => {

    return (

    <Layout>
        <Header style={{background: "white"}}>
            <MenuItemizer />
        </Header>
        <Content style={{ background: "#041C32", height: "2000px" }}>
            <Administrator />
        </Content>
        <Footer style={{ textAlign: 'center'}}>
            <FooterItem />
        </Footer>
    </Layout>
    )
}

export default AdministratorPage