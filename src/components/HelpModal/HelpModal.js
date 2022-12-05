import * as React from 'react'
import {Link} from 'react-scroll';
import * as _ from "lodash"
import { Modal, Menu, Button, Typography, Row, Col } from "antd"

import ChartsHelp from './ChartsHelp';
import JournalsHelp from './JournalsHelp';
import LedgersHelp from './LedgersHelp';
import AccessibilityHelp from './AccessibilityHelp';
import ContactUs from './ContactUs';

//HelpModal function Creation
const HelpModal = ({ isHelpModalVisible = false, onModalChange = _.noop }) => {

    return(
        <div style={{ background: "#041C32"}}>
            <Modal type="primary" title="Help Page"  width={2000} visible={isHelpModalVisible} footer={[ <Button key="back" onClick={onModalChange}>Ok</Button>]} onCancel={onModalChange}>
            <Row style={{height: "auto"}}>
                <Col style={{paddingLeft: "40px"}} span={16}>
                    <Typography.Title>
                        Welcome to the Help Page
                    </Typography.Title>
                    <div>
                        <Typography.Paragraph>This page is meant to be a guide for Instacount.</Typography.Paragraph>
                    </div>
                    <div id="chartsOfAccounts">
                        <ChartsHelp/>
                    </div>
                    <div id="journals">
                        <JournalsHelp/>
                    </div>
                    <div id="ledgers">
                        <LedgersHelp/>
                    </div>
                    <div id="access">
                        <AccessibilityHelp/>
                    </div>
                    <div id="contact">
                        <ContactUs/>
                    </div>
                </Col>
            </Row>
            </Modal>
        </div>
    );
}

export default HelpModal