import { useEffect, useState } from 'react';
import {Switch, Route, Link, NavLink, useHistory } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';

import {useStore, useActions, useSelector} from './hooks/store';

import auth, { signIn, signOut } from './api/auth';

import { getBooks } from './store/books';
import { getTopics } from './store/topics';
import { login, logout, getUser } from './store/user';

import BookItem from './components/BookItem';
import BookPage from './pages/BookPage';
import Topic from './pages/Topic';

import { Avatar, Button, Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Home from './pages/Home';
import { getLists } from './store/lists';
import ListPage from './pages/List';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const actionsToBind = {
  getTopics,
  getLists,
  login,
  logout,
  getUser
};


function App () {

  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  const topics = useSelector(state => state.topics);
  const user = useSelector(state => state.user);
  const lists = useSelector(state => state.lists);
  const actions = useActions(actionsToBind);

  const history = useHistory();
  //const [ state, actions ] = useStore(state => state, { getBooks, getTopics, login, logout, getLists});

  useEffect(() => {
    // auth.onAuthStateChanged(user => {
    //     if (user) {
    //         actions.login(user);
          
    //     } else {
    //         actions.logout();
    //     }
    // });
    if (user) {
      actions.getLists(user.id + '')
    }
    actions.getTopics();
}, [actions]);

  //const topics = state.topics;
  
  return (
    <div className="app">
      <Layout style={{ minHeight: '100vh' }} id='components-layout-demo-side'>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" >
            {user ? <div onClick={() => signOut()}> {user.email} <Button><LogoutOutlined /></Button></div> : <div onClick={() => signIn()}> <Button>LOG IN</Button></div>}
          </div>

          {/* {state.user ? <div onClick={() => signOut()}>{state.user.email} <Button><LogoutOutlined /></Button></div> : <div onClick={() => signIn()}> <Button>LOG IN</Button></div>} */}

          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

           

            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <NavLink  to="/" >Главная</NavLink >
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/new">Новые</Link>
            </Menu.Item>

            <Menu.Divider />
            { lists && lists.list.map(list => <Menu.Item key={list.id}><Link to={`/lists/${list.id}`}>{list.title}</Link></Menu.Item>) }
            <Menu.Divider />
            { topics.map((topic) => (
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
                <Route exact path='/topics/:topicId' component={Topic} />
                    
         
                <Route path='/books/:bookId' component={BookPage} />
                <Route path='/lists/:listId' component={ListPage} />

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
