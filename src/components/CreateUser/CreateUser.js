import * as React from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col, Button, Typography, Input, Select} from "antd"
import "./CreateUser.css"


const CreateUser = () => {
    const navigate = useNavigate();

    const back = () => {
        navigate('/')
    }
    

    return (
        <div className="loginContainer">
            <Row>
                <Button style={{marginTop: "20px", border: "none", boxShadow: "none", background: "#041C32"}} onClick={back}>
                    <ArrowLeftOutlined style={{color: "white", opacity: ".9"}}/>
                    <Typography.Text style={{color: "white", opacity: ".9"}}>Back</Typography.Text>
                </Button>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "40px"}} gutter={[8,8]}>
                <Typography.Title style={{color: "white", opacity: ".9"}}>
                    Create a New User
                </Typography.Title>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "20px"}} gutter={[8,8]}>
                <Col span={6}>
                    <Typography.Text style={{color: "white", opacity: ".9"}}>First Name</Typography.Text>
                    <Input placeholder="First Name" style={{ opacity: ".9"}}/>
                </Col>
                <Col span={6}>
                <Typography.Text style={{color: "white", opacity: ".9"}}>Last Name</Typography.Text>
                    <Input placeholder="Last Name" style={{ opacity: ".9"}}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "20px"}} gutter={[8,8]} >
                <Col span={3}>
                    <Typography.Text style={{color: "white", opacity: ".9"}}>Address</Typography.Text>
                    <Input placeholder="Address" style={{ opacity: ".9"}}/>
                </Col>
                <Col span={3}>
                    <Typography.Text style={{color: "white", opacity: ".9"}}>City</Typography.Text>
                    <Input placeholder="City" style={{ opacity: ".9"}}/>
                </Col >
                <Col span={3}>
                    <Typography.Text style={{color: "white", opacity: ".9"}}>State</Typography.Text>
                    <Input placeholder="State" style={{ opacity: ".9"}}/>
                </Col>
                <Col span={3}>
                    <Typography.Text style={{color: "white", opacity: ".9"}}>Zipcode</Typography.Text>
                    <Input placeholder="Zipcode" style={{ opacity: ".9"}}/>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "20px"}} gutter={[8,8]}>
                <Col span={6}>
                    <Typography.Text style={{color: "white", opacity: ".9"}}>Date of Birth</Typography.Text>
                    <Input placeholder="Date of Birth" style={{ opacity: ".9"}}/>
                </Col>
                <Col span={6}>
                    <Col>
                        <Typography.Text style={{color: "white", opacity: ".9"}}>Role</Typography.Text>
                    </Col>
                    <Col>
                        <Select placeholder="Select a Role" style={{width: "425px", opacity: ".9"}}>
                            <Select.Option value="Administrator">Administrator</Select.Option>
                            <Select.Option value="Manager">Manager</Select.Option>
                            <Select.Option value="User">User</Select.Option>
                        </Select>
                    </Col>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginTop: "30px"}} gutter={[8,8]}>
                <Button style={{width: "400px", opacity: ".9"}}>Submit</Button>
            </Row>
        </div>
    );
}

export default CreateUser;
