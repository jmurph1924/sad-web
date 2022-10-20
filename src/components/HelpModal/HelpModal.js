import * as React from 'react'
import * as _ from "lodash"
import { Modal, Menu, Button } from "antd"

function getItem(label, key, children) {
    return {
      key,
      children,
      label,
    };
  }

const HelpModal = ({ isHelpModalVisible = false, onModalChange = _.noop }) => {

    const items = [

        getItem('Charts of Accounts', 'sub1', [
          getItem('Option 7', '7'),
          getItem('Option 8', '8'),
          getItem('Option 9', '9'),
          getItem('Option 10', '10'),
        ]),
        getItem('Ledgers', 'sub2', [
            getItem('Option 7', '7'),
            getItem('Option 8', '8'),
            getItem('Option 9', '9'),
            getItem('Option 10', '10'),
          ]),
        getItem('Journals', 'sub3', [
            getItem('Option 7', '7'),
            getItem('Option 8', '8'),
            getItem('Option 9', '9'),
            getItem('Option 10', '10'),
          ]),
        getItem('Accessibility', 'sub4', [
            getItem('Option 7', '7'),
            getItem('Option 8', '8'),
            getItem('Option 9', '9'),
            getItem('Option 10', '10'),
        ]),
        getItem('Contact Us', 'sub5'),

      ];

    return(
        <div style={{ background: "#041C32"}}>
            <Modal type="primary" title="Calendar"  width={2000} visible={isHelpModalVisible} footer={[ <Button key="back" onClick={onModalChange}>Ok</Button>]} >
            <Menu
                style={{
                width: 256,
                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode={"inline"}
                theme={"light"}
                items={items}
            />
            </Modal>
        </div>
    );
}

export default HelpModal