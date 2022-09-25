import React, { useState, useEffect } from "react";
import * as _ from "lodash"
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase-config"
import { ApiOutlined, CoffeeOutlined } from '@ant-design/icons';
import { Row, Collapse, Table, Button} from "antd"
import "./Administrator.css"


const Administrator = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
    }, [])

    const columns = [
        {
          title: 'Name',
          key: 'name',
          render: item => {
            return (
                <>
                    {item?.data.firstname} {" "} {item?.data.lastname}
                </>
            )
          }
        },
        {
          title: 'Email',
          key: 'email',
          render: item => {
            return (
                <>
                    {item?.data.email}
                </>
            )
          }
        },
        {
          title: 'Role',
          key: 'role',
          render: item => {
            return (
            <>
                {item?.data.role}
            </>
            )
          }
        },
        {
          title: 'Address',
          key: 'address',
          render: item => {
            return (
            <>
                {item?.data.address} {", "} {item?.data.city} {", "} {item?.data.state} {", "} {item?.data.zipcode}
            </>
            )
          }
        },
        {
          title: 'Disable User',
          key: 'disable',
          render: item => {
            return (
              <>
                <Button style={{marginLeft: "25px"}} onClick={() => handleDisable(item.id)} icon={<ApiOutlined />}/>
              </>
            )
          }
        }
      ];
      const columns2 = [
        {
          title: 'Name',
          key: 'name',
          render: item => {
            return (
                <>
                    {item?.data.firstname} {" "} {item?.data.lastname}
                </>
            )
          }
        },
        {
          title: 'Email',
          key: 'email',
          render: item => {
            return (
                <>
                    {item?.data.email}
                </>
            )
          }
        },
        {
          title: 'Role',
          key: 'role',
          render: item => {
            return (
            <>
                {item?.data.role}
            </>
            )
          }
        },
        {
          title: 'Address',
          key: 'address',
          render: item => {
            return (
            <>
                {item?.data.address} {", "} {item?.data.city} {", "} {item?.data.state} {", "} {item?.data.zipcode}
            </>
            )
          }
        },
        {
          title: 'Enable User',
          key: 'disable',
          render: item => {
            return (
              <>
                <Button style={{marginLeft: "25px"}} onClick={() => handleActivate(item.id)} icon={<CoffeeOutlined />}/>
              </>
            )
          }
        }
      ];

      const handleDisable = (id) => {
        const docRef = doc(db, 'users', id)
        updateDoc(docRef, {disabled: true}).then(response => {
          getUsers()
        }).catch(error => console.log(error.message))
      }

      const handleActivate = (id) => {
        const docRef = doc(db, 'users', id)
        updateDoc(docRef, {disabled: false, active: true}).then(response => {
          getUsers()
        }).catch(error => console.log(error.message))
      }

      const getUsers = () => {
        const usersCollectionRef = collection(db, 'users')
        getDocs(usersCollectionRef).then(response => {
            const usrs = response.docs.map(doc => ({
                data: doc.data(), 
                id: doc.id,
            }))
            setUsers(usrs);
        }).catch(error => console.log(error.message))
      }

    return (
        <div className="loginContainer">
            <Row style={{justifyContent: "center"}}>
                <Collapse defaultActiveKey={['1']} style={{width: "1200px", marginTop: "100px"}} >
                    <Collapse.Panel header="Users" key="1">
                        <Table columns={columns} dataSource={users?.filter(e => e.data.disabled === false)} />
                    </Collapse.Panel>
                    <Collapse.Panel header="New Users" key="2">
                      <Table columns={columns2} dataSource={users?.filter(e => e.data.disabled === true && e.data.active === false)} />
                    </Collapse.Panel>
                    <Collapse.Panel header="Disabled Users" key="3">
                      <Table columns={columns2} dataSource={users?.filter(e => e.data.disabled === true && e.data.active === true)} />
                    </Collapse.Panel>
                    <Collapse.Panel header="Expired Passwords" key="4">
                    </Collapse.Panel>
                </Collapse>
            </Row>
        </div>
    );
}

export default Administrator;
