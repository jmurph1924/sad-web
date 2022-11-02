import * as React from "react";
import { Space, Table, DatePicker, Input } from 'antd';
import "./Journals.css";

const Journals = () => {

    const onChange = (date, dateString) => {
        console.log(date, dateString);
      };

    const columns = [
      {
        title: "#",
        dataIndex: "number",
        key: "number",
      },
      {
        title: "Account",
        dataIndex: "account",
        key: "account",
      },
      {
        title: "Debits",
        dataIndex: "debits",
        key: "debits",
      },
      {
        title: "Credits",
        key: "credits",
        dataIndex: "credits",
      },
      {
        title: "Description",
        key: "description",
      },
      {
        title: "Name",
        key: "name",
      },
      {
        title: "Manage",
        key: "manage",
        dataIndex: "manage",
        render: () => (
            <Space size="middle">
              <a>Delete</a>
            </Space>
          ),
      },
    ];
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];

    return(
        <div class="journals-container">
            <h1>Journal Entry #</h1>
            <h2>Journal no.<span><Input placeholder="entry number" /></span></h2>
            <h2>Journal date</h2>
            <DatePicker onChange={onChange} class="datePicker" />
            <Table columns={columns} dataSource={data} />;
        </div>
    );
}

export default Journals;