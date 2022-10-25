import * as React from 'react'
import * as Scroll from 'react-scroll';
import * as _ from "lodash"
import { Modal, Menu, Button, Typography, Row, Col } from "antd"

import ChartsHelp from './ChartsHelp';
import JournalsHelp from './JournalsHelp';
import LedgersHelp from './LedgersHelp';
import AccessibilityHelp from './AccessibilityHelp';
import ContactUs from './ContactUs';


function getItem(label, key, children) {
    return {
      key,
      children,
      label,
    };
  }

const HelpModal = ({ isHelpModalVisible = false, onModalChange = _.noop }) => {

    return(
        <div style={{ background: "#041C32"}}>
            <Modal type="primary" title="Help Page"  width={2000} visible={isHelpModalVisible} footer={[ <Button key="back" onClick={onModalChange}>Ok</Button>]} onCancel={onModalChange}>
            <Row style={{height: "auto"}}>
                <Col>
                    <Menu
                        style={{
                        width: 256,
                        }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode={"inline"}
                        theme={"light"}
                    >
                        <Menu.SubMenu  title="Charts of Accounts">
                            <Menu.Item key="one">
                            Navigation Four
                            </Menu.Item>
                            <Menu.Item key="two">
                            Navigation Five
                            </Menu.Item>
                        </Menu.SubMenu >
                        <Menu.SubMenu  title="Journals">
                            <Menu.Item key="three">
                            Navigation Four
                            </Menu.Item>
                            <Menu.Item key="four">
                            Navigation Five
                            </Menu.Item>
                        </Menu.SubMenu >
                        <Menu.SubMenu  title="Ledgers">
                            <Menu.Item key="five">
                            Navigation Four
                            </Menu.Item>
                            <Menu.Item key="six">
                            Navigation Five
                            </Menu.Item>
                        </Menu.SubMenu >
                        <Menu.SubMenu  title="Accessibility">
                            <Menu.Item key="seven">
                            Navigation Four
                            </Menu.Item>
                            <Menu.Item key="eight">
                            Navigation Five
                            </Menu.Item>
                        </Menu.SubMenu >
                        <Menu.Item title="Contact Us">
                            Contact Us
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col style={{paddingLeft: "40px"}} span={16}>
                    <Typography.Title>
                        Welcome to the Help Page
                    </Typography.Title>
                    <Typography.Paragraph>This page is meant to be a guide for Instacount.</Typography.Paragraph>
                    <ChartsHelp />
                    <JournalsHelp />
                    <LedgersHelp />
                    <AccessibilityHelp />
                    <ContactUs />
                </Col>
            </Row>
            </Modal>
        </div>
    );
}

export default HelpModal