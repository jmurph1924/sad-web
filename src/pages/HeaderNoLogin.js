import * as React from 'react'
import { Menu, Row, Col} from 'antd'

//Header Before logging in Function 
const HeaderNoLogin = () => {        
    
    //Returning Head without login layout 
    return (
      <>
        <Row>
          <Col span={4}>
            <img src={require('../images/instacount.png')} style={{width: "274px", paddingTop: "5px"}} alt="Instacount" className="logo"/>
          </Col>
          <Col span={20}>
            <Menu
              theme="white"
              mode="horizontal"
              defaultSelectedKeys={['login']}
              selectedKeys={[]}
            >
            </Menu>
          </Col>
        </Row>
      </>
    )
}
//Exporting HeaderNoLogin Page
export default HeaderNoLogin