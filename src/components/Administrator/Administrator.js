import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase-config"
import { Row, Collapse, Table} from "antd"
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
      ];

      const getUsers = () => {
        const usersCollectionRef = collection(db, 'users')
        getDocs(usersCollectionRef).then(response => {
            const usrs = response.docs.map(doc => ({
                data: doc.data(), 
                id: doc.id,
            }))
            setUsers(usrs);
        }).catch (error => console.log(error.message))
      }

    return (
        <div className="loginContainer">
            <Row style={{justifyContent: "center"}}>
                <Collapse defaultActiveKey={['1']} style={{width: "1200px", marginTop: "100px"}} >
                    <Collapse.Panel header="Users" key="1">
                        <Table columns={columns} dataSource={users} />
                    </Collapse.Panel>
                    <Collapse.Panel header="Expired Passwords" key="2">
                    </Collapse.Panel>
                    <Collapse.Panel header="Disabled Users" key="3">
                    </Collapse.Panel>
                </Collapse>
            </Row>
        </div>
    );
}

export default Administrator;
