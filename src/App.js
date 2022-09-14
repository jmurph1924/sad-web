import "antd/dist/antd.min.css"
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Layout, Menu, Row, Col } from 'antd'

import Login from './components/Login/Login'
import Homepage from './components/Homepage/Homepage';

const { Header, Footer, Content } = Layout;

function App() {

  return (
      
        <Layout className="layout">
          <BrowserRouter>
          <Header>
            <Row>
              <Col span={4}>
                <img src={require('./images/instacount.png')} alt="Instacount" className="logo"/>
              </Col>
              <Col span={20}>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['login']}
                >
                  <Menu.Item key="login">
                    Login
                  </Menu.Item>
                  <Menu.Item key="homepage">
                    Homepage
                  </Menu.Item>
                  <Menu.Item key="chartsofaccounts">
                    Charts of Accounts
                  </Menu.Item>
                  <Menu.Item key="journals">
                    Journals
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/homepage" element={<Homepage />} />
              {/* <Route exact path="/chartofaccounts">
                <Chartofaccounts />
              </Route>
              <Route exact path="/journals">
                <Journals />
              </Route> */}
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>

          </Footer>
         </BrowserRouter> 
        </Layout>
      
  )
}

export default App;
