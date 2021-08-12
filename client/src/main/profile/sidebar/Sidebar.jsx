import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { Layout, Menu, Breadcrumb } from "antd";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Popover } from 'antd';
import { Avatar, Image } from 'antd';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



function Sidebar(props) {

    const [collapse, setCollapse] = useState(false)

    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;

    const handleCollapse = (col) => {
        setCollapse(col)
    }


    const content = (
        <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText onClick={handleLogout} primary="Logout" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
            </ListItem>
        </List>
    );


    return (
        <Layout style={{ minHeight: "100vh" }}>
                <Sider collapsible collapsed={collapse} onCollapse={handleCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            Option 1
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            Option 2
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background flex justify-end p-4" >
                        <Popover placement="bottomRight" title={'Profile Information'} content={content} >
                            <img style={{ borderRadius: '50%', height: '2.5rem', width: '2.5rem' }} src={profileInformation?.profile_pic_path} />
                        </Popover>
                    </Header>
                    <Content style={{ margin: "0 16px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            className="site-layout-background"
                            style={{ padding: 24, minHeight: 360 }}
                        >
                            {
                                profileInformation && (
                                    <>
                                        <div className=" flex" >
                                            <div className=" font-bold m-2 " >
                                                Name
                                        </div>
                                            {' '}
                                            <div className=" font-normal m-2 " >
                                                {profileInformation.user_name}
                                            </div>
                                        </div>

                                        <div className=" flex" >
                                            <div className=" font-bold m-2 " >
                                                Email
                                        </div>
                                            {' '}
                                            <div className=" font-normal m-2 " >
                                                {profileInformation.user_email}
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </Content>
                </Layout>
        </Layout>
    )
}

export default Sidebar;