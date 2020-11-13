import { useEffect, useState } from 'react';
import {Switch, Route, Link, NavLink } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';

import useStore from './hooks/store';

import auth, { signIn, signOut } from './api/auth';

import { getBooks } from './store/books';
import { getTopics } from './store/topics';
import { login, logout, getUser } from './store/user';

import BookItem from './components/BookItem';
import BookPage from './pages/BookPage';
import Topic from './pages/Topic';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Divider } from 'antd';
import Home from './pages/Home';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



function App () {
  
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };
  
  //const { state, actions } = useStore(state => state, { getBooks });
  const { state, actions } = useStore(state => state, { getBooks, getTopics, login, logout});

  useEffect(() => {
    auth.onAuthStateChanged(user => {
        if (user) {
            actions.login(user);
          
        } else {
            actions.logout();
        }
    });

    actions.getTopics();
}, [actions]);

  //const books = state.books.list;
  const topics = state.topics;
  
  return (
    <div className="app">
      <Layout style={{ minHeight: '100vh' }} id='components-layout-demo-side'>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />

          {state.user ? <div onClick={() => signOut()}>LOGOUT</div> : <div onClick={() => signIn()}>ВОЙТИ</div>}

          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <NavLink  to="/" >Главная</NavLink >
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/new">Новые</Link>
            </Menu.Item>

            <Menu.Divider />

            { topics.map((topic) => (
              <Menu.Item key={topic.id} icon={<PieChartOutlined />}>
                <NavLink  to={`/${topic.id}`} >{topic.title}</NavLink >
              </Menu.Item>
              )) }

            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>

          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>React Books</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
             
            <Switch>
              <Route exact path='/' component={Home} />
                <Route path='/new' >
                      <h2>New</h2>
                </Route>
                <Route exact path='/:topicId' component={Topic} />
                    
         
                <Route path='/books/:bookId' component={BookPage} />

            </Switch>
          
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>

    </div>
  );
}

export default App;
