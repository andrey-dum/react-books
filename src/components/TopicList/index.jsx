import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Avatar, Button, Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const TopicList = ({topics, user, lists}) => {
    const markedTopics = user ? topics.filter(topic => topic.markedBy.includes(user.id)) : null;
    const otherTopics = markedTopics ? topics.filter(t => !markedTopics.includes(t)) : topics;

    return (
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <NavLink  to="/" >Главная</NavLink >
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/new">Новые</Link> 
            </Menu.Item>

            <Menu.Divider />

            { lists && lists.list.map(list => <Menu.Item key={list.id}><Link to={`/lists/${list.id}`}>{list.title}</Link></Menu.Item>) }

            <Menu.Divider />
            { markedTopics.map((topic) => (
              <Menu.Item key={topic.id} icon={<PieChartOutlined />}>
                <NavLink  to={`/topics/${topic.id}`} >{topic.title}</NavLink >
              </Menu.Item>
              )) }
            { otherTopics.map((topic) => (
              <Menu.Item key={topic.id} icon={<PieChartOutlined />}>
                <NavLink  to={`/topics/${topic.id}`} >{topic.title}</NavLink >
              </Menu.Item>
              )) }

            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>

          </Menu>
          
    );
}

export default TopicList;
