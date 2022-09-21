import "antd/dist/antd.min.css"
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import { Layout, Menu, Row, Col, Typography } from 'antd'

import Login from './components/Login/Login'
import Homepage from './components/Homepage/Homepage';
import Administrator from "./components/Administrator/Administrator";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import CreateUser from "./components/CreateUser/CreateUser";

const { Header, Footer, Content } = Layout;

function App() {
  const loggedIn = true;

  return (
      
        <Layout>
          <BrowserRouter>
          <Header style={{background: "white"}}>
            {loggedIn === true ? 
            <Row >
              <Col span={4}>
                <img src={require('./images/instacount.png')} style={{width: "274px", marginBottom: "10px", paddingLeft: "0px"}} alt="Instacount" className="logo"/>
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
                  <Menu.Item key="chartsofaccounts">
                    <Link to="/">
                      Charts of Accounts
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="journals">
                    Journals
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
            :
            <>
             <Row >
              <Col span={4}>
                <img src={require('./images/instacount.png')} style={{width: "274px", marginBottom: "10px", paddingLeft: "0px"}} alt="Instacount" className="logo"/>
              </Col>
             </Row>
            </>  
          }
          </Header>
          <Content style={{ background: "#041C32", height: "850px" }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/administrator" element={<Administrator />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/createUser" element={<CreateUser />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center'}}>
            <Row style={{color: "white" }}>
                <Col span={4}>
                  <img src={require('./images/instacount.png')} style={{width: "274px", alignContent: "left"}} alt="Instacount" className="logo"/>
                </Col>
                <Col span={16}>
                  <Typography.Text style={{opacity: ".6"}}>
                    This website is brought to you by Jonathan Murphree, Bray Torres, Julianny Pinott, and Cliff Herr 
                  </Typography.Text>
                </Col>
            </Row>
          </Footer>
         </BrowserRouter> 
        </Layout>
      
  )
}

export default App;
