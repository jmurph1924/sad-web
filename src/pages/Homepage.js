import * as React from 'react'
import { Layout } from 'antd'

import MenuItemizer from "../pages/Header"
import FooterItem from './Footer'
import Homepage from '../components/Homepage/Homepage';

const { Header, Footer, Content } = Layout;

const HomepagePage = () => {

    return (

    <Layout>
        <Header style={{background: "white"}}>
            <MenuItemizer />
        </Header>
        <Content style={{ background: "#041C32", height: "850px" }}>
            <Homepage />
        </Content>
        <Footer style={{ textAlign: 'center'}}>
            <FooterItem />
        </Footer>
    </Layout>
    )
}

export default HomepagePage