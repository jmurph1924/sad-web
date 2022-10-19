import { Divider } from "antd";
import * as React from "react";
import "./ChartsOfAccounts.css";
import { Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;


const ChartsAccountpage = () => {

    const data = [
        {
          key: '1',
          firstName: 'John',
          lastName: 'Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          firstName: 'Jim',
          lastName: 'Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          firstName: 'Joe',
          lastName: 'Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];
      const ChartsOfAccountsTable = () => (
        <Table dataSource={data}>
          <ColumnGroup title="Charts of Accounts">
            <Column title="Number" dataIndex="number" key="item-number" />
            <Column title="Account Description" dataIndex="description" key="item-description" />
            <Column title="Account Type" dataIndex="type" key="item-type" />
          <Column title="Statement" dataIndex="statement" key="item-statement" />
          </ColumnGroup>
        </Table>
      );

    return(
        <div className="ChartsOfAccounts-container">
            <ChartsOfAccountsTable />
        </div>
    );
}

export default ChartsAccountpage;