import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase-config"
import { Excel } from "antd-table-saveas-excel";
import { ApiOutlined, CoffeeOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Row, Typography, Collapse, Table, Button, Select, message, Input, Form, Tooltip} from "antd"
import "./Administrator.css"
import AdministratorNewUser from "./AdministratorNewUser";

const customStyles = {
  menu: base => ({
  ...base,
  // override border radius to match the box
  borderRadius: 0,
  // kill the gap
  marginTop: 0,
  zIndex: 999
  }),
}

//Administrator Function
const Administrator = () => {

    //Administrator Variable Creation
    const [users, setUsers] = useState([]);
    const [isUserEditable, setIsUserEditable] = useState("");
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ fulladdress, setAddress ] = useState("");
    const [form] = Form.useForm();
    const [ userEmail, setUserEmail ] = useState("");
    const [ userSubject, setUserSubject ] = useState("");
    const [ userContent, setUserContent ] = useState("");
    const [ isNewUserVisible, setIsNewUserVisible ] = useState(false);

    //Calls User Data  on render
    useEffect(() => {
        getUsers()
    }, [])

    const closeNewUser = (visible) => {
      setIsNewUserVisible(visible);
      getUsers()
    }
    //Creation of Layout Columns
    const columns = [
        {
          //Name Section
          title: 'Name',
          key: 'name',
          render: item => {
            return (
              // Name Fetch from Firebase
                <>
                    {_.isEqual(isUserEditable, item?.id) === true ? <Input onChange={(e) => setName(e.target.value)}/> :
                    <>
                    {item?.data.firstname} {" "} {item?.data.lastname}
                    </>
                    }
              </>
            )
          }
        },
        {
          //Email Section
          title: 'Email',
          key: 'email',
          render: item => {
            return (
              //Email Fetch from Firebase
                <>
                  {_.isEqual(isUserEditable, item?.id) === true ? <Input onChange={(e) => setEmail(e.target.value)}/> :
                    <>
                      <Typography.Link>
                        {item?.data.email}
                      </Typography.Link>
                    </>
                  }
                </>
            )
          }
        },
        {
          //Role Section 
          title: 'Role',
          key: 'role',
          render: item => {
            return (
              //Role Drop-down menu Creation
            <>
              <Select defaultValue={item?.data.role} style={{width: "300px", opacity: ".9"}} onSelect={e => handleRoleChange(item.id, e)}>
                <Select.Option value="Administrator">Administrator</Select.Option>
                <Select.Option value="Manager">Manager</Select.Option>
                <Select.Option value="Accountant">Accountant</Select.Option>
              </Select>
            </>
            )
          }
        },
        {
          //Address Section
          title: 'Address',
          key: 'address',
          render: item => {
            return (
              //Address Fetch from Firebase
            <>
              {_.isEqual(isUserEditable, item?.id) === true ? <Input onChange={(e) => setAddress(e.target.value)}/> :
              <>
                {item?.data.address} {", "} {item?.data.city} {", "} {item?.data.state} {", "} {item?.data.zipcode}
              </>
              }
            </>
            )
          }
        },
        {
          //Disable Button 
          title: 'Disable User',
          key: 'disable',
          render: item => {
            return (
              //Button Creation
              <>
                <Button style={{marginLeft: "25px"}} onClick={() => handleDisable(item.id)} icon={<ApiOutlined />}/>
              </>
            )
          }
        },
        {
          //Edit User Section
          title: 'Edit User',
          key: 'edit',
          render: item => {
            return (
              //Edit User Button Creation
              <>
                {_.isEqual(isUserEditable, item?.id) === true ? 
                  <Button style={{marginLeft: "10px"}} onClick={() => handleUpdatedUser(item.id, item.data)} icon={<SaveOutlined />}/>
                  :
                  <Button style={{marginLeft: "10px"}} onClick={() => setIsUserEditable(item.id)} icon={<EditOutlined />}/>
                }
              </>
            )
          }
        }
      ];
      //Layout Column 2 Creation
      const columns2 = [
        {
          //Name Section 
          title: 'Name',
          key: 'name',
          render: item => {
            return (
              //Name Fetch from Firebase
                <>
                    {_.isEqual(isUserEditable, item?.id) === true ? <Input onChange={(e) => setName(e.target.value)}/> :
                    <>
                    {item?.data.firstname} {" "} {item?.data.lastname}
                    </>
                    }
              </>
            )
          }
        },
        {
          //Email Section 
          title: 'Email',
          key: 'email',
          render: item => {
            return (
              //Email Fetch from Firebase
                <>
                  {_.isEqual(isUserEditable, item?.id) === true ? <Input onChange={(e) => setEmail(e.target.value)}/> :
                    <>
                      <Typography.Link>
                        {item?.data.email}
                      </Typography.Link>
                    </>
                  }
                </>
            )
          }
        },
        {
          //Role Section 
          title: 'Role',
          key: 'role',
          render: item => {
            return (
              //Role Drop-down Creation
            <>
              <Select 
                defaultValue={item?.data.role} 
                style={{width: "300px", zIndex: "9999"}} 
                options={[
                {
                  value: 'Administrator',
                  label: 'Administrator',
                },
                {
                  value: 'Manager',
                  label: 'Manager',
                },
                {
                  value: 'Accountant',
                  label: 'Accountant',
                },
              ]} onSelect={e => handleRoleChange(item.id, e)}/>
            </>
            )
          }
        },
        {
          //Address Sectiom
          title: 'Address',
          key: 'address',
          render: item => {
            return (
              //Address Fetch from Firebase
            <>
              {_.isEqual(isUserEditable, item?.id) === true ? <Input onChange={(e) => setAddress(e.target.value)}/> :
              <>
                {item?.data.address} {", "} {item?.data.city} {", "} {item?.data.state} {", "} {item?.data.zipcode}
              </>
              }
            </>
            )
          }
        },
        {
          //Enable user Section
          title: 'Enable User',
          key: 'disable',
          render: item => {
            return (
              //Toggle button to activate accounts
              <>
                <Button style={{marginLeft: "25px"}} onClick={() => handleActivate(item.id)} icon={<CoffeeOutlined />}/>
              </>
            )
          }
        },
        {
          //Edit User Section
          title: 'Edit User',
          key: 'edit',
          render: item => {
            return (
              //Toggle Button that enable editing of User data
              <>
                {_.isEqual(isUserEditable, item?.id) === true ? 
                  <Button style={{marginLeft: "10px"}} onClick={() => handleUpdatedUser(item.id, item.data)} icon={<SaveOutlined />}/>
                  :
                  <Button style={{marginLeft: "10px"}} onClick={() => setIsUserEditable(item.id)} icon={<EditOutlined />}/>
                }
              </>
            )
          }
        }
      ];
      //Disabling User's Handle
      const handleDisable = (id) => {
        const docRef = doc(db, 'users', id)
        updateDoc(docRef, {disabled: true}).then(response => {
          getUsers()
        }).catch(error => console.log(error.message))
      }
      //Activating User's 
      const handleActivate = (id) => {
        const docRef = doc(db, 'users', id)
        updateDoc(docRef, {disabled: false, active: true}).then(response => {
          getUsers()
        }).catch(error => console.log(error.message))
      }
      //Setting Updated User information
      const handleUpdatedUser = (id, item) => {
        setIsUserEditable("")
        var firstNameReal = name.split(' ').slice(0, -1).join(' ');
        var lastNameReal = name.split(' ').slice(-1).join(' ');
        var addressArray = fulladdress.split(', ')

        if(_.isEqual(name , "")){
          firstNameReal = item.firstName;
          lastNameReal = item.lastName;
        } else if(_.isEqual(email , "")){
          setEmail(item.email);
        } else if(_.isEqual(fulladdress , "")){
          addressArray[0] = item.address;
          addressArray[1] = item.city;
          addressArray[2] = item.state;
          addressArray[3] = item.zipcode;
        }


        const docRef = doc(db, 'users', id)
        updateDoc(docRef, {firstName: firstNameReal, lastName: lastNameReal, email, address: addressArray[0], city: addressArray[1], state: addressArray[2], zipcode: addressArray[3]}).then(() => {
          message.info("Successfully Updated User")
          getUsers()
        }).catch(error => console.log(error.message))
      }
      //Setting Change of role action
      const handleRoleChange = (id, role) => {
        const docRef = doc(db, 'users', id)
        updateDoc(docRef, {role}).then(() => {
          message.info("Successfully Updated Role")
          getUsers()
        }).catch(error => console.log(error.message))
      }
      //Collecting user data
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
      //Opens Prefilled Email
      const onSubmit = () => {
        window.open(`mailto:${userEmail}?subject=${userSubject}&body=${userContent}`)

        form.resetFields();
      };

      let locale = {
        emptyText: 'No New Users',
      };
      let locale2 = {
        emptyText: 'No Disabled Users',
      };
      let locale3 = {
        emptyText: 'No Current Users',
      };
      //Creation of Layout Columns 
      const columns4 = [
        {
          //Name Section Creation
          title: "Name",
          dataIndex: "Name",
          key: "Name"
        },
        {
          //Email Section Creation
          title: "Email",
          dataIndex: "Email",
          key: "Email"
        },
        {
          //Date of Birth Section Creation
          title: "Date of Birth",
          dataIndex: "DateofBirth",
          key: "DateofBirth"
        },
        {
          //Role Section Creation
          title: "Role",
          dataIndex: "Role",
          key: "Role"
        },
        {
          //Account Disabled Section Creation
          title: "Account Disabled",
          dataIndex: "AccountDisabled",
          key: "AccountDisabled"
        },
        {
          //New User Section Creation
          title: "New User",
          dataIndex: "NewUser",
          key: "NewUser"
        },
        {
          //Address Section Creation
          title: "Address",
          dataIndex: "Address",
          key: "Address"
        }
      ];
      
      const getNumberFromDate = (expirationDate) => {
        var currentdate = new Date(); 
        var expDate = new Date(expirationDate)

        const currentDateTime = Math.abs(currentdate);
        const expDateTime = Math.abs(expDate);

        if(_.isNil(expirationDate)){
          return true
        }

        if(expDateTime <= currentDateTime){
          return true;
        } else{
          return false;
        }
    }

      const handleCSVClick = () => {

        let userCsv = [];
        let userObj = {};

        for(let i = 0; i < users.length; i++){
          userObj = {
            Name: `${users[i].data.firstname} ${users[i].data.lastname}`,
            Email: users[i].data.email,
            DateofBirth: users[i].data.dateOfBirth,
            Role: users[i].data.role,
            AccountDisabled: users[i].data.disabled,
            NewUser: !users[i].data.active,
            Address: `${users[i].data.address},  ${users[i].data.city},  ${users[i].data.state}, ${users[i].data.zipcode}`
          }

          userCsv.push(userObj)
        }
        //Sheet Creation for data
        const excel = new Excel();
        excel
          .addSheet("test")
          .addColumns(columns4)
          .addDataSource(userCsv)
          .saveAs("Users.xlsx");
      };
      //Return of Created columns and layouts for the Administrator page
    return (
        <div className="loginContainer">
            <Row style={{justifyContent: "center"}}>
                <Collapse defaultActiveKey={['1']} style={{width: "1400px", marginTop: "50px"}} >
                    <Collapse.Panel header="Users" key="1">
                      <Button onClick={() => handleCSVClick()} style={{marginBottom: "20px"}}>
                        Export to CSV
                      </Button>
                        <Table locale={locale3} columns={columns} dataSource={users?.filter(e => e.data.disabled === false)} />
                    </Collapse.Panel>
                    <Collapse.Panel header="New Users" key="2">
                      <Button style={{marginTop: "20px", marginBottom: "20px"}}onClick={() => setIsNewUserVisible(!isNewUserVisible)}>Create New User</Button>
                      {isNewUserVisible === true && <AdministratorNewUser onUserSubmit={closeNewUser} />}
                      <Table columns={columns2} locale={locale} dataSource={users?.filter(e => e.data.disabled === true && e.data.active === false)} />
                    </Collapse.Panel>
                    <Collapse.Panel header="Disabled Users" key="3">
                      <Table columns={columns2} locale={locale2} dataSource={users?.filter(e => e.data.disabled === true && e.data.active === true)} />
                    </Collapse.Panel>
                    <Collapse.Panel header="Expired Password Users" key="4">
                      <Table columns={columns2} locale={locale2} dataSource={users?.filter(e => getNumberFromDate(e.data.passwordExpiration))} />
                    </Collapse.Panel>
                    <Collapse.Panel header="Email a User" key="5">

                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={() => onSubmit()}
                      >
                        <Form.Item name="userEmail" label="Email">
                          <Input placeholder="Email" style={{ opacity: ".9", width: "300px"}} onChange={(e) => setUserEmail(e.target.value)}/>
                        </Form.Item>
                        <Form.Item name="userSubject" label="Subject" >
                          <Input placeholder="Subject" style={{ opacity: ".9", width: "1000px"}} onChange={(e) => setUserSubject(e.target.value)}/>
                        </Form.Item>
                        <Form.Item name="userContent" label="Content">
                          <Input.TextArea rows={6} style={{ opacity: ".9", width: "1000px", marginBottom: "10px"}} onChange={(e) => setUserContent(e.target.value)}/>
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                      </Form>

                    </Collapse.Panel>
                </Collapse>
            </Row>
        </div>
    );
}
//Exporting Administrator page 
export default Administrator;
