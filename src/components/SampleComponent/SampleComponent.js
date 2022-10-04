// Imports for what you use in the component. Component may not work if you aren't importing these calls
import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase-config"
import { ApiOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

// These are the components we are using for the styling. Go to https://ant.design/components/overview/ to see the list. Make sure to check the javascript and not typescript for the coomponents
import { Row, Typography, Collapse, Table, Button, Select, message, Input} from "antd"

// Brings in the css for the page
import "./Administrator.css"

// The name of the component. Must be exported at the bottom of the page
const SampleComponent = () => {

    // These are state variables that you can call in the render. const [ name of variable, call to set the variable ] = useState(variable type)
    const [users, setUsers] = useState([]);
    const [isUserEditable, setIsUserEditable] = useState("");
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ fulladdress, setAddress ] = useState("");

    // Calls a function/method on render
    useEffect(() => {
        getUsers()
    }, [])


    // An array for the table with what items you want in the table
    const columns = [
        {
            // Kinda self explanatory
          title: 'Name',
          // Tables have to have a unique key
          key: 'name',
          // This renders what will be in the table
          render: item => {
            return (
                <>
                    {/* If else statemenets in javascript can be written like this: (value you want to test and see if its true) === true
                     ? if true do this : if false do this */}
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
          title: 'Email',
          key: 'email',
          render: item => {
            return (
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
          title: 'Role',
          key: 'role',
          render: item => {
            return (
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
          title: 'Address',
          key: 'address',
          render: item => {
            return (
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
          title: 'Disable User',
          key: 'disable',
          render: item => {
            return (
              <>
                <Button style={{marginLeft: "25px"}} onClick={() => handleDisable(item.id)} icon={<ApiOutlined />}/>
              </>
            )
          }
        },
        {
          title: 'Edit User',
          key: 'edit',
          render: item => {
            return (
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


      // Works like the handle Role change function below
      const handleDisable = (id) => {
        const docRef = doc(db, 'users', id)
        updateDoc(docRef, {disabled: true}).then(response => {
          getUsers()
        }).catch(error => console.log(error.message))
      }



      const handleUpdatedUser = (id, item) => {
        setIsUserEditable("")

        // These split up state into specific variables based on space or commas
        var firstNameReal = name.split(' ').slice(0, -1).join(' ');
        var lastNameReal = name.split(' ').slice(-1).join(' ');
        // Splits up address into an array
        var addressArray = fulladdress.split(', ')

        // Adds the name to the infromation
        if(_.isEqual(name , "")){
          firstNameReal = item.firstName;
          lastNameReal = item.lastName;
        } else if(_.isEqual(email , "")){
          setEmail(item.email);

          // Adds in the address from the array addressArray
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

      // Changes something specific in the documents
      const handleRoleChange = (id, role) => {
        // Gets the id from the handle change event to find which document
        const docRef = doc(db, 'users', id)
        // Writes tge new information to that document using the name of the variable inside the document
        updateDoc(docRef, {role}).then(() => {
          message.info("Successfully Updated Role")

          // Gets all the documents again to update the page
          getUsers()
        }).catch(error => console.log(error.message))
      }


      // Gets collection of documents from database
      const getUsers = () => {
        // Specifies database collection you are using
        const usersCollectionRef = collection(db, 'users')

        // Gets all the documents from that collection
        getDocs(usersCollectionRef).then(response => {
            // maps documents to an array
            const usrs = response.docs.map(doc => ({
                data: doc.data(), 
                id: doc.id,
            }))
            //Adds that array to state
            setUsers(usrs);
        }).catch(error => console.log(error.message))
      }

    return (
        <div className="loginContainer">
            <Row style={{justifyContent: "center"}}>
                <Collapse defaultActiveKey={['1']} style={{width: "1400px", marginTop: "100px"}} >
                    <Collapse.Panel header="Users" key="1">
                        <Table locale={locale3} columns={columns} dataSource={users?.filter(e => e.data.disabled === false)} />
                    </Collapse.Panel>
                </Collapse>
            </Row>
        </div>
    );
}

// Export at the bottom. Must match name of the component
export default SampleComponent;
