import * as React from 'react'
import { Layout } from 'antd'

import HeaderNoLogin from "../pages/HeaderNoLogin"
import FooterItem from './Footer'
import CreateUser from '../components/CreateUser/CreateUser'

const { Header, Footer, Content } = Layout;

const CreateUserPage = () => {

    return (
        <Layout>
            <Header style={{background: "white"}}>
                <HeaderNoLogin />
            </Header>
            <Content style={{ background: "#041C32", height: "850px" }}>
                <CreateUser />
            </Content>
            <Footer style={{ textAlign: 'center'}}>
                <FooterItem />
            </Footer>
        </Layout>
    )
}

export default CreateUserPage