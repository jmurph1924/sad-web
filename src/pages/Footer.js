import * as React from 'react'
import { Typography, Row, Col} from 'antd'

const FooterItem = () => {
    return (
        <Row style={{color: "white" }}>
            <Col span={4}>
                <img src={require('../images/instacount.png')} style={{width: "274px", alignContent: "left"}} alt="Instacount" className="logo"/>
            </Col>
            <Col span={16}>
                <Typography.Text style={{opacity: ".6", margin: "280px"}}>
                    This website is brought to you by Jonathan Murphree, Bray Torres, Julianny Pinott, and Cliff Herr 
                </Typography.Text>
            </Col>
        </Row>
    )
}

export default FooterItem